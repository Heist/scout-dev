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
                if(err){  }

                models.Test.findOne({'_id': doc._test})
                    .exec(function(err, test){
                        if(err){  }

                        test._tasks.remove(doc._id);
                        test.save(function(err,data){
                            if(err){}
                        });
                    });
            })
            .remove(function(err){
                if(err){}
                callback(null, 'task');
            });
        },
        function(callback){
            models.Message.remove({ '_task' : task }, 
                function(err, msg){
                    if(err){}
                    callback(null, 'msg');
                });
        },
        function(callback){
            models.Tag.remove({_task: task},
                function(err, msg){
                    if(err){}
                    callback(null, 'tag');
                });
        }
    ], 
    function(err, results){
        if(err){}
        next(task);
    });
};