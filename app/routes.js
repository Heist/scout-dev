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
			Session.find(function(err, sessions) {
				if (err)
					res.send(err);
				res.json(sessions);
			});
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

					res.json(sessions);
				}
			);
	})

	// add a new session - this could be an upsert?
	.post(function(req, res){
				var session = new Session();
 			
	 			session.name = 'New Session';

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
			.populate('flows._session')
			.exec(function(err, session){
				console.log('session, populated', session);
				res.json(session);
			})
		// Session.findById(req.params.session_id, function(err, session){
		// 	if (err)
		// 		res.send(err);

		// 	res.json(session);
		// })
	})
	// deletes all sessions and sub-documents - steps, flows, reports, summaries.
	.delete(function(req,res){
		console.log('session delete', req.body.session_id);

		Session.findById(req.params.session_id).remove();

		// TODO: extend to remove all child flows
		console.log('Successfully deleted summary with', req.params.session_id)
		
		res.json(req.params.session_id);
	})

	// change the name of the session
	.put(function(req,res){
		Session.findById(req.params.session_id, function(err, session){
			if (err)
				res.send(err);

			session.name = req.body.name;

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
	})

	// add a new flow to the session
	.post(function(req,res){
			var flow = new Flow();

			flow.name = "New Flow Name";
			flow._session = req.params.session_id;
			

			flow.save(function(err, flow){
				if (err)
					res.send(err);
				
				Session.findById( req.params.session_id, function(err,session){
					session.flows.push(flow._id);
					session.save(function(err,data){
						if (err)
							res.send(err);
						
						console.log('session', session);
						

						res.json(session);
					})
				})
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
	});


router.route('/flow/:flow_id')
	.get(function(req,res){
		// get one specific flow
	})

	.put(function(req,res){
		// update one flow with new information
	})

	.delete(function(req,res){
		// deletes a single flow by id
	});

router.route('/flow/:flow_id/step/')
	// add a new step to the flow
	.post(function(req,res){
		
	});


// STEP ROUTES ===================================================
	// these are a subset of flow routes

router.route('/step/')
	// get all steps
	.get(function(req,res){
		
	});

router.route('/step/:step_id')
	// get single step
	.get(function(req,res){
		
	})
	
	// update a single step
	.put(function(req,res){
		
	})

	// delete a step
	.delete(function(req,res){
		
	});


// TEST MESSAGE and MESSAGING ROUTES ================================================
router.route('/test/')
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

router.route('/test/session/:session_id/')
	.get(function(req,res){
		// get all the flows with the requested session id
		// get all of their steps
		// return the object in an organized way
	});


module.exports = router;