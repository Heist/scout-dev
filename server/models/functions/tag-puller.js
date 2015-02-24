// tag-puller.js
// A function to haul tags out of messages.
'use strict';

module.exports = function(message, next){

// Module dependencies ==========================
    var _ = require('lodash');

// Catch some hashtags ====================================

    var tags = [];
    var hashCatch = new RegExp(/\S*#\S+/gi);
    var hashPull = new RegExp(/#/gi);
    var tagIt = message.match(hashCatch);
    
    if (tagIt){
        _.each(tagIt, function(tag){
            var msg = tag.replace(hashPull,'');
            tags.push(msg);
        });
    }
    
    return tags;
};