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
			var session = new Session();
 			
 			session.name = 'New Session'; 			

			console.log(req.body);      // your JSON
  			res.send(req.body);    		// echo the result back
			 			
 			session.save(function(err) {
				if (err)
					res.send(err);

				res.json(req.body);
			});
		});

// /:_id routes
router.route('/:_id')
	.get(function(req,res) {
			Session.findById(req.params._id, function(err, session) {
				if (err)
					res.send(err);
				res.json(session);
			});
		})
	.put(function(req, res) {

		// use our model to find the item we want
		Session.findById(req.params._id, function(err, session) {

			if (err)
				res.send(err);
			
			console.log((util.inspect(req.body, {showHidden: false, depth: null})));      // your JSON
  			// res.send(req.body);    		// echo the result back

			// all this is deeply questionable. maybe too much data for each put?
				
			// session = req.body;
			

			// this should batch-push flows into the main file
			// console.log(req.body.flow);
			
			// session.flows.push(req.body.flow); // but how to handle updates?
		
			// save the flow - the dates are set in the schema, not here.
			session.save(function(err) {
				if (err)
					res.send(err);

				res.json( req.body );
			});

		});
	})
	.delete(function(req, res) {
		Session.remove({
			_id: req.params._id
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