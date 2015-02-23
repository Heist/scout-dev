// message-edit.js
// Edit the body of a message and associate it to new tags
'use strict';

module.exports = function(msg, next){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _        = require('lodash');
    var async    = require('async');
    var Promise  = require('bluebird');

// load data storage models =====================
    var Message = global.rootRequire('./server/models/data/message');
    var Tag     = global.rootRequire('./server/models/data/tag');

// load functions ===============================
    var tagPuller = global.rootRequire('./server/models/functions/tag-puller.js');
    var tags = tagPuller(msg.body);

// EDIT A MESSAGE =========================================

    // edit a message. First edit tags related to message, then edit message body.

    // find all tags in the db with this test name
    // if a tag matching a given req.body.tag does not exist, create it
    // if tag does exist, and message is not already present on it, push message
    // if there are tags returned that are not in req.body.tags, remove message
    // if there are tags returned that are empty of messages, delete them
    // reply with res.json({tags : tags, msg: msg});

    // globals to sort through

    async.waterfall([
        function(callback) {
            // Find all the tags that are in the new list
            // If there's a tag in the new list not in the DB, make it, push msg
            // If the tag's there and doesn't have the msg, push it, save.

            async.map(tags, function (name, callback) {
                Tag.findOne({'name' : name})
                    .exec(function (err, doc) {
                        if(err){ console.log(err); }

                        var tg = doc[0];

                        if (!tg) {
                            // create a new tag and push a message to it, save and exit
                            var t = new Tag();
                            t.name = name;
                            t._test = msg._test;
                            t._messages.push(msg._id);
                            t.save(function(err, tag){
                                callback(null, tag);
                            });
                        } else {
                            // if an existing tag _messages does not contain msg._id
                            
                            if (tg._messages.indexOf(msg._id) === -1) {
                                tg._messages.push(msg._id);
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
            Message.findOne({'_id' : msg._id})
               .exec(function(err, m){
                    m.body = msg.body;
                    m.save(function(err, data){
                        callback(null, {data: data, tag_set: tag_set});
                    });
                });
        },
        function(args, callback){
             // Find tags that have an association with that message, 
             // then send them to have new messages added to their joins
            async.waterfall([
                function(callback) {
                    Tag.find({'_messages' : {$in : [msg._id]}, 'name' : {$nin : tags}})
                       .exec(function(err, docs){
                            if(err){ console.log(err); }
                            callback(null, docs);
                        });
                },
                function(args, callback) {
                    async.map(args, function(tag, callback){
                        var msg_index = tag._messages.indexOf(msg._id);
                        tag._messages.splice(msg_index, 1);
                        tag.save(function(err,doc){
                            callback(null, tag);
                        });
                    }, callback);
                },

            ], function (err, result) {
                if(err){ console.log(err); }
                callback(null, args);
            });
            
        },
        function(args, callback){
            // If there are tags that still hold messages that have been deleted
            // Remove the reference to those messages from the tag
            Tag.remove({'_messages' : {$size : 0}}, function(err, gone){
                callback(null, args);
            });
        }      
    ], function (err, result) {
        // result should be {data: data, tag_set: tag_set} from line 77.
        if(err){ console.log(err); }
        next(result);
    });
};