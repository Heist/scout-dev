// routes.js

var express = require('express');
var router = express.Router();  // get an instance of the express Router

// load models for routes
var Flow = require('./models/flow');


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
			Flow.find(function(err, flows) {
				if (err)
					res.send(err);

				res.json(flows);
			});
		})
	.post(function(req, res){
			var flow = new Flow();
 			
 			flow.name 		= req.body.name;
 			flow.link 		= req.body.link;
 			flow.desc		= req.body.desc;
 			flow.platform   = req.body.platform;

			console.log(req.body);      // your JSON
  			res.send(req.body);    // echo the result back
			 			
 			flow.save(function(err) {
				if (err)
					res.send(err);

				res.json(req.body);
			});
		});

// /:_id routes
router.route('/:_id')
	.get(function(req,res) {
			Flow.findById(req.params._id, function(err, flow) {
				if (err)
					res.send(err);
				res.json(flow);
			});
		})
	.put(function(req, res) {

		// use our bear model to find the bear we want
		Flow.findById(req.params._id, function(err, flow) {

			if (err)
				res.send(err);
			
			flow.name 		= req.body.name; // update the flow name
 			flow.link 		= req.body.link;
 			flow.desc		= req.body.desc;
 			flow.platform   = req.body.platform;

			// save the flow - the dates are set in the schema, not here.
			flow.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Flow updated!' });
			});

		});
	})
	.delete(function(req, res) {
		Flow.remove({
			_id: req.params._id
		}, function(err, flow) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			
	


module.exports = router;