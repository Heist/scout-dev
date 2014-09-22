// routes.js

// CONFIGURATION =====================================================
// Module dependencies
var express = require('express');
var _ 		= require('underscore');
var router  = express.Router();  // get an instance of the express Router
var util = require('util');
var mongoose = require('mongoose'); // so we can generate ObjectIDs for tests

// load data storage models
var Message = require('./models/data/message');
var Task 	= require('./models/data/task');
var Test    = require('./models/data/test');
var Tag     = require('./models/data/tag');
var Session = require('./models/data/session');
var Summary = require('./models/data/summary');
var Subject = require('./models/data/subject');

// load auth models
var User 	= require('./models/auth/user');

// console logging
router.use(function(req, res, next) {
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// Authenticator
// As with any middleware it is quintessential to call next()
// if the user is authenticated

function isAuthenticated(req, res, next) {
	// do any checks you want to in here

	// CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
	// you can do this however you want with whatever variables you set up
	if (req.user.authenticated)
		return next();

	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	res.redirect('/');
}

// ROUTE PARAMETERS =================================================
// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  isAuthenticated
  next();
});

// ROUTES  ==========================================================
// get/post to /api routes.
// router.route('/')
// 	.get({
// 	});

// AUTHORIZED ROUTES =============================================
// mobile users can access a list of tests
// authorized users with moderator status can edit and run tests
// observer users can join a test that is currently running and comment on it

router.route('/signup/')
	.post(function(req,res){
		passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		})
	});



// PUBLIC ROUTES =================================================
// public routes should only permit read access on the database
// specifically, the only read access supplied is for the reports view

// SESSION ROUTES ================================================
	
router.route('/session/')
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

router.route('/session/:_id')
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

router.route('/session/:_id/test/')
	// get all tests by session
	.get(function(req,res){
		Test.find({'_session': req.params._id})
			.exec(function (err, docs) {
	  			if(err) res.send(err);

			  	console.log('tests', docs);
			  	
			})
	});

// TEST ROUTES ===================================================
	
router.route('/test/')
	// get all of the tests	
	.get(function(req,res){
		Test.find({})
			.exec(function(err, docs) {
				if(err) res.send(err);

				res.json(docs);
			})
	})
	// add a new test
	.post(function(req,res){
			var test = new Test();

			test.name = req.body.name;
			test._session = req.body._session;
			
			test.save(function(err, test){
				if(err) res.send(err);
				
				Session.findById( test._session)
					.exec(function(err,session){
						console.log(test._id);

						session._tests.push(test._id);

						session.save(function(err,data){
							if (err) res.send(err);
						})
					
					res.json(test);
				});
			})
	});


