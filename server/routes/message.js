//message.js
'use strict';

module.exports = function(app, passport) {
//Module dependencies
var mongoose = require('mongoose');  //THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('underscore');
var async = require('async');

//load data storage models
var Message = require('../models/data/message');
var Task    = require('../models/data/task');
var Test    = require('../models/data/test');
var Tag     = require('../models/data/tag');
var Session = require('../models/data/session');
var Subject = require('../models/data/subject');

//MESSAGE ROUTES  ================================================

app.route('/api/message/')
	.get(function(req,res){
		Message.find({})
			.exec(function(err, messages) {
				if(err){res.send(err);}
				res.json(messages);
			});
	})
	.post(function(req,res){
		console.log('touched new message ', req.body);

		var m = {}; // surface message id for use in promises.
		var msg = {};
		var call = {};

		if (req.body.body) {msg.body = req.body.body;}		
		if (req.body._subject) {msg._subject = mongoose.Types.ObjectId(req.body._subject);}
		if (req.user._id) {msg.created_by = mongoose.Types.ObjectId(req.user._id);}

		if (req.body._task) {call._task = mongoose.Types.ObjectId(req.body._task);}
		if (req.body._test) {call._test = mongoose.Types.ObjectId(req.body._test);}
		if (req.body._session) {call._session = mongoose.Types.ObjectId(req.body._session);}

		var promise = Message.create(msg, function(err, msg){if (err) {res.send(err);} console.log(msg); });

		promise.then(function(msg){
			console.log('made a message', msg);

			// fun fact: get this wrong and mongoose silently creates a new object._id that exists nowhere else.
			m._id = mongoose.Types.ObjectId(msg._id);
			
			if (call._task){
				
				console.log(call._task);
				
				var update = { $push: {_messages : m._id} };

				return Task.findByIdAndUpdate( call._task, update, function(err,doc){ if (err) {res.send(err);} });
			}
		}).then(function(task){
			console.log('made a task update', task);
			var u = { $push: {_messages : m._id} };

			return Subject.findByIdAndUpdate(req.body._subject, u, function(err,doc){ if (err) {res.send(err);} });
				
		}).then(function(subject){
			console.log('made a subject update', subject);
			
			if(req.body.tags){ // reminder: the tags are not attached to the message. The message is attached to tags.
				console.log('tags call', call);
			
				async.each(req.body.tags, function(tag){
					var q = {body: tag, _test: call._test};
					var u = { $push: { _messages: m._id,
										_tasks : call._task
									},
								body: tag,
								_test: call._test,
								_session: call._session
							};
					var o = {upsert:true};

					Tag.findOneAndUpdate( q, u, o, function(err, data){});
				});
				
			}
			res.send('done');
		}).then(null, function(err){
			if(err) {return res.send (err);}
		});
	});
		


app.route('/api/message/:_id')
	.get(function(req,res){
		//get one specific test
		// console.log(req)
		Message.findById(req.params._id)
			.exec(function(err,msg){
				if(err){res.send(err);}
				
				// console.log(msg)
				res.json(msg);
			});
	});
};