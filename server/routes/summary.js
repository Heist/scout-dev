// summary.js
'use strict';

module.exports = function (app, passport) {

// Module dependencies
var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('underscore');
var async = require('async');

// load data storage models
var Message = require('../models/data/message');
var Task    = require('../models/data/task');
var Test    = require('../models/data/test');
var Tag     = require('../models/data/tag');
var Session = require('../models/data/session');
var Subject = require('../models/data/subject');

// SUMMARY ROUTES ============================================

app.route('/api/summary/:_id')
	.get(function(req, res){

		// how to populate grandchildren sub-subdocuments is in here.
		var reply = {};

		// the promise gets your main document, with its populated subs
		var	promise = 
			Test.findById(req.params._id).exec(function(err, test){
				if(err){res.send(err);}
			});

		promise.then(function(test){
			reply.test = test;
			// a promise-then pair: Then must RETURN something to the promise. Backwards chaining.
			return Task.find({'_test':req.params._id}).sort({ index: 'asc'})
						.select('_id summary name desc pass_fail')
						.exec(function(err, task){
							if (err) {console.log(err);}
						});
		})
		.then(function(tasks){
			reply.tasks = tasks;
			return Tag.find({'_test' : reply.test._id}).exec();
		})
		.then(function(tags){
			reply.tags = tags;
			
			return Message.find({ '_test':{$in: [req.params._id]}})
						.populate({path:'_subject', select: 'name' })
						.exec();
		})
		.then(function(messages){
			reply.messages = messages;
			console.log(messages);
			res.json(reply);
		})
		.then(null, function(err){
			if(err) {return res.send (err);}
		});
	})
	.put(function(req, res){
		// // console.log('touched summary put', req.body);

		var query = {'_id':req.body.test._id};
		var update = {summary: req.body.test.summary};

		Test.findOneAndUpdate(query, update,function(err,test){
				if(err) {return res.send (err);}
				// // console.log('test updated', test)
			});

		// if we have tags, update them in the db.
		// NO FUNCTIONS IN A LOOP.
		if(req.body.tags){
			async.each(req.body.tags, function(tag, callback){
				Tag.findOneAndUpdate(
					{'_id' : tag._id}, 
					{'summary': tag.summary,
					'summarized' : tag.summarized},
					function(err, data){
					// // console.log('tags updated')
				});
			});
		}
		
		if(req.body.tasks){
			async.each(req.body.tasks, function(task, callback){
				var eyedee = task._id;
				var summary = task.summary;
				var pass_fail = task.pass_fail;
				// // console.log('summary, pass_fail', summary, pass_fail);

				Task.findByIdAndUpdate(
					task._id,
					{'pass_fail': pass_fail,
					'summary':summary },
					function(err, data){
						if(err) {return res.send (err);}
						// console.log('task updated', data);
					});
			});
		}
		
		// this is actually users, not messages.
		// messages needs to be returned separately on the front end.
		// perhaps try underscore_pop or something.

		if(req.body.messages){
			async.each(req.body.messages, function(msg, callback){

				var fav_task = msg.fav_task;
				var fav_tag = msg.fav_tag;
				var msg_id = msg._id;
				
				Message.findByIdAndUpdate(
					msg_id, 
					{ 'fav_task' : fav_task,
					'fav_tag'  : fav_tag,
					}, 
					function(err, mess){
						if(err){res.send(err);}
						// // console.log('message saved', mess)
					});
			});
		}
		
		// console.log('test updated - server');
		res.json('test updated - server');
	});	
};