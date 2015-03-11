// message-fav.js
// update a message as visible or not on report screen.
'use strict';

module.exports = function(message_array, next){

// Module dependencies ==========================
    var async    = require('async');
    var models = require('../../models');

// Map an array of messages and return them as favourited ===============

    async.map(message_array,
        function(msg, callback){
            models.Message.findByIdAndUpdate(
                msg._id, 
                { 
                    'fav_task' : msg.fav_task,
                    'fav_tag'  : msg.fav_tag
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