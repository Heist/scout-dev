// test.js
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

// TEST ROUTES ===================================================

app.route('/api/test/')
	// get all of the tests	
	.get(function(req,res){
		console.log(' get all tests ', req.isAuthenticated(), req.user._id)
		Test.find({created_by:req.user._id})
			.exec(function(err, docs) {
				if(err){res.send(err);}

				res.json(docs);
			})
	})
	// add a new test
	.post(function(req,res){
		console.log('post a new test', req.body)
			var test = new Test();

			test.name = req.body.name;
			test.created_by = req.body.created_by;

			// later, we will be building playlists
			// sessions should store tests but tests 
			// don't need to know they belong to any playlist specially.
			// sessions should store their own ordering data, etc.

			if(test._session){
					test._session = req.body._session;
				}
			
			test.save(function(err, test){
				if(err){res.send(err);}
				
				res.json(test);

			})
	});


app.route('/api/test/:_id')
	.get(function(req,res){
		// get one test

		Test.findById(req.params._id)
			.populate('_tasks')
			.exec(function(err,test){
				if(err){res.send(err);}

				console.log('single test', test)
				res.json(test);
		});		
	})

	// update one test with new information
	.put(function(req,res){
		// console.log('touched test put', req.body)

		if(req.body._tasks){
			var tasks = _.pluck(req.body._tasks, '_id');
		}

		console.log('tasks', tasks);

		Test.findById(req.params._id)
			.exec(function(err,test){
				// console.log('touched test update', test)
				
				if(req.body.name){test.name = req.body.name}
				if(req.body.desc){test.desc = req.body.desc}
				if(req.body.platform){test.platform = req.body.platform}
				if(req.body._tasks){test._tasks = tasks}
				if(req.body.link){test.link = req.body.link}
				if(req.body.subject){test._subjects.push(req.body.subject)}
				
				console.log(test);

				test.save(function(err, data){
					if (err) res.send(err);

					res.json(data);
				})
			});
	})

	.delete(function(req,res){
		// deletes a single test by id
		// from session list of tests
		// and then removes 
		// all tasks
		// all messages
		// all tags
		// that belonged to that test.

		console.log('delete this test', req.params._id)

		Test.find({_id:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

		Task.find({_test:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

		Message.find({_test:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

		Tag.find({_test:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

		res.json('test removed', req.params._id);

	});
}