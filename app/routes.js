// routes.js
var express = require('express');
var router = express.Router();  // get an instance of the express Router
var util = require('util');
var mongoose = require('mongoose'); // so we can generate ObjectIDs for tests

// load models for routes
// var Step 	= require('./models/step');
// var Flow 	= require('./models/flow');
var Session = require('./models/session');



// console logging =====================================================

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// backend routes ======================================================

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

// this may not be used by anything any more. 
// Should be /test/testid anyway.
// router.route('/:sessionId/test/:testId')
// 	.put(function(req,res){
// 		Session.findById(req.params.sessionId).exec(
// 			function(err, session) {

// 				session.flows.id(req.body._id).remove();
// 				session.flows.push(req.body);
				

// 				session.save(function(err) {
// 						if (err)
// 							res.send(err);
						
// 						res.json(session);
// 				});
// 			}
// 		);
// 	});


	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			

// TEST routes =========================================================

// routest for returning test sets - return all sessions.
// on front end, remove sessions that are not models, but count them.
router.route('/test/')
	.get(function(req,res){
		console.log('touched /test');
		Session.find({}, function(err, test) {
				if (err)
					res.send(err);
				res.json(test);
			});
	})

	// controller addTest uses this
	.post(function(req,res){
		var ptype = new Session();		

		ptype.name 		= 'Prototype';
		ptype.testKey 	= req.body.testKey; // reminder: this has to live on the front end. flows.
		ptype.ismodel	= req.body.ismodel;

		ptype.save(function(err) {
				if (err)
					res.send(err);

				Session.find({}, function(err, session) {
					if (err)
						res.send(err);
					res.json(session);
					console.log('I have added and saved a session');
				});
		});

	});

// /test/testId routes:
// add a new session to the db with .post
// add a flow to a test with .put (controller AddAFlow)
// TODO remove all sessions with test-id test .delete 
router.route('/test/:testId')
	// route for adding a test to a db - 
	// testId is actually a front-end randomly generated number
	// _not_ an ObjectID at all. This is why it works.
	.post(function(req,res){
		Session.findOne({'testKey':req.params.testId, 'ismodel' : true}).exec(
    		function(err, session) {
   
    			session._id = undefined;
        		
        		var s1 = new Session( session );
        		var id = mongoose.Types.ObjectId();

        		console.log('this is your session '+session.flows);
    			
    			s1.ismodel = false;
    			s1._id = id;
    			
    			s1.save(function(err, data) {
					if (err)
						res.send(err);
					res.json(data);
					console.log('new session created '+data);
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

// Do functions on a single session within a test- add usernames in active, 
// get a single new session, delete a single specific session
router.route('/test/:testId/session/:sessionId')
	.get(function(req,res) {
			Session.findById(req.params.sessionId, function(err, session) {
				if (err)
					res.send(err);
				console.log('touched /:sessionId');
				res.json(session);
			});
		})
	.put(function(req, res) {
		// put is used both in active sessions to apply usernames.
		// put only puts updates to individual sessions, not test sets
		Session.findById(req.params.sessionId, function(err, session) {

			if (err)
				res.send(err);
			
			// console.log('req.body',(util.inspect(req.body, {showHidden: false, depth: null})));

			if (req.body.user){
				session.user = req.body.user;
				console.log('new user', session.user);
			}
			else {
				// message needs to push to DB regardless HERE
				// session.messages.push(req.body.messages);
				// console.log('flow',(util.inspect(session.flows.id(req.body._id), {showHidden: false, depth: null})));
				// console.log('message',(util.inspect(req.body, {showHidden: false, depth: null})));
				// var flow = session.flows.id(req.body._id);
				// console.log(req.body._id); 

				session.flows.id(req.body._id).remove();
				session.flows.push(req.body);
				console.log('flow updated',(util.inspect(session.flows.id(req.body._id), {showHidden: false, depth: null})));
				
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

// Add and remove steps from flows in tests
router.route('/test/:testId/session/:sessionId/flow/:flowId')
	.get(function(req,res) {
		Session.findById(req.params.sessionId, function(err, session) {
			if (err)
				res.send(err);
		var flow = session.flows.id(req.params.flowId);
		res.json(flow);
		console.log(flow);
		console.log('touched flow');
		});
	})
	.put(function(req, res) {
		var query = { _id : req.params.flowId}
		var flow = req.body.flow;

		console.log('touched flow update');
		// console.log('_id', query);
		// console.log('flow', flow);

		Session.findById(req.params.sessionId, function(err, session) {
			if ( query = flow._id){
				console.log('touched put flow');
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

// SUMMARY routes ======================================================

// get the flow to summarize
// controller: summary/'+$stateParams.sessionKey+'/flow/'+$stateParams.flowname
router.route('/summary/:testId/flow/:flowName')
	.get(function(req,res) {
		console.log('touched flowcollector');
		
		// .find returns an array []
		Session.find({'testKey' : req.params.testId}, function(err, data) {
				if (err)
					res.send(err);
				
				var flowcollector = {};
				flowcollector.flows = [];

			// this gathers and sorts similar flows from the returned
			// session array[].
				for (var i = 0; i < data.length -1 ; i++){
					for (var j = 0; j < data[i].flows.length; j++){
						var name = data[i].flows[j].title;
						name = name.replace(/ /g,'');

						if (name === req.params.flowName){
							var pushdata = data[i].flows[j];
							flowcollector.flows.push( pushdata );
						}
					}
				}
				console.log('flowcollector flows '+flowcollector.flows.length);
				// console.log('flowcollector '+flowcollector);

				res.json(flowcollector);
			});
	})
	;


module.exports = router;