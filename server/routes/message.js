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
		//// console.log('touched new message ', req.body)

		var msg = new Message();

		console.log('message id', msg._id);

		msg._task = mongoose.Types.ObjectId(req.params._task);
		msg._test = mongoose.Types.ObjectId(req.params._test);
		msg._session = mongoose.Types.ObjectId(req.params._session);
		msg._subject = mongoose.Types.ObjectId(req.params._subject);
		msg.created_by = req.user._id;

		//msg.created_by  = req.body.created_by; //this is to do with authentication.
		msg.body = req.body.body;
		
		msg.save(function(err, doc){
			//save the new message
			if (err) {res.send(err);}

			console.log('msg',doc);

			if (msg._task){
				console.log(msg._task);
				Task.findById( msg._task )
					.exec(function(err, msg_task){
						if (err) {res.send(err);}
	
						console.log('can we find a task', msg_task);
	
						// msg_task._messages.push(doc._id);
						
						// msg_task.save(function(err,data){
						// 	if(err){res.send(err);}
						// });
					});
			}
			//// console.log('Subject', req.body._subject)

			Subject.findById(req.body._subject)
				.exec(function(err,subject){
					if (err) {res.send(err);}

					//// console.log('message', msg._id, subject);

					subject._messages.push(msg._id);

					subject.save(function(err,data){
						if(err){res.send(err);}
					});
				});

			if(req.body.tags){
			// if there are tags, do things with them

			// for each tag
			// update or upsert the tag into the Tag collection 

				var test = req.body._test;
				var task = req.body._task;
				var session = req.body._session;

				async.each(req.body.tags, function(tag){
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
							function(err, data){});
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