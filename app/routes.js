// routes.js
var express = require('express');
var router = express.Router();  // get an instance of the express Router
var util = require('util');
var mongoose = require('mongoose'); // so we can generate ObjectIDs for tests

// // load models for routes
var Message = require('./models/message');
var Step 	= require('./models/step');
var Flow    = require('./models/flow');
var Session = require('./models/session');
var Summary = require('./models/summary');
var Tag = require('./models/tag');
var User = require('./models/user');

// console logging =====================================================

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// backend routes ======================================================

// get/post to /api routes.
router.route('/')
	.get(function(req, res) {
		// get all the flows in the db
		// do nothing with them - this route is for testing
			Session.find({})
			.populate('flows')
			.exec(
				function(err, sessions) {
					if (err)
						res.send(err);
			             res.json(sessions)

			         })
	});


// SESSION ROUTES ================================================
	
router.route('/session/')
	// get all sessions
	// get all flows by session
	// get all flow steps by flow
	.get(function(req,res){
		Session.find({})
			.populate('flows')
			.exec(
				function(err, sessions) {
					if (err)
						res.send(err);
					// in here, get the flow steps and parse them out
					// check for distinct keys
					// count the number of distinct keys and return as 
					// sessions.runcount
					res.json(sessions);
				})
	})

	// add a new session - this could be an upsert?
	.post(function(req, res){
				var session = new Session();
 			
	 			session.name = 'New Session';
	 			session.runcount = 0;

	 			session.save(function(err) {
					if (err)
						res.send(err);

					Session.find({}, function(err, sessions) {
						if (err)
							res.send(err);
						res.json(sessions);
					});
				});
	});

