// delete-task.js
'use strict';

module.exports = function(task, next){

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');

// load data storage models
    var Message = require('../models/data/message');
    var Task    = require('../models/data/task');
    var Test    = require('../models/data/test');
    var Tag     = require('../models/data/tag');
    var Subject = require('../models/data/subject');

// delete a task
    // find a task
    // remove it from its test
    // remove all related messages and tags 

    async.parallel([
        function(callback){
            Task.findById(task, function(err, doc){
                if(err){ console.log(err); }

                Test.findOne({'_id': doc._test})
                    .exec(function(err, test){
                        if(err){ console.log(err); }

                        test._tasks.remove(doc._id);
                        test.save(function(err,data){
                            if(err){console.log(err);}
                        });
                    });
            })
            .remove(function(err){
                if(err){console.log(err);}
                callback(null, 'task');
            });
        },
        function(callback){
            Message.remove({ '_task' : task }, 
                function(err, msg){
                    if(err){console.log(err);}
                    callback(null, 'msg');
                });
        },
        function(callback){
            Tag.remove({_task: task},
                function(err, msg){
                    if(err){console.log(err);}
                    callback(null, 'tag');
                });
        }
    ], 
    function(err, results){
        if(err){console.log(err);}
        next(task);
    });
};