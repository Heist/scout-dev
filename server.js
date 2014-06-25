var express = require('express');
var bodyParser = require ('body-parser');
var logger	= require ('morgan');
var mongoose = require('mongoose');

var app 	= express();
var port = Number(process.env.PORT || 5000);

//express setup
	app.use(logger('\033[90m:date :method :url :response-time\\ms\033[0m \033[31m:referrer \033[0m'));
	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser());

	// This route deals enables HTML5Mode by forwarding missing files to the index.html
	app.all('/*', function(req, res) {
    	res.sendfile(__dirname + '/public/index.html');
  	});

// mongoose configuration =================

mongoose.connect('mongodb://localhost/scoutApp');

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
  	// yay!
});

// define model --> later these can be moved to server/models =====
	var Flow = mongoose.model('Flow', {
		flow_name		: String,
		prototype_link	: String,
		platform		: String,
		desc			: String
	});

// ================================================================
//app routes -- > later these can be moved to server/routes
// ================================================================

var router = express.Router(); 				// get an instance of the express Router

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// more routes for our API will happen here

	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/api', router);

// Turn on the application ========================================

app.listen(port);
console.log('scout listening on ', port);

