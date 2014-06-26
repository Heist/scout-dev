// server.js

// modules ============================================
var express = require('express');
var bodyParser = require ('body-parser');
var logger	= require ('morgan');
var mongoose = require('mongoose');

var app = express();

var port = Number(process.env.PORT || 5000);

// configuration ======================================

// database
var db = require('./config/db');

mongoose.connect(db.url);
	// this segment does not work right now.
	// db.on('error', console.error.bind(console, 'connection error:'));
	// db.once('open', function callback () {
	//  		// yay!
	// });

// express 4.0
app.use(logger('\033[90m:date :method :url :response-time\\ms\033[0m \033[31m:referrer \033[0m'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());


// bring in routes ================================================
var router = require('./app/routes');

app.all('/api', router);

app.get('*', function(req, res) {
			res.sendfile(__dirname + '/public/index.html');
		});

// ================================================================
//  app routes -- > later these can be moved to app/routes
// ================================================================


// Turn on the application ========================================

app.listen(port);
console.log('scout listening on ', port);

exports = module.exports = app; 						// expose app

