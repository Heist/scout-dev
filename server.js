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
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// Session storage and recall for socket.io
var MongoStore = require('connect-mongostore')(session);
// var passportSocketIo = require('passport.socketio');


var port = Number(process.env.FIELD_GUIDE_PORT || 8080);

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
	secret: 'yourcharacteristhechildofanuntamedrockstarkiMFBQLon8x257casWBT', 
	cookie: {
		path: '/',
		expires: false, // Alive Until Browser Exits
		// secure: true, // TODO: implement https
		httpOnly: true
	},
	store: new MongoStore({'db': 'sessions'})
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Global application variables =====================================
app.locals.real_url = '127.0.0.1:8080';

// app.use(function(req, res, next){ app.locals.user = session.user; });

// server /api/ routes ==============================================
var router = require('./server/routes')(app, passport);

// DEFAULT ROUTE ====================================================
// Prevents the ENOENT rendering error
app.get('*', function(req, res) {
			res.sendfile(__dirname + '/public/index.html');
		});


// SOCKET.IO ========================================================
// lives after normal routes
// io.use(function(socket, next) {
//   var handshakeData = socket.request;
//   console.log(handshakeData);
  
//   // make sure the handshake data looks good as before
//   // if error do this:
//     // next(new Error('not authorized');
//   // else just call next
//   next();
// });

// function onAuthorizeSuccess(data, accept){
// 	console.log('successful connection to socket.io');

// 	// The accept-callback still allows us to decide whether to
// 	// accept the connection or not.
// 	accept(null, true);

// 	// OR

// 	// If you use socket.io@1.X the callback looks different
// 	accept();
// }

// function onAuthorizeFail(data, message, error, accept){
// 	if(error){throw new Error(message);}
// 	console.log('failed connection to socket.io:', message);

// 	// We use this callback to log all of our failed connections.
// 	accept(null, false);

// 	// OR

// 	// If you use socket.io@1.X the callback looks different
// 	// If you don't want to accept the connection
// 	if(error){accept(new Error(message));}
// 	// this error will be sent to the user as a special error-package
// 	// see: http://socket.io/docs/client-api/#socket > error-object
// }


// require('./server/socket_config')(io, app, passport);


// TURN ON THE APPLICATION ==========================================
http.listen(port, function(){
	console.log('listening on ', port);
});

// EXPOSE APP AS OBJECT =============================================
exports = module.exports = app;