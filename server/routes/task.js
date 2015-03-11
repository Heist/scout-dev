// task.js
'use strict';

module.exports = function(app, passport, debug) {

// Module dependencies ==========================
    var async    = require('async');

// load data storage models =====================
    var models  = require('../models');
 
// load functions  ==============================
    var functions  = require('../models/functions');

// TASK ROUTES ===================================================

    app.route('/api/task/')
    // get all tasks
    .get(function(req,res){
        models.Task.find({}, 
            function(err, tasks) {
                if(err){ console.log(err); }
                res.json(tasks);
            });
    })
    .put(function(req,res){
        // update an array of tasks
        var arr = _.toArray(req.body);

        functions.objectUpdate(arr, function(err, update){
            if(err){console.log(err);}
            res.json(update);
        });
    })
    .post(function(req,res){
        // Create a new task and push it to a test.
        // TODO: This relies on a dual pointer. We should remove that shit.

        models.Task.create({
            name : req.body.name,
            desc : req.body.desc,
            _test : req.body._test,
            index : req.body.index
        }, function(err, task){
            if(err){ console.log(err); }

            models.Test.findOneAndUpdate(
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
        models.Task.findById(req.params._id)
            .exec(function(err,task){
                if(err){console.log(err);}
                res.json(task);
            });
    })
    .put(function(req,res){
    // update a single task
        functions.objectUpdate([req.body], function(err, update){
            if(err){console.log(err);}
            res.json(update);
        });
    })
    .delete(function(req,res){
    // delete a task
        functions.deleteTask(req.params._id, function(err, task){
            if(err){console.log(err);}
            res.json(task);
        });
    });
};