// new-message.js
// create a new message on the DB
'use strict';

module.exports = function(request, user, next){

// Module dependencies ==========================
    var async    = require('async');

// load data storage models =====================
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// load functions ===============================
    var tagPuller = global.rootRequire('./server/models/functions/tag-puller.js');


// CREATE A NEW MESSAGE ===================================

// set message variables from request object.
    var body = request.body,
        tags = tagPuller(body) || null,
        _subject = request._subject,
        _test = request._test,
        _task = request._task;

    console.log('new message', request);

    async.waterfall([
        function(callback){
            // Create the message
            Message.create(
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
            Message.findById(msg._id)
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
                        Task.findOneAndUpdate(
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
                    Subject.findOneAndUpdate(
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
                                Tag.findOneAndUpdate( 
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
        if(err){console.log(err);}
        next(null, {msg: results.msg, tags: results.waterfall.tags});
    });
};