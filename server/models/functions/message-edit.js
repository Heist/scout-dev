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
    
    return models.Message.findOneAsync({'_id' : msg._id})
        .then(function(returned){
            returned.body = msg.body;
            console.log('find me', returned._id);
            // create a new message that copies the old message
            // delete the old message
            // check the tags for the old message and remove it from them
            // if there are any empy tags, remove them
            
            return fn.messageNew(returned, returned.created_by_user)
            .then(function(checkForTags){
                // return models.Tag.findAsync({ '_messages' : {$in: [returned._id]}})
                //     .then(function(tags){
                //         // console.log('tag removal', tags);
                //         return Bluebird.map(tags, function(tag){
                //             var pos = tag._messages.indexOf(returned._id);
                //             // console.log('found old id', pos, tag.name);
                //             tag._messages.splice(pos, 1);
                //             return tag; 
                //         }).then(function(d){
                //             return d;
                //         })
                //     })
                return checkForTags;
            })
            // .then(function(data){
            //     return fn.messageRemove(returned);
            // })
            // .then(function(arr){
            //     return arr[0];
            // });
        })
        .catch(function(err){
            console.log(err);
        }); 
};