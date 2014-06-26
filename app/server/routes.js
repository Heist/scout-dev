// routes.js

var express = require('express');

// load models for routes
var Flow = require('./models/flow');

// expose api and auth routes to app with module.exports

module.exports = (function(app){
	'use strict';
	var router = express.Router();  // get an instance of the express Router

	// backend routes =========================================================
	// middleware for logging
	router.use(function(req, res, next) {	
		console.log('Something is happening.');
		next(); // make sure we go to the next routes and don't stop here
	});

	// get/post to /api routes.
	router
		.get('/', function(req, res) {
				res.json({ message: 'hooray! welcome to our api!' });	
			})
		.post('/', function(req,res){
			var flow = new Flow();
			flow.flow_name = req.body.flow_name;

			flow.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'flow added' });
			})
		});

	// frontend routes =========================================================
	// route to handle all angular requests
	// This route deals enables HTML5Mode by forwarding missing files to the index.html			
	app.get('*', function(req, res) {
			res.sendfile(__dirname + '/public/index.html');
		});

	return router;
})();