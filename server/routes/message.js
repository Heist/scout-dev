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
				
		if (req.body._task) {msg._task = mongoose.Types.ObjectId(req.body._task);}
		if (req.body._test) {msg._test = mongoose.Types.ObjectId(req.body._test);}
		if (req.body._session) {msg._session = mongoose.Types.ObjectId(req.body._session);}
		if (req.body._subject) {msg._subject = mongoose.Types.ObjectId(req.body._subject);}
		if (req.user._id) {msg.created_by = mongoose.Types.ObjectId(req.user._id);}

		var promise = Message.create(msg);

		promise.then(function(msg){
			
			m._id = mongoose.Types.ObjectId(m._id);
			
			if (msg._task){
				
				console.log(msg._task);
				
				var update = { $push: {_messages : m._id} };

				Task.findByIdAndUpdate( msg._task, update, function(err,doc){ if (err) {res.send(err);} });
			}
		}).then(function(){
			
			var update = { $push: {_messages : m._id} };

			Subject.findByIdAndUpdate(msg._subject, update, function(err,doc){ if (err) {res.send(err);} });
				
		}).then(function(){
			
			if(req.body.tags){ // reminder: the tags are not attached to the message. The message is attached to tags.
				var test = msg._test;
				var task = msg._task;
				var session = msg._session;

				async.each(req.body.tags, function(tag){
					var q = {body: tag, _test: msg._test};
					var u = { $push: { _messages: m._id,
										_tasks : msg._task
									},
								body: tag,
								_test: msg._test,
								_session: msg._session
							};
					var o = {upsert:true};

					Tag.findOneAndUpdate( q, u, o, function(err, data){});
				});
			}	
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