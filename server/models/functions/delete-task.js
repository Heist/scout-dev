// delete-task.js
'use strict';

module.exports = function(task, next){

// Module dependencies ==========================
    var async = require('async');
    var models   = require('../../models');

// delete a task
    // find a task
    // remove it from its test
    // remove all related messages and tags 

    async.parallel([
        function(callback){
            models.Task.findById(task, function(err, doc){
                if(err){ console.error(err) }

                models.Test.findOne({'_id': doc._test})
                    .exec(function(err, test){
                        if(err){ console.error(err) }

                        test._tasks.remove(doc._id);
                        test.save(function(err,data){
                            if(err){ console.error(err); }
                        });
                    });
            })
            .remove(function(err){
                if(err){ console.error(err); }
                callback(null, 'task');
            });
        }
    ], 
    function(err, results){
        if(err){ console.error(err); }
        next(task);
    });
};