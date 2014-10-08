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
				if(err) res.send(err);
				res.json(messages);
			});
	})
	.post(function(req,res){
		//console.log('touched new message ', req.body)

		var msg = new Message();

		//console.log('message id', msg._id)

		msg._task = req.body._task;
		msg._test = req.body._test;
		msg._session = req.body._session;
		msg._subject = req.body._subject;
		msg.created_by = req.user._id;

		//msg.created_by  = req.body.created_by; //this is to do with authentication.
		msg.body = req.body.body;
		
		msg.save(function(err, msg){
			//save the new message
			if (err) res.send(err);

			Task.findById( req.body._task )
				.exec(function(err,task){
					if (err) res.send(err);

					//console.log(msg._id);

					task._messages.push(msg._id);
					
					task.save(function(err,data){
						if(err) res.send(err);
					});
				});

			//console.log('Subject', req.body._subject)

			Subject.findById(req.body._subject)
				.exec(function(err,subject){
					if (err) res.send(err);

					//console.log('message', msg._id, subject);

					subject._messages.push(msg._id);

					subject.save(function(err,data){
						if(err) res.send(err);
					});
			});

			if(req.body.tags){
			//solution from http://stackoverflow.com/questions/16960349/mongoose-findoneandupdate-callback-with-array-of-ids

				//for each tag
				//update or upsert the tag into the Tag collection 

				var tags = req.body.tags;
				var test = req.body._test;
				var task = req.body._task;
				var session = req.body._session;

				var updatedArray = [];

				var loop = function(input, cb){
					var returnData = [];
					var runLoop = function(tag, done) {
						Tag.findOneAndUpdate(
							{body: tag, _test: test},
							{ $push: { _messages: msg._id,
										_tasks : task
									},
								body: tag,
								_test: test,
								_session: session
							},
							{upsert:true},
							function(err, rows){
								returnData.push(rows._id);
								res.json(msg);
								done();
							}
						);
					};

					var doneLoop = function(err) {
						cb(returnData);
					};

					async.forEachSeries(input, runLoop, doneLoop);
				};

				loop(tags, function(updatedArray){
					console.log(updatedArray);
					//carry on....
				});
					
			}
		});
	});
		


app.route('/api/message/:_id')
	.get(function(req,res){
		//get one specific test
		console.log(req)
		Message.findById(req.params._id)
			.exec(function(err,msg){
				if(err) res.send(err);
				
				console.log(msg)
				res.json(msg);
			});
	});
};