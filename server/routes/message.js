//message.js
'use strict';

module.exports = function(app, passport) {
//Module dependencies
var mongoose = require('mongoose');  //THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('underscore');
var async = require('async');

//load data storage models
var Message = require('../models/data/message');
var Task    = require('../models/data/task');
var Test    = require('../models/data/test');
var Tag     = require('../models/data/tag');
var Session = require('../models/data/session');
var Subject = require('../models/data/subject');

//MESSAGE ROUTES  ================================================

app.route('/api/message/')
    .get(function(req,res){
        Message.find({})
            .exec(function(err, messages) {
                if(err){res.send(err);}
                res.json(messages);
            });
    })
    .post(function(req,res){
        // TODO: make this into Async becasue this is pretty complex.

        console.log('touched new message ', req.body);

        var m = {}; // surface message id for use in promises.
        var msg = {};
        var call = {};
        var reply = {};

        if (req.body.body) {msg.body = req.body.body;}        
        if (req.body._subject) {msg._subject = mongoose.Types.ObjectId(req.body._subject);}
        if (req.body._test) {msg._test = mongoose.Types.ObjectId(req.body._test);}
        if (req.user._id) {msg.created_by = mongoose.Types.ObjectId(req.user._id);}

        if (req.body._task) {call._task = mongoose.Types.ObjectId(req.body._task);}
        if (req.body._test) {call._test = mongoose.Types.ObjectId(req.body._test);}
        if (req.body._session) {call._session = mongoose.Types.ObjectId(req.body._session);}

        var promise = Message.create(msg, function(err, msg){if (err) {res.send(err);} console.log(msg); });

        promise.then(function(msg){
            // console.log('made a message', msg, 'call_task', call._task);
            reply.msg = msg;
            // fun fact: get this wrong and mongoose silently creates a new object._id that exists nowhere else.
            m._id = mongoose.Types.ObjectId(msg._id);
            
            if (call._task){
                
                // console.log(call._task);
                
                var update = { $push: {_messages : m._id} };

                return Task.findByIdAndUpdate( call._task, update, function(err,doc){ if (err) {res.send(err);} });
            }
        }).then(function(task){
            reply.task = task;
            
            // If a subject doesn't exist, we upsert them
            // this is to handle note creation on reports,
            // where the Subject is actually a User
            var u = { $push: {_messages : m._id} };

            return Subject.findOneAndUpdate({'_id':req.body._subject}, u, {upsert:false},function(err,doc){ if (err) {res.send(err);} });
                
        }).then(function(subject){
            // console.log('made a subject update', subject);
            
            reply.subject = subject;

            if(req.body.tags){ // reminder: the tags are not attached to the message. The message is attached to tags.
                // console.log('tags call', call, m._id, req.body.tags);
            
                async.each(req.body.tags, function(tag){
                    Tag.findOneAndUpdate(
                        {name: tag, _test: call._test}, 
                        { $push: { _messages: m._id },
                               name: tag,
                               _test: call._test
                            }, 
                        {upsert:true},
                        function(err, data){ 
                    });
                });
            }

            res.json(reply);
        }).then(null, function(err){
            if(err) {return res.send (err);}
        });
    });
        


app.route('/api/message/:_id')
    .get(function(req,res){
        //get one specific test
        // console.log(req)
        Message.findById(req.params._id)
            .exec(function(err,msg){
                if(err){res.send(err);}
                
                // console.log(msg)
                res.json(msg);
            });
    })
    .put(function(req, res){
        // edit a message. First edit tags related to message, then edit message body.

        // req.body.tags is list of tags currently within message body
        // find all tags in the db with this test name
        // if a tag matching a given req.body.tag does not exist, create it
        // if tag does exist, and message is not already present on it, push message
        // if there are tags returned that are not in req.body.tags, remove message
        // if there are tags returned that are empty of messages, delete them
        // reply with res.json({tags : tags, msg: msg});

        // globals to sort through
        console.log('touched message put', req.body);
        var message = req.body.body,
            tags = req.body.tags,
            test = req.body._test,
            id = req.body._id;

        async.waterfall([
            function(callback) {
                // Find all the tags that are in the new list
                // If there's a tag in the new list not in the DB, make it, push msg
                // If the tag's there and doesn't have the msg, push it, save.

                async.map(req.body.tags, function (name, callback) {
                    // console.log('tag ' + name);
                    Tag.find({'name' : name}).limit(1).exec(function (error, doc) {
                        if (error){return callback(error);}

                        var tg = doc[0];

                        if (!tg) {
                            // create a new tag and push a message to it, save and exit
                            var t = new Tag();
                            t.name = name;
                            t._test = test;
                            t._messages.push(id);
                            t.save(function(err, tag){
                                callback(null, tag);
                            });
                        } else {
                            // if an existing tag _messages does not contain msg._id
                            // console.log('the head', id, tg._messages.indexOf(id), tg.name);
                            if (tg._messages.indexOf(id) === -1) {
                                // console.log('tag getting message', tg.name);
                                tg._messages.push(id);
                                tg.save(function(err, tag){
                                    callback(null, tag);
                                });
                            } else {
                                callback(null, tg);
                            }
                        } 
                    });
                }, callback);
            }, 
            function(tag_set, callback){
                // Save the new message body
                Message.find({'_id' : req.body._id})
                       .exec(function(err, msgs){
                            var msg = msgs[0];
                            msg.body = message;
                            msg.save(function(err, data){
                                callback(null, {data: data, tag_set: tag_set});
                            });
                        });
            },
            function(args, callback){
                // console.log('last function args', args);

                // TODO: THIS
                // this is tricky because it involves a buried map function.
                // async.map(req.body.tags, function (name, callback) { // }, callback);
                async.waterfall([
                    function(callback) {
                        Tag.find({'_messages' : {$in : [req.body._id]}, 'name' : {$nin : req.body.tags}})
                           .exec(function(err, docs){
                                if(err){console.log(err);}

                                console.log('found tags', docs );
                                callback(null, docs);
                            });
                    },
                    function(args, callback) {
                        console.log('nested waterfall', args);
                        async.map(args, function(tag, callback){
                            var msg_index = tag._messages.indexOf(req.body._id);
                            tag._messages.splice(msg_index, 1);
                            tag.save(function(err,doc){
                                console.log('saved tag', doc);
                                callback(null, tag);
                            });
                        }, callback);
                    },

                ], function (err, result) {
                       // result now equals 'done'  
                    console.log('nested waterfall result', result);
                    callback(null, args);
                });
                
            },
            function(args, callback){
                console.log('pre-removal', args);
                Tag.remove({'_messages' : {$size : 0}}, function(err, gone){
                    console.log('gone', gone); 
                    callback(null, args);
                });
            },
            function(args, callback){
                console.log('pre-removal', args);

                async.parallel({
                    tags: function(callback){
                        Tag.find({'_test' : req.body._test })
                            .exec(function(err, docs){
                                if (err) {console.log(err);}
                                callback(null, docs);
                            });
                    },
                    tasks: function(callback){
                        Task.find({'_test': req.body._test})
                            .sort({ index: 'asc'})
                            .exec(function(err, docs){
                                if (err) {console.log(err);}
                                callback(null, docs);
                            });
                    },
                    test: function(callback){
                        Test.find({'_id' : req.body._test})
                            .limit(1)
                            .exec(function(err, docs){
                                if(err){console.log(err);}
                                callback(null, docs);
                            });
                    },
                    messages: function(callback){
                        Message.find({ '_test':{$in: [req.body._test]}})
                               .populate({path:'_subject', select: 'name' })
                               .exec(function(err, docs){
                                    if(err){console.log(err);}
                                    callback(null, docs);
                                });
                    }
                },
                function(err, results) {
                    // results is now equals to: {one: 1, two: 2}
                    var return_array = [];
                    _.each(results.test, function(test){
                        return_array.push(test);
                    });
                    _.each(results.tasks, function(task){
                        return_array.push(task);
                    });
                    _.each(results.tags, function(tag){
                        return_array.push(tag);
                    });
                    callback(null, {nav_list: return_array, messages: results.messages});
                });

            }            
        ], function (err, result) {
           // ship the result back to the front end for handling
            console.log('result', result);
            res.json(result);
        });
    });
};