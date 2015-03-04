// server.js
'use strict';

// modules ==========================================================
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var _ = require('lodash');
var async = require('async');
var debug = require('debug')('http');

// Turn the app on and hook sockets 0.9 to it.
var server = http.createServer(app);

var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

// EXPRESS MODULES ==================================================
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// SESSION STORAGE ==================================================
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// PROCESS PORTS =====================================================
var port = Number(process.env.FIELD_GUIDE_PORT || process.env.PORT || 8080);
// var port = Number(process.env.FIELD_GUIDE_PORT || 80);

// Test for our ip address and set what environment we're in accordingly
// if() NODE_ENV=production node app.js

// var os = require('os');
var ifaces = require('os').networkInterfaces();
var ipAddress = function(arr){
	var address;
	Object.keys(arr).forEach(function (ifname) {
	  var alias = 0;

	  ifaces[ifname].forEach(function (iface) {
	    if ('IPv4' !== iface.family || iface.internal !== false) {
	      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	      return;
	    }

	    if (alias >= 1) {
	      // this single interface has multiple ipv4 addresses
	      // console.log(ifname + ':' + alias, iface.address);
	      address = iface.address;
	    } else {
	      // this interface has only one ipv4 adress
	      // console.log(ifname, iface.address);
	      address = iface.address;
	    }
	  });
	});
	return address;
};
console.log(ipAddress(ifaces));


// GLOBAL VARIABLES =================================================
var secrets = require(path.join(__dirname,'secrets'));
app.locals = _.merge(app.locals, secrets);

// CONFIGURATION ====================================================
app.use(cors()); // permit cross-site requests, ie: passport.

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

// express 4.0 basic configuration ==================================
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// passport configuration ===========================================
require('./config/passport')(app, passport);

// Database summoning ===============================================
var database = require('./config/db');
var db = database.db;
var auth_db = database.auth_db;

// session start ====================================================
app.locals.store = new MongoStore({'db': 'sessions'});
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
var router = require('./server/routes')(app, passport, debug);

// DEFAULT ROUTE ====================================================
// Prevents the ENOENT rendering error

app.get('*', function(req, res) {
			res.sendfile(__dirname + '/public/index.html');
		});

// SOCKET.IO ========================================================
// lives after normal routes, is dynamic routes accessed separately
// has its own auth functions
var io = require('socket.io').listen(server, {log : false});
// socket 0.9 in use to speak to Field Guide App
require('./server/socket_routes_09')(io, app, passport, debug);

// Turn it on. 
server.listen(port, function(){ console.log('listening on', port);});

// EXPOSE APP AS OBJECT =============================================
exports = module.exports = app;