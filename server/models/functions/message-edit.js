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

            return Bluebird.all([
                fn.messageNew(returned, returned.created_by_user),
                fn.messageRemove(returned)
            ]);
        }).then(function(arr){
            return arr[0];
        }) 
        .catch(function(err){
            console.log(err);
        }); 
};