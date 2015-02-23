// edit-test.js
// desperation function to get tasks to stay in proper array order
'use strict';       

module.exports = function(test, next){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _        = require('lodash');
    var async    = require('async');
    var Promise  = require('bluebird');

// load data storage models =====================
    var Test   = global.rootRequire('./server/models/data/test');
    var Task       = global.rootRequire('./server/models/data/task');

// EDIT A TEST ============================================ 

    var tasks = [];

    async.waterfall([
        function(callback){
            if(test._tasks.length > 0){
                tasks = _.pluck(test._tasks, '_id');

                async.each(test._tasks, function(task){
                    Task.findOneAndUpdate(
                        {'_id': task._id},
                        {index : task.index },
                        function(err, doc){
                            if(err){console.log(err);}
                        });
                });

                callback(null, tasks);
            } else {
                callback(null, null);
            }
        },
        function(tasks, callback){
            Test.findOneAndUpdate(
            { _id : test._id },
            {
                desc    : test.desc,
                link    : test.link,
                name    : test.name,
                platform: test.platform,
                kind    : test.kind,
                _tasks  : tasks
            },
            { upsert : true },
            function (err, doc) {
                if (err){console.log(err);}
                callback(null, doc);
            });
        }
    ], 
    function(err, results){
        if(err){console.log(err);}
        next(null, results);
    });
};