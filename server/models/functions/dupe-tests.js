// dupe-tests.js
'use strict';

// This duplicates existing tests and all their information.

module.exports = function(test, next){

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// Duplicate existing tests through a waterfall callback.
    console.log(test);
    async.waterfall([
        function(callback) {
            Test.findById(test)
                .populate({path:'_tasks'})
                .exec(function(err, doc){
                    if(err){console.log(err);}

                    callback(null, doc);
                });
        },
        function(args, callback){
            var old = args;
            var update = {
                    created_by_account : old.created_by_account,
                    created_by_user : old.created_by_user,
                    desc    : old.desc,
                    link    : old.link,
                    name    : old.name || "New Test",
                    platform: old.platform,
                    kind    : old.kind,
                    visible : 'true'
                };

            Test.create(update, function(err, test){
                if (err){console.log(err);}

                callback(null, {'old' : old, 'test' : test});
            });
        },
        function(args, callback) {
            if(args.old._tasks){
                async.map(args.old._tasks, function(task, callback){

                    var make =  {
                        desc : task.desc,
                        index : task.index,
                        name : task.name,
                        visible : 'true',
                        _test : args.test._id
                    };

                    Task.create(make, function(err, doc){
                        if (err){ console.log(err); }
                        callback(null,doc._id);
                    });

                }, function(err, results){
                    console.log('callback', results);
                    callback(null, {tasks: results, test: args.test});
                });
            } else {
                callback(null, {test: args.test});
            }
        },
        function(args, callback){
            if(args.tasks){
                args.test._tasks = args.tasks;
                args.test.save(function(err,test){
                    if (err){ console.log(err); }
                    callback(null, test);
                });
            }
        }
    ], function (err, result) {
        if(err){console.log(err);}
        next(err, result);
    });
};