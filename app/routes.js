// routes.js

var express = require('express');
var router = express.Router();  // get an instance of the express Router

// load models for routes
// var Flow = require('./models/flow');

// backend routes =========================================================

// get/post to /api routes.
router.get('/', function(req, res) {
			res.json({ message: 'hooray! welcome to our api!' });	
		});

	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			
	


module.exports = router;