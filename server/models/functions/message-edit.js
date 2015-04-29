// message-edit.js
// Edit the body of a message and associate it to new tags
'use strict';

module.exports = function(msg, next){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _        = require('lodash');
    var async    = require('async');
    var Bluebird  = require('bluebird');

    var models   = Bluebird.promisifyAll(require('../../models'));
    var fn       = require('../../models/functions');

    

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

    return models.Message.findOneAsync({'_id' : msg._id}).then(function(returned){
        // if(err){}
            var newMessage;
            returned.body = msg.body; // set new message body

            return fn.messageNew(returned, returned.created_by_user)
                    .then(function(msg){
                        
                        
                        newMessage = msg;
                        return fn.messageRemove(returned._id);
                    }).then(function(next){
                        return newMessage;
                    });
        }).catch(function(err){
                
            });
};