// run.js
'use strict';

module.exports = function(app, passport) {

// Module dependencies
var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('underscore');

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
				console.log('touched run get')
				res.json('touched run get')
			});

	// How to populate subdocuments is in here.
	app.route('/api/run/:_id')
		.get(function(req,res){
			console.log('touched run route',req.params._id )

			Test.find({"_id":req.params._id, "_tasks": {$not: {$size: 0}}})
				.populate('_tasks')
				.exec(function(err, docs){
					if(err) res.send(err);

					res.json(docs)
				})
		})
		.post(function(req,res){
			console.log('touched run post', req.body)

			// on post:
			// add subject to tests that have been updated with that subject
			// add subject to tasks that have been updated with that subject
			// add tests to subject that has been part of that test

			Subject.findById(req.body.subject)
				.exec(function(err, subject){
					console.log('subject tests', subject._tests);
					
					subject._tests = req.body.tests;

					subject.save(function(err,data){
						if(err) res.send(err);
					});
				});
		

			// for each test in session
			// add a subject to that test if it has run.
			for(var i = 0; i < req.body.tests.length; i++){
				console.log('tests', req.body.tests[i])
				
				Test.findById(req.body.tests[i], function(err, test){
					
					if(test._subjects.indexOf(req.body.subject) == -1){
						test._subjects.push(req.body.subject)
					}

					test.save(function(err, data){
						if(err) res.send(err);

						console.log('saved', data._id)
					})
				});

				
			}

			// for each task in a run test
			// if a subject has hit that task,
			// push the subject to its subject array

			//TODO: Fix this to be async
			for(var i = 0; i < req.body.tasks.length; i++){
				console.log('tasks', req.body.tasks[i])
				Task.findById(req.body.tasks[i], function(err, task){

					if(task._subjects.indexOf(req.body.subject) == -1){
						task._subjects.push(req.body.subject)
					}

					task.save(function(err, data){
						if(err) res.send(err);

						console.log('saved', data._id)
					})
				})
			}

			res.json('tests updated', req.body.tests)
		});
}