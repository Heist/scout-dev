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

			         }
			    )
					
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
				}
			);
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

router.route('/session/:session_id')
	.get(function(req,res){
		Session.findById(req.params.session_id)
			.populate('flows')
			.exec(function(err, session){
				console.log('session, populated', session);
				res.json(session);
			})
	})
	// deletes all sessions and subdocuments - steps, flows, reports, summaries.
	.delete(function(req,res){
		console.log('session delete', req.params.session_id);

		Session.findById(req.params.session_id).remove(function(err){
			if (err)
				res.send(err);
		});

		// TODO: extend to remove all child flows
		// console.log('Successfully deleted session with', req.params.session_id)
		
		res.json(req.params.session_id);
	})

	// change the name of the session
	.put(function(req,res){
		console.log('session put request', req.body);
		console.log('session put request', req.params.session_id);

		Session.findById(req.params.session_id, function(err, session){
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

router.route('/session/:session_id/flow/')
	// get all flows by session
	.get(function(req,res){
		Flow.find({'session': req.params.session_id})
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
			});
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
	;


router.route('/flow/:flow_id')
	.get(function(req,res){
		// get one specific flow
		console.log('hello hello flow')
		Flow.findById(req.params.flow_id)
			.populate('steps')
			.exec(function(err,flow){
				if (err)
					res.send(err);
			console.log('i touched a flow', flow)
			res.json(flow);

			})
	})

	// update one flow with new information
	.put(function(req,res){
		console.log('touched flow put', req.body)
		Flow.findById(req.params.flow_id)
			.exec(function(err,flow){
				console.log('touched flow update', flow)
				flow.name = req.body.name;
				flow.desc = req.body.desc;
				flow.platform = req.body.platform;
				flow.link = req.body.link;
				console.log(flow.steps);

				flow.save(function(err, data){
					if(err)
						res.send(err)

					res.json(data);
				})
			});
	})

	.delete(function(req,res){
		// deletes a single flow by id

		console.log('delete this flow', req.params.flow_id)

		Flow.findById(req.params.flow_id, function(err, flow){
			if (err)
				res.send(err);

			console.log(flow);

			Session.findOne({'_id': flow._session}, function(err, session){
				console.log('found session ', session._id);
				console.log(session.flows);

				// TODO: when this sort of thing fails to work,
				// it populates the array in question with a ton of ghosts.
				session.flows.remove(req.params.flow_id)

				session.save(function(err,data){
					if (err)
						res.send(err);

					console.log(data);
					res.json(req.params.flow_id);
				})

			})
		})
		.remove(function(err){
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

router.route('/step/:step_id')
	// get single step
	.get(function(req,res){
		Step.findById(req.params.step_id)
			.exec(function(err,step){
				if (err)
					res.send(err);
			console.log(step)
			res.json(step);
			})
	})
	
	// update a single step
	.put(function(req,res){
		Step.findById(req.params.step_id, function(err, step){
			if (err)
				res.send(err);

			step.name = req.body.name;
			step.desc = req.body.desc;

			step.save(function(err,data){
				if (err)
					res.send(err);

				res.json(data);
			})

		})
	})

	// delete a step
	.delete(function(req,res){
		console.log('delete this step', req.params.step_id)

		Step.findById(req.params.step_id, function(err, step){
			if (err)
				res.send(err);

			console.log(step);

			Flow.findOne({'_id': step._flow}, function(err, flow){
				console.log('found flow ', flow._id);
				console.log(flow.steps);

				// TODO: when this sort of thing fails to work,
				// it populates the array in question with a ton of ghosts.
				flow.steps.remove(req.params.step_id)

				flow.save(function(err,data){
					if (err)
						res.send(err);

					console.log(data);
					res.json(req.params.step_id);
				})

			})
		})
		.remove(function(err){
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

		msg._step	 = req.body._step;
		msg.created_by  = req.body.created_by;
		msg.body	 = req.body.body;
		msg.user 	 = req.body.user;
		msg.tags 	 = req.body.tags;
		msg.key		 = req.body.key;
		
		msg.save(function(err, msg){
			if (err)
				res.send(err);
			
			Step.findById( req.body._step, function(err,step){
				console.log(step._id);

				step.messages.push(msg._id);
				step.save(function(err,data){
					if (err)
						res.send(err);

				})
			
			res.json(step);

			});
		})
	});

router.route('/message/:message_id')
	.get(function(req,res){
		// get one specific flow
		console.log(req)
		Message.findById(req.params.message_id)
			.exec(function(err,msg){
				if (err)
					res.send(err);
			console.log(msg)
			res.json(msg);
			})
	});



// RUN ROUTES ================================================
router.route('/run/')
	.get(function(req,res){
		// find, populate and return:
		// flows by session with their steps by flow counted

		// on the front end:
		// flows should have it set whether they have a .summary or not
		// flows should have their steps counted
		// sessions should be associated to their flows.

		// object shape:
		// session.flows.length
		// session 
		// flow.summary
		// flows.steps.length

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
	});

module.exports = router;