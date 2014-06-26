// routes.js

var express = require('express');
var router = express.Router();  // get an instance of the express Router

// load models for routes
var Flow = require('./models/flow');

// backend routes =========================================================

// get/post to /api routes.
router.get('/', function(req, res) {
			Flow.find(function(err, flows) {
				if (err)
					res.send(err);

				res.json(flows);
			});
		})
	.post('/', function(req, res){
		var flow = new Flow();
 			flow.name 		= req.body.name;
 			flow.link		= req.body.link;
 			flow.desc		= req.body.desc;
 			flow.platform	= req.body.platform;
 
 			flow.save(function(err) {
 			if (err)
 				res.send(err);
 			res.json({ message: 'flow added' });
 			})
		})
	;

router.route('/:_id')
	.get(function(req,res) {
			Flow.findById(req.params._id, function(err, flow) {
				if (err)
					res.send(err);
				res.json(flow);
			});
		})
	.put(function(req, res) {
		// use our model to find the item we want
		Flow.findById(req.params._id, function(err, flow) {

			if (err)
				res.send(err);

			flow.name = req.body.name; 	// update the bears info

			// save the bear
			flow.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Flow updated!' });
			});

		});
	})

	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			
	


module.exports = router;