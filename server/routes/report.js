// report.js
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

// REPORT ROUTES =============================================
// http://mongoosejs.com/docs/api.html#model_Model.populate
app.route('/api/report/:_id')
	.get(function(req, res){
		console.log('touched report get');

		var reply = {};
		var promise = 
			Test.findOne({'_id' : req.params._id}).populate('_subjects _tags').exec(function(err, test){
				if(err) res.send(err);

				// Tag.populate(test._tags, {'path': '_messages', match: { fav : true }});

			});

		promise.then(function(test){
			reply.test = test;
			// a promise-then pair: Then must RETURN something to the promise. Backwards chaining.
			return Task.find({'_test':req.params._id})
						.populate({'path': '_messages', match: { fav : true }})
						.select('_id summary name pass_fail desc _messages')
						.exec(function(err, tasks){
							if(err) res.send(err);
							// console.log('tasks', tasks);
						});
			// in here, this has to have all the messages for this task that are also fav'd
		})
		.then(function(tasks){
			reply.tasks = tasks;
			// console.log(tasks)
			
				// for each task, populate the _messages._subject name
				// Subject.find({'_tests': { $in: [req.params._id] }})
			return	Message.find({'_test':req.params._id, 'fav' : true})
						.populate({path: '_subject', 'select': 'name -_id'})
						.select('_subject body created_by _id')
						.exec(function(err, message){
							// console.log(message)
						})
						
			
		}).then(function(messages){
			// console.log('hello', reply.tasks.length)
			// console.log('messages', messages)

			// TODO: NONE OF THIS SCALES AT ALL.
			// replace tag messages with messages that are populated
			for (var i = 0; i < reply.test._tags.length; i++ ){
				var baseTag = reply.test._tags[i];
				// console.log('baseTag', baseTag._id);
				if(baseTag._messages.length > 0){
					// console.log('there are messages', baseTag._messages.length)

					for(var j = 0; j < baseTag._messages.length; j++){
						console.log('baseTag message _id', baseTag._messages[j])
						// console.log('messages array', messages.length)
						for(var k = 0; k < messages.length; k++){
							// console.log(messages[k]._id)

							msg_id = messages[k]._id.toString();
							rply_id = baseTag._messages[j].toString();
							
							// console.log('msg_id', msg_id)
							// console.log('rply_id', rply_id)
							
							if( msg_id == rply_id){
								console.log('ping')
								baseTag._messages[j] = messages[k];
							}
						}
					}

				}

				// console.log('new messages', baseTag._messages);
			}

			// console.log('reply tags', reply.test._tags )
			// tear out whatever tasks think are their messages
			// replace with their actual messages
			for(var i =0; i<reply.tasks.length; i++){
				if(reply.tasks[i]._messages){
					for(var j = 0; j<reply.tasks[i]._messages.length; j++){
					// console.log('reply task message id', reply.tasks[i]._messages[j]._id)
						for(var k = 0; k < messages.length; k++){
							msg_id = messages[k]._id.toString();
							rply_id = reply.tasks[i]._messages[j]._id.toString();

							// console.log('msg_id', msg_id)
							// console.log('rply_id', rply_id)

							if( msg_id == rply_id){
								// console.log('ping')
								reply.tasks[i]._messages[j] = messages[k]
							}
						}
					}
				}
				// console.log(reply.tasks[i]._messages)	
			}
			
			res.json(reply);
		})
		.then(null, function(err){
			if(err) return res.send (err)
			
		});
	});	

}