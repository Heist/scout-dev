// routes.js
module.exports = function(app, passport) {
// CONFIGURATION =====================================================
// Module dependencies
var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('underscore');

// load data storage models
var Message = require('./models/data/message');
var Task    = require('./models/data/task');
var Test    = require('./models/data/test');
var Tag     = require('./models/data/tag');
var Session = require('./models/data/session');
var Summary = require('./models/data/summary');
var Subject = require('./models/data/subject');


// load auth models 
var User = require('./models/auth/user');

// console logging
app.use(function(req, res, next) {
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});


// AUTH ROUTES ============================================
// route middleware to ensure user is logged in - ajax get
function isLoggedInAjax(req, res, next) {
    if (!req.isAuthenticated()) {
		return res.send( 401, "unauthorized request");
	} else {
		console.log('login good');
        next();
    }
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
}

app.get('/auth/login', isLoggedInAjax, function(req, res) {
        return res.json(req.user);
    });

// process the login form
app.post('/auth/login', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.json({ error: 'Email and Password required' });
    }
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return res.json(err);
        }
        if (user.error) {
            return res.json({ error: user.error });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.json(err);
            }
            var user = {id:req.user._id, email:req.user.local.email};
            return res.json({ user: user, redirect: '/overview' });
        });
    })(req, res);
});

// process the signup form
app.post('/auth/signup', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.json({ error: 'Email and Password required' });
    }
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
            return res.json(err);
        }
        if (user.error) {
            return res.json({ error: user.error });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.json(err);
            }
            return res.json({ redirect: '/overview' });
        });
    })(req, res);
});

app.post('/auth/logout', function(req, res) {
	console.log('logout request', req)
   req.logout();
   res.json({ redirect: '/login' });
});


// app.route('/user/')
// 	.get(function(req,res){
// 		User.find({})
// 			.exec(function(err, docs){
// 				res.json(docs)
// 			})
// 	})

// PUBLIC ROUTES ==========================================




// MIDDLEWARE TO BLOCK NON-AUTHORIZED USERS ===============
// this effectively prevents unlogged users from getting data
// app.use('/api',  isLoggedInAjax, function (req, res, next) {
// 	// for calls that start with api....
// 	console.log('touched the api tag')

//   next();
// })

app.use('/api', function (req, res, next) {
	// for calls that start with api....
	console.log('touched the api tag')

	next();
});

// PRIVATE ROUTES =========================================

// SESSION ROUTES =========================================
app.route('/api/session/')
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

app.route('/api/session/:_id')
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

app.route('/api/session/:_id/test/')
	// get all tests by session
	.get(function(req,res){
		Test.find({'_session': req.params._id})
			.exec(function (err, docs) {
	  			if(err) res.send(err);

			  	console.log('tests', docs);
			  	
			})
	});

// TEST ROUTES ===================================================
	
app.route('/api/test/')
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
			// test.created_by = req.body.created_by;

			// later, we will be building playlists
			// sessions should store tests but tests 
			// don't need to know they belong to any playlist specially.
			// sessions should store their own ordering data, etc.

			if(test._session){
					test._session = req.body._session;
				}
			
			test.save(function(err, test){
				if(err) res.send(err);
				
				res.json(test);

			})
	});


app.route('/api/test/:_id')
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
		// console.log('touched test put', req.body)

		if(req.body._tasks){
			var tasks = _.pluck(req.body._tasks, '_id');
		}

		console.log('tasks', tasks);

		Test.findById(req.params._id)
			.exec(function(err,test){
				// console.log('touched test update', test)
				
				if(req.body.name){test.name = req.body.name}
				if(req.body.desc){test.desc = req.body.desc}
				if(req.body.platform){test.platform = req.body.platform}
				if(req.body._tasks){test._tasks = tasks}
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

		Test.find({_id:req.params._id})
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

		res.json('test removed', req.params._id);

	});

// TASK ROUTES ===================================================

app.route('/api/task/')
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

app.route('/api/task/:_id')
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

		msg.created_by  = req.body.created_by; // this is to do with authentication.
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

// TAG ROUTES ================================================
app.route('/api/tag/')
	.get(function(req,res){
		Tag.find(function(err, tags) {
				if(err) res.send(err);

				res.json(tags);
			})
		});

app.route('/api/tag/:_id')
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
app.route('/api/subject/')
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

app.route('/api/subject/:_id')
	.get(function(req, res){
		Subject.findById(req.params._id)
			.exec(function(err, subject){
				if(err) res.send(err);
				res.json(subject)
			});
	});

// RUN ROUTES ================================================
app.route('/api/run/')
	.get(function(req,res){
			console.log('touched run get')
			res.json('touched run get')
		});

// How to populate subdocuments is in here.
app.route('/api/run/:_id')
	.get(function(req,res){
		console.log('touched run route',req.params._id )

		Test.find({"_id":req.params._id, "_tasks": {$not: {$size: 0}}})
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
						console.log('task updated', task.summary, task.pass_fail)
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