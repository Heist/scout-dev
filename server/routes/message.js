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
            // console.log('made a task update', task);
            var u = { $push: {_messages : m._id} };

            return Subject.findByIdAndUpdate(req.body._subject, u, function(err,doc){ if (err) {res.send(err);} });
                
        }).then(function(subject){
            // console.log('made a subject update', subject);
            
            reply.subject = subject;

            if(req.body.tags){ // reminder: the tags are not attached to the message. The message is attached to tags.
                // console.log('tags call', call, m._id, req.body.tags);
            
            async.each(req.body.tags, function(tag){
                    var q = {name: tag, _test: call._test};
                    var u = { $push: { _messages: m._id
                                    },
                                name: tag,
                                _test: call._test
                            };
                    var o = {upsert:true};

                    Tag.findOneAndUpdate( q, u, o, function(err, data){ 
                        // console.log(data); 
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
        var reply = {},
            id = req.body._id,
            test = req.body._test,
            message = req.body.body;

        function tagHandler(tags, test, id, done) {
            async.map(tags, function (name, callback) {
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
                        console.log('the head', id, tg._messages.indexOf(id), tg.name);
                        if (tg._messages.indexOf(id) === -1) {
                            console.log('tag getting message', tg.name);
                            tg._messages.push(id);
                            tg.save(function(err, tag){
                                console.log('what the fuck', tag);
                                callback(null, tag);
                            });
                        } else {
                            callback(null, tg.name);
                        }
                    } 
                });
            }, done);
        }

        // first, edit and save the message body with whatever the new one is.
        var promise = Message.findOneAndUpdate(
                        {'_id': req.body._id},
                        {'body': req.body.body},
                        {upsert : false},
                        function(err, msg){
                            if(err){console.log(err);}
                        });

        promise.then(function(){
            // then get all the tags for this message
            return Tag.find({'_messages': { $in: [id] }}).exec();

        }).then(function(tags){
            // run tagHandler, which makes a tag if there isn't one, and pushes a message if there is a tag
            // console.log('tags matching message _id', tags);            

            return tagHandler(req.body.tags, req.body._test, req.body._id, function (error, results) {
                    // results is your new array of tags!
                    console.log('did this work this time', error, results);
                    _.each(results, function(entry){console.log(entry);});
                    // return results[3];
                });

        }).then(function(new_tag_array){
            // array of new tags and tags that have messages in place
            console.log('new_tag_array', new_tag_array);
            reply.new_tags = new_tag_array;
            var find_id = mongoose.Types.ObjectId(id);

            return Tag.find({'_messages' : {$in : [find_id]}}).exec();

        }).then(function(old_tags){
            reply.old_tags = old_tags;
            // console.log('final reply', reply);
            res.json(new_tag_array);
        });
    });
};