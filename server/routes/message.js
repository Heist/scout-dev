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
                console.log('tag ' + name);
                Tag.find({'name' : name}).limit(1).exec(function(err,doc){
                    if(err){console.log(err);}
                    
                    var tg = doc[0];

                    if(!tg){
                        // create a new tag and push a message to it, save and exit
                        var t = new Tag ();
                        t.name = name;
                        t._test = test;
                        t._messages.push(id);

                        t.save(function(err, n){
                            if(err){console.log(err);}
                            callback(null, n);
                        });
                         
                    }

                    if(tg){
                        // if the message does not already exist
                        if(tg._messages.indexOf(id) === -1){
                            tg._messages.push(id);
                            tg.save(function(err, saved){
                                if(err){console.log(err);}
                                callback(null, saved);
                            });
                        }
                    }

                    else { callback(null, 'Tag already present');}
                });

                // callback(null, result);
            }, done);
        }

        var tagReply = tagHandler(req.body.tags, req.body._test, req.body._id, function (error, results) {
            // results is your new array of tags!
            console.log('did this work this time', results);
        });

    });
};