// session.js
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

// SESSION ROUTES =========================================

app.route('/api/session/')
	.get(function(req,res){

		Session.find({})
			.populate('_tests')
			.exec(function(err, docs){
				if(err) res.send(err);

				res.json(docs);
			})
	})

	// add a new session
	// this should then just push the new session back to the front end.

	.post(function(req, res){
		var session = new Session();
	
		session.name = 'New Session';
		session.runcount = 0;

		session.save(function(err, data) {
			if(err) res.send(err);

			res.json(data)			        	
        });
	});

app.route('/api/session/:_id')
	.get(function(req,res){
		Session.findById(req.params._id)
			.populate('_tests')
			.exec(function(err, docs){
				if(err) res.send(err);

				res.json(docs);
			})
	})
	// deletes all sessions and subdocuments - tasks, tests, reports, summaries.
	.delete(function(req,res){
		console.log('session delete', req.params._id);

		Session.findById(req.params._id).remove(function(err){
			if(err) res.send(err);
		});

		Test.find({_session:req.params._id}).remove(function(err){
			if(err) res.send(err);
		});

		Task.find({_session:req.params._id}).remove(function(err){
			if(err) res.send(err);
		});

		Message.find({_session:req.params._id}).remove(function(err){
			if(err) res.send(err);
		});

		Tag.find({_session:req.params._id}).remove(function(err){
			if(err) res.send(err);
		});

		res.json('deleted session', req.params._id);
	})

	// change the name of the session
	.put(function(req,res){
		console.log('session put request', req.params._id);

		Session.findById(req.params._id)
			.exec(function(err, session){
				if(err) res.send(err);
			
				if(req.body.name){
						session.name = req.body.name;
					}

				if(req.body.runcount){
						session.runcount = req.body.runcount;
					}

			session.save(function(err, data) {
				if(err) res.send(err);

				res.json(data);			
			})
		})
	});

app.route('/api/session/:_id/test/')
	// get all tests by session
	.get(function(req,res){
		Test.find({'_session': req.params._id})
			.exec(function (err, docs) {
	  			if(err) res.send(err);

			  	console.log('tests', docs);
			  	
			})
	});

    
}