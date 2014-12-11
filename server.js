// server.js

// modules ==========================================================
var express = require('express');
var app = express();
var http = require('http').Server(app);

var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

// express modules
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// SESSION STORAGE ==================================================
var MongoStore = require('connect-mongostore')(session);

// PROCESS PORTS =====================================================
var port = Number(process.env.FIELD_GUIDE_PORT || 8080);

// GLOBAL VARIABLES =================================================
app.locals.store = new MongoStore({'db': 'sessions'});
app.locals.real_url = '104.236.16.159:'+port;
app.locals.secret = 'yourcharacteristhechildofanuntamedrockstarkiMFBQLon8x257casWBT';
app.locals.cookie_name = 'connect.sid';

// for later use with Redis if it becomes important
// process.title = 'field_guide_app';
// var throttle = process.env.FIELD_GUIDE_THROTTLE || 100;

var database = require('./server/db/db');
var db = database.db;
var auth_db = database.auth_db;

// configuration ====================================================
app.use(cors()); // permit cross-site requests, ie: passport.

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

// express 4.0 basic configuration ==================================
// app.use(logger('\033[90m:date :method :url :response-time\\ms\033[0m \033[31m:referrer \033[0m'));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// passport configuration ===========================================
require('./config/passport')(app, passport);

// knox configuration ===============================================
var knox = require('./config/knox');

// session start ====================================================
app.use(session({
	secret: app.locals.secret, 
	cookie: {
		path: '/',
		expires: false, // Alive Until Browser Exits
		// secure: true, // TODO: implement https
		httpOnly: true
	},
	store: app.locals.store
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// server /api/ routes ==============================================
var router = require('./server/routes')(app, passport);

// DEFAULT ROUTE ====================================================
// Prevents the ENOENT rendering error
app.get('*', function(req, res) {
			res.sendfile(__dirname + '/public/index.html');
		});


// SOCKET.IO ========================================================
// lives after normal routes, is dynamic routes accessed separately
// has its own auth functions

var io = require('socket.io').listen(http, { log: false });

// socket 1.0 document is currently in reserve
// require('./server/socket_routes_1')(io, app, passport);

// socket 0.9 in use to speak to Field Guide App
require('./server/socket_routes_09')(io, knox, app, passport);


// TURN ON THE APPLICATION ==========================================
http.listen(port, function(){
	console.log('listening on ', port);
});

// EXPOSE APP AS OBJECT =============================================
exports = module.exports = app;