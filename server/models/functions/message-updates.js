// message-updates.js
// update a message as visible or not on report screen.
'use strict';

module.exports = function(message_array, next){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _        = require('lodash');
    var async    = require('async');

// load data storage models =====================
    var Message  = global.rootRequire('./server/models/data/message');

// load functions  ==============================
    var editMsg  = global.rootRequire('./server/models/functions/edit-message.js');

// Map an array of messages and return them ===============

    async.map(message_array,
        function(msg, callback){
            Message.findByIdAndUpdate(
                msg._id, 
                { 
                    'fav_task' : msg.fav_task,
                    'fav_tag'  : msg.fav_tag,
                    'body'  : msg.body,
                }, 
                function(err, data){
                    if(err){console.log(err);}
                    callback(null, data);
                });
        }, 
        function(err, results){
            if(err){console.log(err);}
            next(null, results);
        });
};