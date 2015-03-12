// message-new.js
// create a new message on the DB
'use strict';

module.exports = function(request, user, next){

// Module dependencies ==========================
    var async    = require('async');

// load data storage models =====================
    var models = require('../../models');
    var fn     = require('../../models/functions');
    
// CREATE A NEW MESSAGE ===================================

// set message variables from request object.
    var body = request,
        tags = fn.tagPuller(body) || null,
        _subject = request._subject,
        _test = request._test,
        _task = request._task;



    async.waterfall([
        function(callback){
            // Create the message
            models.Message.create(
                {
                    _subject : _subject,
                    _test : _test,
                    body : body,
                    created_by : user
                },
                function(err, msg){
                    if (err) { console.log(err); } 
                    callback(null, msg);
                });
        },
        function(msg, callback){
            // Return the message with the subject populated
            models.Message.findById(msg._id)
                   .populate('_subject')
                   .exec(function(err, note){
                        if (err) { console.log(err); }
                        callback(null, note); 
                    });
        },
        function(msg, callback){
            // with the message populated, return the new message array
            async.parallel({
                task: function(callback){
                    if (_task){
                        models.Task.findOneAndUpdate(
                            {'_id':_task},
                            {$push: { _messages: msg._id }},
                            {upsert : false },
                            function(err, task){
                                callback(null, task);
                            });
                    } else {
                        callback(null, null);
                    }
                },
                subject: function(callback){
                    models.Subject.findOneAndUpdate(
                            {'_id': _subject},
                            {$push: { _messages: msg._id }},
                            {upsert : false },
                            function(err, subject){
                                callback(null, subject);
                            });
                },
                tags: function(callback){
                    // If there are tags, map the messages into them.
                    // reminder: the tags are not attached to the message. The message is attached to tags.
                    if(tags){
                        async.map(tags, 
                            function(tag, callback){
                                models.Tag.findOneAndUpdate( 
                                    {name: tag, _test: msg._test}, 
                                    { $push: { _messages: msg._id },
                                            name: tag,
                                            _test: msg._test
                                    }, 
                                    {upsert:true}, 
                                    function(err, data){ 
                                        callback(null, data);
                                    });
                            }, 
                            function(err, results){
                                callback(null, results);
                            });
                    } else {
                        callback(null, null);
                    }
                }
            }, function(err, results){
                // End of parallel callback chain
                callback(null, {msg: msg, waterfall: results});
            });
        }
    ], 
    function(err, results){
        // End of waterfall chain - new message and tags return here.
        console.log('waterfall', results);
        if(err){console.log(err);}
        next(null, {msg: results.msg, tags: results.waterfall.tags});
    });
};