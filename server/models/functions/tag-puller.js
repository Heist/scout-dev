// tag-puller.js
// A function to haul tags out of messages.
'use strict';

module.exports = function(message, next){
// Module dependencies ==========================
    var _ = require('lodash');

// Catch some hashtags ====================================
    // console.log('pull some tags', message);
    var tags_raw = [];
    var hashCatch = new RegExp(/\S*#\S+/gi);

    var msg_body = message.replace( hashCatch,'');
    var tagIt = message.match(hashCatch);
    var msg_clean = msg_body.trim();

    if (tagIt){
        _.each(tagIt, function(tag){
            var tagName = tag.replace(/#/gi,'');
            tags_raw.push(tagName);
        });
    }
    
    console.log(msg_body, tags_raw);

    var reply = { msg :  msg_clean, tags: tags_raw }

    return reply;
};