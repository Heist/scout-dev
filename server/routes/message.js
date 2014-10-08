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

		msg._task	 = req.body._task;
		msg._test	 = req.body._test;
		msg._session = req.body._session;
		msg._subject = req.body._subject;
		msg.created_by = req.user._id;

		//msg.created_by  = req.body.created_by; //this is to do with authentication.
		msg.body	 	= req.body.body;
		
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
					})
				})

			//console.log('Subject', req.body._subject)

			Subject.findById(req.body._subject)
				.exec(function(err,subject){
					if (err) res.send(err);

					//console.log('message', msg._id, subject);

					subject._messages.push(msg._id);

					subject.save(function(err,data){
						if(err) res.send(err);
					})
			})

			//if there are tags, add them to the DB and then add their test to them

			//FUCK THIS AND THAT AND FUCK STUPID DAMN AAAAGH PROMISES FUCK FUCK FUCK

			if(req.body.tags){
			//if there are tags is fine, but a loop is unacceptable for resolving promises FOR WHATEVER REASON.
			//this needs to be rewritten.
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

								//probably this is where the test is found and updated
								Test.findOneAndUpdate(
									{_id : test},
									{
										$push: { _tags : rows._id }
									},
									function(err, test){
										done();
										res.json(msg);
									});
							}
						);
					};

					var doneLoop = function(err) {
						cb(returnData);
					};

					async.forEachSeries(input, runLoop, doneLoop);
				}

				loop(tags, function(updatedArray){
				    console.log(updatedArray);
				    //carry on....
				}); 
				

			//TODO: THIS SHIT
			//var upsertData = {
					//$push: { _messages : msg._id, _tasks : req.body._task},
					//_test : req.body._test,
					//_session : req.body._session,
					//body = req.body.tags[i]
					//};

			//tag.save(function(err, tag){
			//			if (err) res.send(err);

			//			Test.findById( req.body._test)
			//				.exec(function(err,test){
			//					//console.log(test)

			//					test._tags.push(tag._id);

			//					test.save(function(err,data){
			//						if (err)
			//							res.send(err);
									
			//						res.json(msg);
			//						//console.log(data);
			//					})
			//				})
			//		})

			//Promise: check for tags, then if there are tags, return them, and if not, move to the next step
				//for( var i = 0; i < req.body.tags.length; i++){
				//	console.log('tags', req.body.tags[i], req.body._test)
				//	var promise = 
				//	Tag.findOne({body: req.body.tags[i], _test: req.body._test})
				//		.exec(function(err, doc){
				//			if(err) res.send(err);

				//			console.log('tag_body', req.body.tags[i]);
						
				//			if(doc) { 
				//				console.log( 'this tag matched a tag in the db', doc._id)
								
				//				doc._messages.push(msg._id);
								
				//				doc.save(function(err, data){
				//					if (err) res.send(err);
									
				//					console.log(data._messages)
				//				})
				//			 }

				//			if(!doc) {
				//				console.log( 'no tags match this call', req.body.tags[i], req.body._test)
				//				return
				//			}
				//		});

					
				//	}
					
				}
		})
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
			})
	});
}