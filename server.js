// server.js

// modules ============================================
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');

// express modules
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


var app = express();
var port = Number(process.env.PORT || 5000);

var db = require('./server/db/db');
var auth_db = require('./server/db/auth_db');


// configuration ======================================================
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}
	// this segment does not work right now.
	// db.on('error', console.error.bind(console, 'connection error:'));
	// db.once('open', function callback () {
	//  		// yay!
	// });

// express 4.0 basic configuration ====================================
app.use(logger('\033[90m:date :method :url :response-time\\ms\033[0m \033[31m:referrer \033[0m'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(__dirname + '/public')); // this sets the root for the whole app, as well as our public files.
app.use(bodyParser()); // get information from html forms

// passport configuration =============================================
require('./config/passport')(passport); // pass passport for configuration

app.use(session({ secret: 'yourcharacteristhechildofanuntamedrockstarkiMFBQLon8x257casWBT' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// server /api/ routes ================================================
var router = require('./server/routes')(app, passport);

// DEFAULT ROUTE goes here to prevent ENOENT error ====================
app.get('*', function(req, res) {
			res.sendfile(__dirname + '/public/index.html');
		});

// turn on the application ============================================

var server = app.listen(port);

console.log('scout listening on ', port);

app.shutdown = function() {
	console.log('shut it down');
	server.close(function() {
		console.log('in theory I have shut down');
	});
}

exports = module.exports = app; 						// expose app

