// tag-puller.js
// A function to haul tags out of messages.
'use strict';

module.exports = function(message, next){
    var tags = [];
    var hashCatch = new RegExp(/\S*#\S+/gi);
    var hashPull = new RegExp(/#/gi);
    var tagIt = message.body.match(hashCatch);
    
    if (tagIt){
        _.each(tagIt, function(tag){
            var msg = tag.replace(hashPull,'');
            tags.push(msg);
        });
    }
    
    message.tags = tags;
    return message;
};