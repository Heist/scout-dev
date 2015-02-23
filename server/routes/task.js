// task.js
'use strict';

module.exports = function(app, passport, debug) {

// Module dependencies ==========================
    var mongoose = require('mongoose');  // Required to set ObjectID as ObjectID
    var _        = require('lodash');
    var async    = require('async');

// load data storage models =====================
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// load functions ===============================
    var deleteTask     = global.rootRequire('./server/models/functions/delete-task.js');
    var objectUpdates  = global.rootRequire('./server/models/functions/object-updates');

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

        objectUpdates(arr, function(err, update){
            if(err){console.log(err);}
            res.json(update);
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
        var arr = [req.body];
        
        objectUpdates(arr, function(err, update){
            if(err){console.log(err);}
            res.json(update);
        });
    })
    .delete(function(req,res){
    // delete a task
        deleteTask(req.params._id, function(err, task){
            if(err){console.log(err);}
            res.json(task);
        });
    });
};