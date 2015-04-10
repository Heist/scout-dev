// message-edit.js
// Edit the body of a message and associate it to new tags
'use strict';

module.exports = function(msg, next){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _        = require('lodash');
    var async    = require('async');
    var Bluebird  = require('bluebird');
    var models   = require('../../models');
    var fn       = require('../../models/functions');

    // var tag = fn.tagPuller(msg.body);
    // var tags = tag.tags;

// EDIT A MESSAGE =========================================

    // edit a message.
    // finds the message to edit, makes a new one that's a copy, wipes the old one.
    // TODO: remove dual-pointers to Subject and Tasks

    // create a new message that copies the old message
                // delete the old message
                // check the tags for the old message and remove it from them
                // if there are any empy tags, remove them

                // problem: when one edits a note such that there are no tags on it
                // the tags and the old note remains present?

    // FIND A MESSAGE  from a message ID then do the above

    return models.Message.findOneAsync({'_id' : msg._id})
            .then(function(returned){
                var newMessage;
                returned.body = msg.body; // set new message body

                return fn.messageNew(returned, returned.created_by_user)
                        .then(function(msg){
                            newMessage = msg;
                            return models.Tag.findAsync({ '_messages' : {$in: [returned._id]}})
                        })
                        .then(function(tags){
                            // In here, we are looking through pointers to the _old_ message
                            // and removing them from the tags that have those pointers.
                            
                            return Bluebird.map(tags, function(tag){
                                    var arr = tag._messages;
                                    // if a tag has been removed, then remove the message from that tag
                                    arr.splice(arr.indexOf(returned._id), 1);

                                    if (arr.length === 0){
                                        // if the tag is empty, remove the tag from the db.
                                        models.Tag.remove({'_id':tag._id}, function(err, next){
                                            return tag.save();
                                        }); 
                                    } else {
                                        // otherwise, return the tag itself
                                        return tag.save();
                                    }
                                })
                        })
                        .then(function(tags){
                            return fn.messageRemove(returned._id);
                        }).then(function(next){
                            return newMessage;
                        });
            })
            .catch(function(err){
                console.log(err);
            }); 
};