// task.js
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

// TASK ROUTES ===================================================

app.route('/api/task/')
	// get all tasks
	.get(function(req,res){
		Task.find({})
			.exec(function(err, tasks) {
				if(err) res.send(err);

				res.json(tasks);
			});
	})
	.post(function(req,res){
		var task = new Task();

		task.name = req.body.name;
		task._test = req.body._test;
		task._session =  req.body._session;
		task.index = req.body.index;
		
		task.save(function(err, task){
			if (err)
				res.send(err);
			
			Test.findById( task._test, function(err,test){
				console.log(task._id);

				test._tasks.push(task._id);

				test.save(function(err,data){
					if(err) res.send(err);
				})
			
				res.json(task);
			});
		})
	});

app.route('/api/task/:_id')
	// get single task
	.get(function(req,res){
		Task.findById(req.params._id)
			.exec(function(err,task){
				if(err) res.send(err);

				console.log(task)
				res.json(task);
			})
	})
	
	// update a single task
	.put(function(req,res){
		console.log('touched task', req.body, req.body.index)

		Task.findById(req.params._id)
			.exec(function(err, task){
				if (err) res.send(err);

				if(req.body.name){task.name = req.body.name}
				if(req.body.desc){task.desc = req.body.desc}
				if(req.body._test){task._test = req.body._test}
				if(req.body.index){task.index = req.body.index}
				if(req.body._session){task._session = req.body._session}
				if(req.body._subject){task._subjects.push(req.body._subject)}

				task.save(function(err,task){
					if(err) res.send(err);

					console.log('updated task', task);
					res.json(task);
				})

		})
	})

	// delete a task
	.delete(function(req,res){
		console.log('delete this task', req.params._id)

		// find a task
		// remove it from its test
		// then remove all messages
		// and tags 
		// related to that task

		Task.findById(req.params._id, function(err, task){
				if (err) res.send(err);

				console.log('single task found', task);

				Test.findOne({'_id': task._test})
					.exec(function(err, test){
						if (err) res.send(err);

						console.log('found test ', test._id);
						console.log(test._tasks);

						// TODO: when this sort of thing fails to work,
						// it populates the array in question with a ton of ghosts.
						test._tasks.remove(req.params._id)

						test.save(function(err,data){
							if(err) res.send(err);

							console.log(data);
							res.json(req.params._id);
						})
					})
				})
			.remove(function(err){
				if(err) res.send(err);
			});

		// find messages that belong to the task and delete them
		Message.find({_task:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

		// find tags that belong to the task and delete them
		Tag.find({_task:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

	});

}