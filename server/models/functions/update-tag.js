// update-tag.js
'use strict';

module.exports = function(tag, request, next){
// Module dependencies
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// Update A Tag ===========================================
    var summary   = request.summary,
        pass_fail = request.pass_fail || false,
        visible   = request.visible || false,
        embed     = request.embed || '';

    Tag.findOneAndUpdate(
        {'_id': tag }, 
        {
            'summary'   : summary,
            'pass_fail' : pass_fail,
            'visible'   : visible,
            'embed'     : embed
        }, 
        function(err, tag){
            if(err){ console.log(err); }
            next(null, tag);
        });
};