// task.js
'use strict';

module.exports = function(app, passport, debug) {

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

// TASK ROUTES ===================================================

app.route('/api/task/')
    // get all tasks
    .get(function(req,res){
        Task.find({}, 
            function(err, tasks) {
                if(err){ console.log(err); }
                res.json(tasks);
            });
    })
    .put(function(req,res){
        // update an array of tasks
        var arr = _.toArray(req.body);
        async.map(arr, 
            function(key, callback){
                Task.findOneAndUpdate(
                    { '_id' : key._id },
                    { 
                        name : key.name,
                        summary : key.summary,
                        pass_fail : key.pass_fail,
                        desc : key.desc,
                        _test : key._test,
                        index : key.index,
                        $push: { '_subjects' : key._subject }
                    },
                    { upsert : false },
                    function(err, task){
                        if(err){console.log(err);}
                        callback( null, task);
                    });
            }, 
        function(err, results){
            if(err){console.log(err);}
            res.json(results);
        });
    })
    .post(function(req,res){
        // Create a new task and push it to a test.
        // TODO: This relies on a dual pointer. We should remove that shit.

        Task.create({
            name : req.body.name,
            desc : req.body.desc,
            _test : req.body._test,
            index : req.body.index
        }, function(err, task){
            if(err){ console.log(err); }

            Test.findOneAndUpdate(
                { '_id' : task._test},
                { $push: { '_tasks' : task._id} },
                { upsert : false },
                function(err, test){
                    if (err) { console.log(err); }
                    res.json(task);
                });
        });
    });

app.route('/api/task/:_id')
    .get(function(req,res){
        // get single task
        Task.findById(req.params._id)
            .exec(function(err,task){
                if(err){console.log(err);}
                res.json(task);
            });
    })
    .put(function(req,res){
        // update a single task
        
        Task.findById(req.params._id)
            .exec(function(err, task){
                if (err) { console.log(err); }

                if(req.body.name){task.name = req.body.name;}
                if(req.body.summary){task.summary = req.body.summary;}
                if(req.body.pass_fail !== null){ task.pass_fail = req.body.pass_fail;}
                if(req.body.desc){task.desc = req.body.desc;}
                if(req.body._test){task._test = req.body._test;}
                if(req.body.index){task.index = req.body.index;}
                if(req.body._subject){task._subjects.push(req.body._subject);}

                task.save(function(err,task){
                    if(err){console.log(err);}

                    // console.log('updated task', task);
                    res.json(task);
                });
            });
    })
    .delete(function(req,res){
    // delete a task
        // find a task
        // remove it from its test
        // then remove all messages
        // and tags 
        // related to that task

        Task.findById(req.params._id, function(err, task){
            if (err) { console.log(err); }
            
            Test.findOne({'_id': task._test})
                .exec(function(err, test){
                    if (err) { console.log(err); }
                    // TODO: when this sort of thing fails to work,
                    // it populates the array in question with a ton of ghosts.
                    test._tasks.remove(req.params._id);

                    test.save(function(err,data){
                        if(err){console.log(err);}

                        // console.log(data);
                        res.json(req.params._id);
                    });
                });
        })    
        .remove(function(err){
            if(err){console.log(err);}
        });

        // find messages that belong to the task and delete them
        Message.find({_task:req.params._id})
            .remove(function(err){
                if (err){ console.log(err); }
            });

        // find tags that belong to the task and delete them
        Tag.find({_task:req.params._id})
            .remove(function(err){
                if (err){ console.log(err); }
            });

    });
};