// routes.js
var express = require('express');
var router = express.Router();  // get an instance of the express Router
var util = require('util');

// load models for routes
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
	.get(function(req, res) {
			Session.find(function(err, sessions) {
				if (err)
					res.send(err);

				res.json(sessions);
			});
		})
	.post(function(req, res){
			var session = new Session(); // here is where all that save stuff is happening
 			
 			session.name = 'New Session'; 			

			console.log(req.body);      // your JSON
  			res.send(req.body);   		// echo the result back
			 			
 			session.save(function(err) {
				if (err)
					res.send(err);

				res.json(req.body);
			});
		});

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

		// use our model to find the item we want
		Session.findById(req.params.sessionId, function(err, session) {

			if (err)
				res.send(err);
			
			console.log('req.body',(util.inspect(req.body, {showHidden: false, depth: null})));      // your JSON

			// in here somewhere, sessions should update by overwriting itself with new values on front end.
			session.name = req.body.name;
			
			if (!session.flows){
				session.flows = []; // this sets things fine if no session.flows are present
			}
			if (req.body.flows){
				session.flows = req.body.flows; // maybe
			}

			if (req.body.flow){
				var sub_doc = session.flows.create(req.body.flow);
				session.flows.push(sub_doc); // adds to local session
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

router.route('/:sessionId/:flowId')
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
	;



	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			
	


module.exports = router;