router.route('/session/:_id')
	.get(function(req,res){
		Session.findById(req.params._id)
			.populate('flows')
			.exec(function(err, session){
				console.log('session, populated', session);
				res.json(session);
			})
	})
	// deletes all sessions and subdocuments - steps, flows, reports, summaries.
	.delete(function(req,res){
		console.log('session delete', req.params._id);

		Session.findById(req.params._id).remove(function(err){
			if (err)
				res.send(err);
		});

		Flow.find({_session:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

		Step.find({_session:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

		Message.find({_session:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

		Tag.find({_session:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

		res.json(req.params._id);
	})

	// change the name of the session
	.put(function(req,res){
		console.log('session put request', req.body);
		console.log('session put request', req.params._id);

		Session.findById(req.params._id, function(err, session){
			if (err)
				res.send(err);
			
			if(req.body.name){
						session.name = req.body.name;
					}
			if(req.body.runcount){
						session.runcount = req.body.runcount;
					}

			session.save(function(err, data) {
				if (err)
					res.send(err);

				res.json(session);
			
			})
		})
	});

router.route('/session/:_id/flow/')
	// get all flows by session
	.get(function(req,res){
		Flow.find({'session': req.params._id})
			.exec(function (err, flows) {
	  			if (err)
					res.send(err);

			  	console.log('flows', flows);
			  	
			})
	});

// FLOW ROUTES ===================================================
	
router.route('/flow/')
	// get all of the flows	
	.get(function(req,res){
		Flow.find(function(err, flows) {
				if (err)
					res.send(err);

				res.json(flows);
			})
	})
	// add a new flow to the session
	.post(function(req,res){
			var flow = new Flow();

			flow.name = req.body.name;
			flow._session = req.body._session;
			
			flow.save(function(err, flow){
				if (err)
					res.send(err);
				
				Session.findById( flow._session, function(err,session){
					console.log(flow._id);

					session.flows.push(flow._id);
					session.save(function(err,data){
						if (err)
							res.send(err);
					})
				
				res.json(flow);				
				});
			})
	});


router.route('/flow/:_id')
	.get(function(req,res){
		// get one specific flow
		console.log('hello hello flow')
		var reply = {};

		// we need to find the flow itself
		Flow.findById(req.params._id)
			.populate('steps')
			.exec(function(err,flow){
				if (err)
					res.send(err);
			console.log('i touched a flow', flow)
			res.json(flow);
		});

		// we need to know if there are steps belonging to flow
		

		console.log('reply', reply)
		
	})

	// update one flow with new information
	.put(function(req,res){
		console.log('touched flow put', req.body)
		var steps = [];

		// TODO - this might kick up weird bugs if there are no steps.
		if(req.body.steps){
			for(var i = 0; i < req.body.steps.length; i++){
				steps.push(req.body.steps[i]._id);
			}
		}

		console.log('steps', steps);

		Flow.findById(req.params._id)
			.exec(function(err,flow){
				console.log('touched flow update', flow)
				
				if(req.body.name){flow.name = req.body.name}
				if(req.body.desc){flow.desc = req.body.desc}
				if(req.body.platform){flow.platform = req.body.platform}
				if(req.body.steps){flow.steps = steps}
				if(req.body.link){flow.link = req.body.link}
				if(req.body.user){flow.users.push(req.body.user)}
				
				console.log(flow);

				flow.save(function(err, data){
					if(err)
						res.send(err)

					res.json(data);
				})
			});
	})

	.delete(function(req,res){
		// deletes a single flow by id

		console.log('delete this flow', req.params._id)

		Flow.findById(req.params._id, function(err, flow){
			if (err)
				res.send(err);

			Session.findOne({'_id': flow._session}, function(err, session){
				console.log('found session ', session._id);
				console.log(session.flows);

				session.flows.remove(req.params._id)

				session.save(function(err,data){
					if (err)
						res.send(err);

					console.log(data);



					res.json(req.params._id);
				})

			})

			console.log(flow);

		})
		.remove(function(err){
			if (err)
					res.send(err);
		});

		Step.find({_flow:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

		Message.find({_flow:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

		Tag.find({_flow:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

	});

// STEP ROUTES ===================================================
	// these are a subset of flow routes

router.route('/step/')
	// get all steps
	.get(function(req,res){
		Step.find(function(err, steps) {
				if (err)
					res.send(err);

				res.json(steps);
			});
	})
	.post(function(req,res){
		var step = new Step();

		step.name = req.body.name;
		step._flow = req.body._flow;
		step._session =  req.body._session;

		step.save(function(err, step){
			if (err)
				res.send(err);
			
			Flow.findById( step._flow, function(err,flow){
				console.log(step._id);

				flow.steps.push(step._id);
				flow.save(function(err,data){
					if (err)
						res.send(err);

				})
			
			res.json(step);

			});
		})
	});

router.route('/step/:_id')
	// get single step
	.get(function(req,res){
		Step.findById(req.params._id)
			.exec(function(err,step){
				if (err)
					res.send(err);
			console.log(step)
			res.json(step);
			})
	})
	
	// update a single step
	.put(function(req,res){
		console.log('touched step', req.body)
		Step.findById(req.params._id, function(err, step){
			if (err)
				res.send(err);

			if(req.body.name){step.name = req.body.name}
			if(req.body._flow){step._flow = req.body._flow}	
			if(req.body._session){step._session = req.body._session}
			if(req.body.user){step.users.push(req.body.user)}

			step.save(function(err,data){
				if (err)
					res.send(err);
				console.log(data);
				res.json(data);
			})

		})
	})

	// delete a step
	.delete(function(req,res){
		console.log('delete this step', req.params._id)

		Step.findById(req.params._id, function(err, step){
			if (err)
				res.send(err);

			console.log(step);

			Flow.findOne({'_id': step._flow}, function(err, flow){
				console.log('found flow ', flow._id);
				console.log(flow.steps);

				// TODO: when this sort of thing fails to work,
				// it populates the array in question with a ton of ghosts.
				flow.steps.remove(req.params._id)

				flow.save(function(err,data){
					if (err)
						res.send(err);

					console.log(data);
					res.json(req.params._id);
				})

			})
		})
		.remove(function(err){
			if (err)
					res.send(err);
		});


		Message.find({_step:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

		Tag.find({_step:req.params._id}).remove(function(err){
			if (err)
				res.send(err);
		});

	});

// MESSAGE ROUTES  ================================================

router.route('/message/')
	.get(function(req,res){
		Message.find(function(err, messages) {
				if (err)
					res.send(err);
				res.json(messages);
			});
	})
	.post(function(req,res){
		console.log('touched new message ', req.body)
		var msg = new Message();
		console.log('message id', msg._id)

		msg.created_by  = req.body.created_by;
		msg._step	 = req.body._step;
		msg._flow	 = req.body._flow;
		msg._session = req.body._session;
		msg.body	 = req.body.body;
		msg.user 	 = req.body.user;
		msg.key		 = req.body.key;
		
		msg.save(function(err, msg){
			// save the new message
			if (err)
				res.send(err);

			res.json(msg);

			Step.findById( req.body._step, function(err,step){
				console.log(msg._id);

				step.messages.push(msg._id);
				step.save(function(err,data){
					if (err)
						res.send(err);
				})
			})

			console.log('user', req.body.user)
			User.findById( req.body.user, function(err,user){
				console.log('message', msg._id, user);

				user.messages.push(msg._id);

				user.save(function(err,data){
					if (err)
						res.send(err);
				})
			})

			// if there are tags, add them to the DB and then add their Flow to them
			if(req.body.tags){
				for( var i = 0; i < req.body.tags.length; i++){
					console.log(req.body.tags[i])
					var tag_body = req.body.tags[i];

					Tag.findOne({body: tag_body, _flow: req.body._flow}).exec(function(err, doc){
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
							console.log( 'no tags match this call', tag_body, req.body._flow)

							var tag = new Tag();
							
							tag._messages.push(msg._id);
							tag._steps.push(req.body._step);

							tag._flow	 = req.body._flow;
							tag._session = req.body._session;
							tag.body	 = tag_body;

							tag.save(function(err, tag){
								if (err) res.send(err);

								Flow.findById( req.body._flow, function(err,flow){
									console.log(flow)

									flow.tags.push(tag._id);
									flow.save(function(err,data){
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
		// get one specific flow
		console.log(req)
		Message.findById(req.params._id)
			.exec(function(err,msg){
				if (err)
					res.send(err);
			console.log(msg)
			res.json(msg);
			})
	});

// TAG ROUTES ================================================
router.route('/tag/')
	.get(function(req,res){
		Tag.find(function(err, tags) {
				if (err)
					res.send(err);

				res.json(tags);
			})
		});

router.route('/tag/:_id')
	.get(function(req,res){
		Tag.findById(req.params._id,function(err, tags) {
				if (err)
					res.send(err);
				res.json(tags);
			})
	})
	.post(function(req,res){

	});

// USER ROUTES ===============================================
router.route('/user/')
	.get(function(req,res){
			User.find(function(err,users){
				if(err)
					res.send(err);
				res.json(users)	
			})
		})
	.post(function(req,res){
			console.log('touched add user', req.body);

			var user = new User();

			user.name	 = req.body.name;
			
			user.save(function(err, data){
				if(err)
					res.send(err);
				console.log(data);
				res.json(data)
			});
	});


// RUN ROUTES ================================================
router.route('/run/')
	.get(function(req,res){
		});

// How to populate subdocuments is in here.
router.route('/run/:session_id')
	.get(function(req,res){
		console.log('touched run route',req.params.session_id )
		Session.findById(req.params.session_id)
			.populate('flows')
			.exec(
				function(err, session) {
					if (err)
						res.send(err);

				 Flow.populate(session.flows, {path: 'steps'}, function (err, flows) {
				 	console.log(flows);
		             session.flows = flows;
		             session.runcount = session.runcount + 1;
		             res.json(session)

		         })
			});
	})
	.post(function(req,res){
		Session.findById(req.params.session_id, function(err, session){
			if (err)
				res.send(err);			
			
			session.runcount = req.body.session.runcount;
			
			session.save(function(err, data) {
				if (err)
					res.send(err);

				res.json(session);
			
			})
		})

		for(var i = 0; i < req.body.flows.length; i++){
			console.log('flows', req.body.flows[i])
			
			Flow.findById(req.body.flows[i], function(err, flow){
				
				if(flow.users.indexOf(req.body.user) == -1){
					flow.users.push(req.body.user)
				}

				flow.save(function(err, data){
					if(err)
						res.send(err)
					console.log('saved', data._id)
				})
			})
		}

		for(var i = 0; i < req.body.steps.length; i++){
			console.log('steps', req.body.steps[i])
			Step.findById(req.body.steps[i], function(err, step){

				if(step.users.indexOf(req.body.user) == -1){
					step.users.push(req.body.user)
				}

				step.save(function(err, data){
					if(err)
						res.send(err)
					console.log('saved', data._id)
				})
			})
		}
	});

// SUMMARY ROUTES ============================================

router.route('/summary/:_id')
	.get(function(req, res){

		// how to populate grandchildren sub-subdocuments is in here.
		var reply = {};
		var	promise = 
			Flow.findById(req.params._id).populate('tags users steps').exec(function(err, flow){
				Step.find({'_flow':req.params._id}).populate('users').exec(function(err, docs){
					if(err) res.send(err);

					var opts = [
						{path: 'users.messages', model:'Message'},
						{path: 'tags', model:'Tag'}
					]

					Step.populate(docs, opts, function(err, data){
							flow.steps = data;
							// res.json({flow : flow})
					})
				});
			});

		promise.then(function(flow){
			reply.flow = flow;
			return Step.find({'_flow':req.params._id}).select('_id summary').exec();
		})
		.then(function(steps){
			reply.steps = steps;
			return Message.find({'_flow':req.params._id}).select('_id fav pass_fail').exec();
		})
		.then(function(messages){
			reply.messages = messages;
			return Tag.find({'_flow':req.params._id}).select('_id summary summarized body').exec();
		})
		.then(function(tags){
			reply.tags = tags;
			console.log('reply', reply.flow._id, 'messages', reply.messages, 'steps', reply.steps)
			res.json(reply)
		})
		.then(null, function(err){
			if(err) return res.send (err)
		});
		
	})
	.put(function(req, res){
		// There is a Pending Problem in here somewhere for 54118cbe3535a25c5d230d3b

		console.log('touched summary put', req.body.flow._id);
		Flow.where({'_id':req.body.flow._id}).update({'summary' : req.body.flow.summary}, function(err, flow){
			console.log('flow updated', flow)
		});
		
		for(var i = 0; i < req.body.tags.length; i++){
				Tag.where({'_id':req.body.tags[i]._id}).update({'summary' : req.body.tags[i].summary, 'summarized' : req.body.tags[i].summarized, }, function(err, tag){
					console.log('tag updated', tag)
				});
			}

		res.json('flow updated - server')
		if(req.body.steps){
			console.log('steps found')
		for(var i = 0; i < req.body.flow.steps.length; i++){
			var step = req.body.flow.steps[i];
			
			if(step.summary){
				console.log(step._id)
				console.log(step.summary)
				console.log(step.pass_fail)
				
				Step.where({'_id':step._id}).update({'summary' : step.summary, 'pass_fail': step.pass_fail}, function(err, step){
						console.log('step updated', step)
					});
				}
			}	
		}
		// if an update happened to a message
		// update that message

	});


// REPORT ROUTES =============================================

router.route('/report/flow/:flow_id')
	.get(function(req, res){
		console.log('touched report get')
	});		

module.exports = router;