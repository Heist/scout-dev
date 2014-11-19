// server.js

// modules ==========================================================
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

// express modules
var logger       = require('morgan');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// SESSION STORAGE ==================================================
var MongoStore = require('connect-mongostore')(session);


// PROCESS PORT =====================================================
var port = Number(process.env.FIELD_GUIDE_PORT || 8080);

// GLOBAL VARIABLES =================================================
app.locals.store = new MongoStore({'db': 'sessions'});
app.locals.real_url = '127.0.0.1:8080';
app.locals.secret = 'yourcharacteristhechildofanuntamedrockstarkiMFBQLon8x257casWBT';
var COOKIE_NAME = 'connect.sid'; // default name value
var COOKIE_SECRET = app.locals.secret;

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
var router = require('./server/routes')(app, passport, io);

// DEFAULT ROUTE ====================================================
// Prevents the ENOENT rendering error
app.get('*', function(req, res) {
			res.sendfile(__dirname + '/public/index.html');
		});


// SOCKET.IO ========================================================
// lives after normal routes, is dynamic routes accessed separately
// has its own auth functions
io.use(function(socket, next) {
    try {
        var data = socket.handshake || socket.request;
        if (! data.headers.cookie) {
            return next(new Error('Missing cookie headers'));
        }
        console.log('cookie header ( %s )', JSON.stringify(data.headers.cookie));
        var cookies = cookie.parse(data.headers.cookie);
        console.log('cookies parsed ( %s )', JSON.stringify(cookies));
        if (! cookies[COOKIE_NAME]) {
            return next(new Error('Missing cookie ' + COOKIE_NAME));
        }
        var sid = cookieParser.signedCookie(cookies[COOKIE_NAME], COOKIE_SECRET);
        if (! sid) {
            return next(new Error('Cookie signature is not valid'));
        }
        console.log('session ID ( %s )', sid);
        data.sid = sid;
        
        app.locals.store.get(sid, function(err, session) {
            if (err) {return next(err);}
            if (! session) {return next(new Error('session not found'));}
            data.session = session;
            next();
        });
    } catch (err) {
        console.error(err.stack);
        next(new Error('Internal server error'));
    }
});

require('./server/socket_routes')(io, app, passport);


// TURN ON THE APPLICATION ==========================================
http.listen(port, function(){
	console.log('listening on ', port);
});

// EXPOSE APP AS OBJECT =============================================
exports = module.exports = app;