router.route('/test/:_id')
	.get(function(req,res){
		// get one test

		Test.findById(req.params._id)
			.populate('_tasks')
			.exec(function(err,test){
				if(err) res.send(err);

				console.log('single test', test)
				res.json(test);
		});		
	})

	// update one test with new information
	.put(function(req,res){
		console.log('touched test put', req.body)

		var tasks = [];
		if(req.body.tasks){
			for(var i = 0; i < req.body.tasks.length; i++){
				tasks.push(req.body.tasks[i]._id);
			}
		}

		console.log('tasks', tasks);

		Test.findById(req.params._id)
			.exec(function(err,test){
				console.log('touched test update', test)
				
				if(req.body.name){test.name = req.body.name}
				if(req.body.desc){test.desc = req.body.desc}
				if(req.body.platform){test.platform = req.body.platform}
				if(req.body.tasks){test._tasks = tasks}
				if(req.body.link){test.link = req.body.link}
				if(req.body.subject){test._subjects.push(req.body.subject)}
				
				console.log(test);

				test.save(function(err, data){
					if (err) res.send(err);

					res.json(data);
				})
			});
	})

	.delete(function(req,res){
		// deletes a single test by id
		// from session list of tests
		// and then removes 
		// all tasks
		// all messages
		// all tags
		// that belonged to that test.

		console.log('delete this test', req.params._id)

		Test.findById(req.params._id, function(err, test){
				if (err) res.send(err);

				Session.findOne({'_id': test._session}, function(err, session){
						console.log('found session ', session._id);
						console.log('session tests', session._tests);

						session.tests.remove(req.params._id)

						session.save(function(err,data){
							if(err) res.send(err);

							console.log(data);
							res.json(req.params._id);
						})
					})

				console.log(test);
			})
			.remove(function(err){
				if (err) res.send(err);
			});

		Task.find({_test:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

		Message.find({_test:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

		Tag.find({_test:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

	});

// TASK ROUTES ===================================================

router.route('/task/')
	// get all tasks
	.get(function(req,res){
		Task.find({})
			.exec(function(err, tasks) {
				if(err) res.send(err);

				res.json(tasks);
			});
	})
	.post(function(req,res){
		var task = new Task();

		task.name = req.body.name;
		task._test = req.body._test;
		task._session =  req.body._session;

		task.save(function(err, task){
			if (err)
				res.send(err);
			
			Test.findById( task._test, function(err,test){
				console.log(task._id);

				test._tasks.push(task._id);

				test.save(function(err,data){
					if(err) res.send(err);
				})
			
				res.json(task);
			});
		})
	});

router.route('/task/:_id')
	// get single task
	.get(function(req,res){
		Task.findById(req.params._id)
			.exec(function(err,task){
				if(err) res.send(err);

				console.log(task)
				res.json(task);
			})
	})
	
	// update a single task
	.put(function(req,res){
		console.log('touched task', req.body)

		Task.findById(req.params._id)
			.exec(function(err, task){
				if (err) res.send(err);

				if(req.body.name){task.name = req.body.name}
				if(req.body.desc){task.desc = req.body.desc}
				if(req.body._test){task._test = req.body._test}	
				if(req.body._session){task._session = req.body._session}
				if(req.body._subject){task._subjects.push(req.body._subject)}

				task.save(function(err,task){
					if(err) res.send(err);

					console.log('updated task', task);
					res.json(task);
				})

		})
	})

	// delete a task
	.delete(function(req,res){
		console.log('delete this task', req.params._id)

		// find a task
		// remove it from its test
		// then remove all messages
		// and tags 
		// related to that task

		Task.findById(req.params._id, function(err, task){
				if (err) res.send(err);

				console.log('single task found', task);

				Test.findOne({'_id': task._test})
					.exec(function(err, test){
						if (err) res.send(err);

						console.log('found test ', test._id);
						console.log(test._tasks);

						// TODO: when this sort of thing fails to work,
						// it populates the array in question with a ton of ghosts.
						test._tasks.remove(req.params._id)

						test.save(function(err,data){
							if(err) res.send(err);

							console.log(data);
							res.json(req.params._id);
						})
					})
				})
			.remove(function(err){
				if(err) res.send(err);
			});

		// find messages that belong to the task and delete them
		Message.find({_task:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

		// find tags that belong to the task and delete them
		Tag.find({_task:req.params._id})
			.remove(function(err){
				if (err) res.send(err);
			});

	});

// MESSAGE ROUTES  ================================================

router.route('/message/')
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

		console.log('message id', msg._id)

		msg._task	 = req.body._task;
		msg._test	 = req.body._test;
		msg._session = req.body._session;
		msg._subject = req.body._subject;

		msg.created_by  = req.body.created_by; // this is to do with authentication.
		msg.body	 	= req.body.body;
		
		msg.save(function(err, msg){
			// save the new message
			if (err) res.send(err);

			res.json(msg);

			Task.findById( req.body._task )
				.exec(function(err,task){
					if (err) res.send(err);

					console.log(msg._id);

					task._messages.push(msg._id);
					
					task.save(function(err,data){
						if(err) res.send(err);
					})
				})

			console.log('Subject', req.body._subject)

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
					console.log(req.body.tags[i])
					var tag_body = req.body.tags[i];

					Tag.findOne({body: tag_body, _test: req.body._test})
						.exec(function(err, doc){
							if(err) res.send(err);

							console.log('tag_body', tag_body);
						
							if(doc) { 
								console.log( 'this tag matched a call', doc)
								
								doc._messages.push(msg._id);
								
								doc.save(function(err, data){
									if (err) res.send(err);
									
									console.log(data)
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
		


router.route('/message/:_id')
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

// TAG ROUTES ================================================
router.route('/tag/')
	.get(function(req,res){
		Tag.find(function(err, tags) {
				if(err) res.send(err);

				res.json(tags);
			})
		});

router.route('/tag/:_id')
	.get(function(req,res){
		Tag.findById(req.params._id)
			.exec(function(err, tags) {
				if(err) res.send(err);

				res.json(tags);
			})
	})
	.post(function(req,res){
		console.log('tag post touched')
		res.json('tag post touched')
	});

// SUBJECT ROUTES ===============================================
router.route('/subject/')
	.get(function(req,res){
			Subject.find({})
				.exec(function(err,subjects){
					if(err) res.send(err);
					
					res.json(subjects)	
				})
		})
	.post(function(req,res){
			console.log('touched add subject', req.body);

			var subject = new Subject();

			subject.name = req.body.name;
			
			subject.save(function(err, data){
				if(err) res.send(err);
				
				console.log(data);
				res.json(data)
			});
	});


// RUN ROUTES ================================================
router.route('/run/')
	.get(function(req,res){
			console.log('touched run get')
			res.json('touched run get')
		});

// How to populate subdocuments is in here.
router.route('/run/:session_id')
	.get(function(req,res){
		console.log('touched run route',req.params.session_id )

		Test.find({"_session":req.params.session_id, "_tasks": {$not: {$size: 0}}})
			.populate('_tasks')
			.exec(function(err, docs){
				if(err) res.send(err);

				res.json(docs)
			})
	})
	.post(function(req,res){
		console.log('touched run post', req.body)

		// on post:
		// add subject to tests that have been updated with that subject
		// add subject to tasks that have been updated with that subject
		// add tests to subject that has been part of that test

		Subject.findById(req.body.subject)
			.exec(function(err, subject){
				console.log('subject tests', subject._tests);
				
				subject._tests = req.body.tests;

				subject.save(function(err,data){
					if(err) res.send(err);
				});
			});
	

		// for each test in session
		// add a subject to that test if it has run.
		for(var i = 0; i < req.body.tests.length; i++){
			console.log('tests', req.body.tests[i])
			
			Test.findById(req.body.tests[i], function(err, test){
				
				if(test._subjects.indexOf(req.body.subject) == -1){
					test._subjects.push(req.body.subject)
				}

				test.save(function(err, data){
					if(err) res.send(err);

					console.log('saved', data._id)
				})
			});

			
		}

		// for each task in a run test
		// if a subject has hit that task,
		// push the subject to its subject array
		for(var i = 0; i < req.body.tasks.length; i++){
			console.log('tasks', req.body.tasks[i])
			Task.findById(req.body.tasks[i], function(err, task){

				if(task._subjects.indexOf(req.body.subject) == -1){
					task._subjects.push(req.body.subject)
				}

				task.save(function(err, data){
					if(err) res.send(err);

					console.log('saved', data._id)
				})
			})
		}

		res.json('tests updated', req.body.tests)
	});

// SUMMARY ROUTES ============================================

router.route('/summary/:_id')
	.get(function(req, res){

		// how to populate grandchildren sub-subdocuments is in here.
		var reply = {};

		// the promise gets your main document, with its populated subs
		var	promise = 
			Test.findById(req.params._id).populate('tags').exec(function(err, test){
				if(err) res.send(err);
			});

		promise.then(function(test){
			reply.test = test;
			// a promise-then pair: Then must RETURN something to the promise. Backwards chaining.
			return Task.find({'_test':req.params._id}).select('_id summary pass_fail').exec();
		})
		.then(function(tasks){
			reply.tasks = tasks;
			return Subject.find({'_tests': { $in: [req.params._id] }}).populate('_messages').exec();
		})
		.then(function(subjects){
			reply.subjects = subjects;
			console.log('reply', reply.test._id, 'subjects', reply.subjects, 'tasks', reply.tasks, 'tags', reply.tags)
			res.json(reply)
		})
		.then(null, function(err){
			if(err) return res.send (err)
		});
		
	})
	.put(function(req, res){
		console.log('touched summary put', req.body.test._id);

		Test.where({'_id':req.body.test._id})
			.update({'summary' : req.body.test.summary})
			.exec(function(err, test){
				console.log('test updated', test)
			});
		
		for(var i = 0; i < req.body.tags.length; i++){
			Tag.where({'_id':req.body.tags[i]._id})
				.update({'summary' : req.body.tags[i].summary, 'summarized' : req.body.tags[i].summarized, })
				.exec(function(err, tag){
				console.log('tag updated', tag)
			});
		}

		res.json('test updated - server')

		// for each task found on update
		// update that task's summary
		if(req.body.test.tasks){
			
			console.log('tasks found')

			for(var i = 0; i < req.body.test.tasks.length; i++){
				var task = req.body.test.tasks[i];
				
				if(task.summary){

					console.log(task._id)
					console.log(task.summary)
					console.log(task.pass_fail)
					
					Task.where({'_id':task._id})
						.update({'summary' : task.summary, 'pass_fail': task.pass_fail})
						.exec(function(err, task){
							console.log('task updated', task)
						});
				}
			}	
		}

		// if an update happened to a message
		// update that message

	});


// REPORT ROUTES =============================================

router.route('/report/test/:test_id')
	.get(function(req, res){
		console.log('touched report get')
	});		

module.exports = router;