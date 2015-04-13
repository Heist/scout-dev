// edit-test.js
// desperation function to get tasks to stay in proper array order
'use strict';       

module.exports = function(test, next){

// Module dependencies ==========================
    var async    = require('async');
    var _ = require('lodash');
    var models   = require('../../models');

// EDIT A TEST ============================================ 

    var tasks = [];
    // console.log('edit this', test);
    
    async.waterfall([
        function(callback){
            if(test._tasks){
                if(test._tasks.length > 0){
                    tasks = _.pluck(test._tasks, '_id');
    
                    async.each(test._tasks, function(task){
                        models.Task.findOneAndUpdate(
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
            } else {
                callback(null, null);
            }
        },
        function(tasks, callback){
            models.Test.findOneAndUpdate(
            { _id : test._id },
            {
                desc    : test.desc,
                link    : test.link,
                name    : test.name,
                platform: test.platform,
                kind    : test.kind,
                _tasks  : tasks || []
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