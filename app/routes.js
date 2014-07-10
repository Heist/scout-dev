// routes.js
var express = require('express');
var router = express.Router();  // get an instance of the express Router
var util = require('util');
var mongoose = require('mongoose'); // so we can generate ObjectIDs for tests

// load models for routes
// var Step 	= require('./models/step');
// var Flow 	= require('./models/flow');
var Session = require('./models/session');



// console logging ========================================================

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// backend routes =========================================================

// get/post to /api routes.
router.route('/')
	// this returns all sessions in the DB. Sessions are our basic document unit.
	// it is important for testing that a basic call results in a dump.
	.get(function(req, res) {
			Session.find(function(err, sessions) {
				if (err)
					res.send(err);

				res.json(sessions);
			});
		})
	// .get(function(req,res){
	// 	Session.find({testKey: req.params.testId}, function(err, test) {
	// 			if (err)
	// 				res.send(err);
	// 			res.json(test);
	// 			console.log(test.length);
	// 			console.log(test);
	// 		});
	// })

	// this needs to *only* be touched when creating a new Session, not a new test.
	// sessions cannot be individually deleted until reporting.
	.post(function(req, res){
			var session = new Session(); // here is where all that save stuff is happening
 			
 			session.name = 'New Session';
 			session.testKey = req.body.testKey;		

			console.log(req.body);      // your JSON
  			res.send(req.body);  		// echo the result back
			 			
 			session.save(function(err) {
				if (err)
					res.send(err);

				Session.find({}, function(err, session) {
					if (err)
						res.send(err);
					res.json(session);
					console.log(session.length)
				});
			});
		});
// /test/testId routes
router.route('/test/:testId')
	
	.post(function(req,res){
		var ptype = new Session();

		ptype.name 		= 'Prototype';
		ptype.testKey 	= req.body.testKey;
		ptype.ismodel 	= true;

		res.send(req.body);  		// echo the result back
		ptype.save(function(err) {
				if (err)
					res.send(err);

				Session.find({testKey: req.params.testId}, function(err, session) {
					if (err)
						res.send(err);
					res.json(session);
					console.log(session.length)
					console.log(session)
				});
		});

	})
// you are working on this!	
	.put(function(req,res){
		Session.findById({"testKey": req.params.testId, 'ismodel':true}, function(err, test) {
				if (err)
					res.send(err);
				
				console.log('req.body',(util.inspect(req.body, {showHidden: false, depth: null})));      // your JSON

				if (!test.flows){
					session.flows = []; // this sets things fine if no session.flows are present
				}

				if (req.body.flows){
					test.flows = req.body.flows; // maybe
				}

				if (req.body.flow){
					var sub_doc = test.flows.create(req.body.flow);
					test.flows.push(sub_doc); // adds to local session
				}
				

			// save the session object - this is not saving anything about the flow _id.
			test.save(function(err) {
				if (err)
					res.send(err);

				res.json( req.body );
			});
		});
	})
	.delete(function(req, res) {
		console.log(req.params.testId);
		Session.remove({
			testKey: req.params.testId
		}, function(err, session) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted all tests with '+req.params.testId });
		});
	});
;

// /:_id routes
router.route('/:sessionId')
	.get(function(req,res) {
			Session.findById(req.params.sessionId, function(err, session) {
				if (err)
					res.send(err);
				res.json(session);
			});
		})

	.put(function(req, res) {

		// put only puts updates to individual sessions
		Session.findById(req.params.sessionId, function(err, session) {

			if (err)
				res.send(err);
			
			console.log('req.body',(util.inspect(req.body, {showHidden: false, depth: null})));      // your JSON

			// in here somewhere, sessions should update by overwriting itself with new values on front end.
			session.name = req.body.name;
			
			if (req.body.user){
				session.user = req.body.user;
				console.log('new user', session.user);
			}

			// save the session object - this is not saving anything about the flow _id.
			session.save(function(err) {
				if (err)
					res.send(err);

				res.json( req.body );
			});

		});
	})
	.delete(function(req, res) {
		Session.remove({
			_id: req.params.sessionId
		}, function(err, session) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

router.route('/:sessionId/flow/:flowId')
	.get(function(req,res) {
		Session.findById(req.params.sessionId, function(err, session) {
			if (err)
				res.send(err);
		var flow = session.flows.id(req.params.flowId);
		res.json(flow);		
		console.log(flow);
		});
	})
	.put(function(req, res) {
		var query = { _id : req.params.flowId}
		var flow = req.body.flow;

		console.log('_id', query);
		console.log('flow', flow);

		Session.findById(req.params.sessionId, function(err, session) {
			if ( query = flow._id){
				console.log('touch');
				session.flows.id(query).remove();
				session.flows.push(flow); 

			}

			session.save(function(err) {
				if (err)
					res.send(err);

				res.json( req.body );
			});
		})
	});

router.route('/:sessionId/test/:testId')
	.post(function(req,res){		
			Session.findById(req.params.sessionId).exec(
    		function(err, session) {
        		var s1 = new Session( session );
        			s1._id = undefined;

        			s1.save(function(err) {
						if (err)
							res.send(err);
						
						res.json(session);				

					});
  		 	 }
		);
	})
	.put(function(req,res){
		Session.findById(req.params.sessionId).exec(
			function(err, session) {
				// console.log(req.body);
				// var test = session.flows.steps.id(req.body._id);
				// this is v. likely to comically break
				session.flows.id(req.body._id).remove();
				session.flows.push(req.body);
				

				session.save(function(err) {
						if (err)
							res.send(err);
						
						res.json(session);
				});
			}
		);
	})
	;


	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			
	


module.exports = router;