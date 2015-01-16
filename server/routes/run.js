// run.js
'use strict';

module.exports = function(app, passport, io) {

// Module dependencies
var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('lodash');
var async = require('async');

// load data storage models
var Message = require('../models/data/message');
var Task    = require('../models/data/task');
var Test    = require('../models/data/test');
var Tag     = require('../models/data/tag');
var Session = require('../models/data/session');
var Subject = require('../models/data/subject');



// RUN ROUTES =============================================
    app.route('/api/run/')
        .get(function(req,res){
                // console.log('touched run get')
                res.json('touched run get');
            });

    // How to populate subdocuments is in here.
    app.route('/api/run/:_id')
        .get(function(req,res){
            // console.log('touched run route',req.params._id )
            // console.log('touched run route', req.body)
            
            Test.find({"_id":req.params._id, "_tasks": {$not: {$size: 0}}})
                .populate('_tasks')
                .exec(function(err, docs){
                    if(err){res.send(err);}
                    res.json(docs);
                });

            // request('/api/run/:_id').pipe(request.put('http://104.236.16.159:8080/watch/'))
        })
        .post(function(req,res){
            // console.log('touched run post', req.body);

            // on post:
            // add subject to tests that have been updated with that subject
            // add subject to tasks that have been updated with that subject
            // add tests to subject that has been part of that test

            Subject.findById(req.body.subject)
                .exec(function(err, doc){
                    // console.log('subject tests', subject._tests);
                    
                    doc._tests = req.body.tests;

                    doc.save(function(err,data){
                        if(err){res.send(err);}
                    });
                });
        
            // for each test in session
            // add a subject to that test if it has run.

            if(req.body.tests){
                async.each(req.body.tests, function(test){
                    // console.log('test', test);
                    test = mongoose.Types.ObjectId(test);

                    Test.findById(test, function(err, doc){
                        
                        if(doc._subjects.indexOf(req.body.subject) === -1){
                            doc._subjects.push(req.body.subject);
                        }
    
                        doc.save(function(err, data){
                            if(err){res.send(err);}
                        });
                    });
                });
            }

            // for each task in a run test
            // if a subject has hit that task,
            // push the subject to its subject array

            async.each(req.body.tasks, function(task){
                Task.findById(task, function(err, doc){

                    if(doc._subjects.indexOf(req.body.subject) === -1){
                        doc._subjects.push(req.body.subject);
                    }

                    doc.save(function(err, data){
                        if(err){res.send(err);}
                    });
                });
            });
            
            res.json('tests updated', req.body.tests);
        });
};