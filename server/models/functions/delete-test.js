// delete-test.js
// deletes a single test by id and all related tasks, messages, tags
'use strict';

module.exports = function(test, next){
// Module dependencies ==========================
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');

// load data storage models =====================
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');

// DELETE TEST ============================================

    async.parallel([
        function(callback){
            Test.remove({ _id : test}, 
                function(err){
                    if(err){ console.log(err); }
                    callback(null, 'test');
                });
        },
        function(callback){
            Task.remove({ _test : test },
                function(err){
                    if(err){ console.log(err); }
                    callback(null, 'task');
                });
        },
        function(callback){
            Message.remove({ _test : test }, 
                function(err){
                    if(err){ console.log(err); }
                    callback(null, 'messages');
                });
        },
        function(callback){
            Tag.find({ _test : test })
                .exec(function(err, tags){
                    if(err){ console.log(err); }
                    console.log(tags);
                    callback(null, 'tags');
                });
            // Tag.remove({ _test : test },
            //      function(err){
            //             if(err){ console.log(err); }
            //             callback(null, 'tags');
            //         });
        }
    ], 
    function(err, results){
        if(err){ console.log(err); }
        next(null, test);
    });  
};