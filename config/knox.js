// knox.js 
'use strict';

module.exports = function(){
    var knox = require('knox').createClient({
        key: 'AKIAI4VDRHIIMT7KJAGA',
        secret: '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',
        bucket: 'fieldguide.app.media.images'
    });

    return knox;
};