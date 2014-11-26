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
        // console.log('touched new message ', req.body);

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
                    var q = {body: tag, _test: call._test};
                    var u = { $push: { _messages: m._id
                                    },
                                body: tag,
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
        console.log('touched update message');
        // console.log('touched update message', req.body);
        // sort through req.body for hashtags
        // sort through Tag to see if Message is already in them
        // Tag.find('name': $in : {tag_names})
        // if the Tag doesn't exist
        // upsert a Tag with this as the first message
        // otherwise, add this message to the Tag that gets found
        
        var update = {
            fav_task : req.body.fav_task, 
            fav_tag : req.body.fav_tag,
            body : req.body.body
        };

        var reply = {};

        var promise = Message.findOneAndUpdate({'_id' : req.params._id}, update, function(err, msg){
                        if(err){return console.log(err);}
                    });

        promise.then(function(msg){
            reply.msg = msg;
            reply.tags = [];
            
            // console.log('reply.msg', reply.msg._id);

            // for each tag that we've detected, get that tag.
            // if it does not exist, create it.
            // if it does exist, push the new message to it.

            return Tag.find({'_messages' : {$in: [reply.msg._id]}}).exec();

        }).then(function(docs){
        
                var id_search = reply.msg._id.toString();
                // if the name of the tag
                // does not exist in the list of tags
                // remove the message._id from it

                async.each(docs, function(doc){
                    Tag.findById(doc._id)
                       .exec(function(err, t){
                            // find a tag, and if it does not exist in req body tags
                            // delete the message from it
                            if(err){console.log(err);}
                            var index = _.indexOf(req.body.tags, t.body);
                            if(index === -1){
                                var msg_index = t._messages.indexOf(id_search);
                                t._messages.splice(msg_index, 1);
                                t.save();
                            }
                        });
                });

                // for each new tag in the list
                // add that message to the tag's messages (right now there may be double messaging)
                // if the tag does not exist, create it.
                async.each(req.body.tags, function(tag){
                    

                    // { $push: { _messages: m._id
                    //                 },
                    //             body: tag,
                    //             _test: call._test
                    //         };

                    //  _messages: { $nin: [ reply.msg._id ]}

                    // this may not work - it will find a tag that doesn't have the message
                    // and push that message
                    // but it might not create a new tag if it finds nothing
                    
                    Tag.findOneAndUpdate(
                        {'body' : tag,
                          _messages: { $nin: [ reply.msg._id ]}
                         },
                        { $push: { _messages: reply.msg._id },
                          body: tag,
                          _test: reply.msg._test
                        },
                        { upsert : true },
                        function(err, update){
                            if(err){console.log(err);}
                            console.log('update', update);
                        });
                });

            }).then(function(){
                // re-get the list of tags for the message
                console.log('reply test', reply.msg._test);
                return Tag.find({'_test' : reply.msg._test}).exec();
                
            }).then(function(tags){
                reply.tags = tags;
                // console.log('found tags', tags);
                console.log('reply full', reply);
                res.json(reply);
            });

    });
};