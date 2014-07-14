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

// routest for returning test sets - return all sessions.
// on front end, remove sessions that are not models, but count them.
router.route('/test/')
	.get(function(req,res){
		Session.find({}, function(err, test) {
				if (err)
					res.send(err);
				res.json(test);
				console.log(test.length);
				console.log(test);
			});
	})
	.post(function(req,res){
		var ptype = new Session();		

		ptype.name 		= 'Prototype';
		ptype.testKey 	= req.body.testKey; // reminder: this has to live on the front end. flows.
		ptype.ismodel	= req.body.ismodel;

		res.send(req.body);  		// echo the result back

		ptype.save(function(err) {
				if (err)
					res.send(err);

				Session.find({testKey: req.params.testId}, function(err, session) {
					if (err)
						res.send(err);
					res.json(session);
					console.log(session.length)
				});
		});

	});

// /test/testId routes
router.route('/test/:testId')
	// route for adding a test to a db - 
	// testId is actually a front-end randomly generated number
	// _not_ an ObjectID at all. This is why it works.
	.post(function(req,res){
		Session.findOne({'testKey':req.params.testId}).exec(
    		function(err, session) {
    			console.log('post to /test/testId');
    			session._id = undefined;
        		
        		var s1 = new Session( session );
        		var id = mongoose.Types.ObjectId();
        		console.log(id);

        			s1.ismodel = false;
        			s1._id = id;
        			
        			s1.save(function(err, data) {
						if (err)
							res.send(err);
						console.log(data);
						// res.json(product);
					});
  		 	 }
		);
	})
	// route for adding flows to tests
	// needs to return values to the front end or you can't edit them.
	// controller addAFlow uses this

	.put(function(req,res){
		Session.findOne({'testKey': req.params.testId, 'ismodel':true}, function(err, session) {
				if (err)
					res.send(err);
				
				if (req.body.flow){
					console.log('touched req.body.flow singular');
					var sub_doc = session.flows.create(req.body.flow);
					session.flows.push(sub_doc); // adds new flow to session in play
				}

			// save the session object 'test' - this is not returning anything about the flow _id.
			session.save(function(err, data) {
				if (err)
					res.send(err);

				console.log('new flow data '+ data);
				// pass the session data object to the front end?
				res.json( data );
			});
		});
	})
	.delete(function(req, res) {
		console.log(req.params.testId);
		Session.remove({
			'testKey': req.params.testId
		}, function(err, session) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted all tests with '+req.params.testId });
		});
	});
;

// this is also for /run/?
router.route('/:sessionId/test/:testId')
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
	});


// Session specific routes - _can_ be used to return a single test, but will catch the model.
// mostly used in /run
// at the bottom because seriously I keep mistaking it for where we put new flows.



// this is the part where steps are added and removed from flows.
// it could be cleaner.

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
	})
	.delete(function(req, res) {
		console.log(req.params.flowId);
		
		Session.findById(req.params.sessionId).exec(
    		function(err, session) { 
    			if (session.flows.id(req.params.flowId)){
    			console.log('found');
    			session.flows.id(req.params.flowId).remove();

    			session.save(function(err) {
						if (err)
							res.send(err);
						
						res.json(session);				

				});

    			}
   			}
		);
	});


router.route('/:sessionId')
	.get(function(req,res) {
			Session.findById(req.params.sessionId, function(err, session) {
				if (err)
					res.send(err);
				res.json(session);
			});
		})
	.put(function(req, res) {
		// put is used both in active sessions to apply usernames.
		// put only puts updates to individual sessions, not test sets

		Session.findById(req.params.sessionId, function(err, session) {

			if (err)
				res.send(err);
			
			console.log('req.body',(util.inspect(req.body, {showHidden: false, depth: null})));      // your JSON

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
	


	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			
	


module.exports = router;