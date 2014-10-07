// message.js
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

// MESSAGE ROUTES  ================================================

app.route('/api/message/')
	.get(function(req,res){
		Message.find({})
			.exec(function(err, messages) {
				if(err) res.send(err);
				res.json(messages);
			});
	})
	.post(function(req,res){
		console.log('touched new message ', req.body)

		var msg = new Message();

		// console.log('message id', msg._id)

		msg._task	 = req.body._task;
		msg._test	 = req.body._test;
		msg._session = req.body._session;
		msg._subject = req.body._subject;
		msg.created_by = req.user._id;

		// msg.created_by  = req.body.created_by; // this is to do with authentication.
		msg.body	 	= req.body.body;
		
		msg.save(function(err, msg){
			// save the new message
			if (err) res.send(err);

			res.json(msg);

			Task.findById( req.body._task )
				.exec(function(err,task){
					if (err) res.send(err);

					// console.log(msg._id);

					task._messages.push(msg._id);
					
					task.save(function(err,data){
						if(err) res.send(err);
					})
				})

			// console.log('Subject', req.body._subject)

			Subject.findById(req.body._subject)
				.exec(function(err,subject){
					if (err) res.send(err);

					console.log('message', msg._id, subject);

					subject._messages.push(msg._id);

					subject.save(function(err,data){
						if(err) res.send(err);
					})
			})

			// if there are tags, add them to the DB and then add their test to them
			if(req.body.tags){
				for( var i = 0; i < req.body.tags.length; i++){
					console.log('tags', req.body.tags[i])
					var tag_body = req.body.tags[i];

					Tag.findOne({body: tag_body, _test: req.body._test})
						.exec(function(err, doc){
							if(err) res.send(err);
							console.log('tag_body', tag_body);
						
							if(doc) { 
								console.log( 'this tag matched a tag in the db', doc._id)
								
								doc._messages.push(msg._id);
								
								doc.save(function(err, data){
									if (err) res.send(err);
									
									console.log(data._messages)
								})
							 }

							if(!doc) {
								console.log( 'no tags match this call', tag_body, req.body._test)

								var tag = new Tag();
								
								tag._messages.push(msg._id);
								tag._tasks.push(req.body._task);

								tag._test	 = req.body._test;
								tag._session = req.body._session;
								tag.body	 = tag_body;

								tag.save(function(err, tag){
									if (err) res.send(err);

									Test.findById( req.body._test)
										.exec(function(err,test){
											console.log(test)

											test._tags.push(tag._id);

											test.save(function(err,data){
												if (err)
													res.send(err);
											
												console.log(data);
											})
										})
									})
							}
						})
					}
				}
		})
	});
		


app.route('/api/message/:_id')
	.get(function(req,res){
		// get one specific test
		console.log(req)
		Message.findById(req.params._id)
			.exec(function(err,msg){
				if(err) res.send(err);
				
				console.log(msg)
				res.json(msg);
			})
	});
}