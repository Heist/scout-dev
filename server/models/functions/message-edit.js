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
    // there are dual-pointers everywhere, oh well.

    // FIND A MESSAGE  from a message ID then do the above
    console.log('find this', msg._id );
    return models.Message.findOneAsync({'_id' : msg._id})
            .then(function(returned){
                returned.body = msg.body;
                var newMessage;

                console.log('found message', returned);
                // create a new message that copies the old message
                // delete the old message
                // check the tags for the old message and remove it from them
                // if there are any empy tags, remove them

                // problem: when one edits a note such that there are no tags on it
                // the tags and the old note remains present?
                
                return fn.messageNew(returned, returned.created_by_user)
                        .then(function(msg){
                            newMessage = msg;
                            console.log('new message', msg._id); // is good here
                            return models.Tag.findAsync({ '_messages' : {$in: [returned._id]}})
                        })
                        .then(function(tags){
                            // In here, we are looking through pointers to the _old_ message
                            // and removing them from the tags that have those pointers.
                            console.log('old tags', tags);
                            return Bluebird.map(tags, function(tag){
                                console.log('bluebird');
                                    // if a tag has been removed, then remove the message from that tag
                                    console.log('what are we desplicing?', tag.name, tag._messages);
                                    var pos = tag._messages.indexOf(returned._id);
                                    console.log(pos);
                                    tag._messages.splice(pos, 1);
                                    
                                    if (tag._messages.length === 0){
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
                            console.log('did the desplice work?', tags );
                            // get rid of empty tags in the array we return
                            tags = _.compact(tags);
                            // fn.messageRemove(returned);
                        }).then(function(next){
                            console.log('new message 2', newMessage._id);
                            console.log('returned message', returned._id);
                            fn.messageRemove(returned);
                            return newMessage;
                        });
            })
            .catch(function(err){
                console.log(err);
            }); 
};