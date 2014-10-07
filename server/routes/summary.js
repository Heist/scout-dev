// summary.js
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

// SUMMARY ROUTES ============================================

app.route('/api/summary/:_id')
	.get(function(req, res){

		// how to populate grandchildren sub-subdocuments is in here.
		var reply = {};

		// the promise gets your main document, with its populated subs
		var	promise = 
			Test.findById(req.params._id).populate('_tags').exec(function(err, test){
				if(err) res.send(err);
			});

		promise.then(function(test){
			reply.test = test;
			// a promise-then pair: Then must RETURN something to the promise. Backwards chaining.
			return Task.find({'_test':req.params._id}).select('_id summary name desc pass_fail').exec(function(err, task){if (err) console.log(err)});
		})
		.then(function(tasks){
			reply.tasks = tasks;
			console.log('test requested', req.params._id);

			// TODO: REDO THIS SO WE DON'T NEED TO REQUIRE MONGOOSE.
			return Message.aggregate({
							$match: { '_test':{$in: [mongoose.Types.ObjectId(req.params._id)]} }
						})
						.group({ 
							_id: '$_task',
							messages: { $push: { subject: '$_subject', body: '$body', fav:'$fav', _id:'$_id' } }
							})
						.exec(function(err, msg){
							if(err) res.send(err);
							console.log('message to populate', msg);
							
							Subject.populate(msg, {'path':'messages.subject', 'select' :'name -_id'}, function(err, subjects){
								if (err) res.send(err);
								console.log('subjects', subjects);
							});
						});
		})
		.then(function(messages){
			reply.messages = messages;
			console.log('reply messages', reply.messages)
			return Subject.find({'_tests': { $in: [req.params._id] }}).populate('_messages').exec();
		})
		.then(function(subjects){
			reply.subjects = subjects
			console.log('reply', reply.test._id, 'messages', reply.messages, 'tasks', reply.tasks)
			res.json(reply)
		})
		.then(null, function(err){
			if(err) return res.send (err)
		});
		
	})
	.put(function(req, res){
		// console.log('touched summary put', req.body);

		var query = {'_id':req.body.test._id};
		var update = {summary: req.body.test.summary}

		Test.findOneAndUpdate(query, update,function(err,test){
				if(err) return res.send (err)
				// console.log('test updated', test)
			});

		// if we have tags, update them in the db.
		if(req.body.tags){
			for(var i = 0; i < req.body.tags.length; i++){
				Tag.findOneAndUpdate(
					{'_id' : req.body.tags[i]._id}, 
					{'summary': req.body.tags[i].summary,
					 'summarized' : req.body.tags[i].summarized},
					 function(err, tag){
					 	// console.log('tags updated')
					 });
			}
		}
		
		// if we have tasks, update them in the db.
		if(req.body.tasks){
			for(var i = 0; i < req.body.tasks.length; i++){
				// console.log('task',req.body.tasks[i])

				var eyedee = req.body.tasks[i]._id;
				var summary = req.body.tasks[i].summary;
				var pass_fail = req.body.tasks[i].pass_fail;
				// console.log('summary, pass_fail', summary, pass_fail);

				Task.findByIdAndUpdate(
					req.body.tasks[i]._id,
					{'pass_fail': pass_fail,
					 'summary':summary },
					function(err, task){
						if(err) res.send(err)
						console.log('task updated', task)
					});
				
				
				// if the task object contains messages, update those.
				if(req.body.tasks[i].messages){
					// console.log('messages length', req.body.tasks[i].messages.length);
					for(var j = 0; j < req.body.tasks[i].messages.length;j++){
						for(var k = 0; k < req.body.tasks[i].messages[j].length; k++){

							var fav = req.body.tasks[i].messages[j][k].fav;
							var msg_id = req.body.tasks[i].messages[j][k]._id;
							// console.log(req.body.tasks[i].messages[j][k].fav, req.body.tasks[i].messages[j][k]._id)

							Message.findByIdAndUpdate(
								msg_id, 
								{ 'fav' : fav}, 
								function(err, mess){
									if(err) res.send(err);
									// console.log('message saved', mess)
								});
						}
					}
				}
			}
		}

		console.log('test updated - server')
		res.json('test updated - server')
	});	
}