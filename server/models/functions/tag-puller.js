// tag-puller.js
// A function to haul tags out of messages.
'use strict';

module.exports = function(message, next){
// Module dependencies ==========================
    var _ = require('lodash');

// Catch some hashtags ====================================

    var tags_raw = [];
    var hashCatch = new RegExp(/\S*#\S+/gi);

    var msg_body = message.replace( hashCatch,'');
    var tagIt = message.match(hashCatch);
    
    if (tagIt){
        _.each(tagIt, function(tag){
            var tagName = tag.replace(/#/gi,'');
            tags_raw.push(tagName);
        });
    }
    
    console.log(msg_body, tags_raw);

    var reply = { msg :  msg_body, tags: tags_raw }

    return reply;
};