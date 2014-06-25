var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = Number(process.env.PORT || 5000);

// route variables
// var route = require('./routes/route.js');
// extension not requred

var api = require(./api_routes/api.js);

// app setup notes ================
// PUBLIC / things which go out
// 		js /
// 			moderator.js  >> main application loader
// 		partials /
//			add.html
//			overview.html
// index.html 			  >> homepage and main layout
//
//
// SERVER / things which stay in
//		models / 		  >> mongoose schemas
// 		routes /
//			api.js 		  >> serves session.flow.steps[whatever]
//			index.js 	  >> serves html partials and routes to moderator?
// server.js
// 
//  ===============================


// configuration =================
// mongoose database
mongoose.connect('mongodb://localhost/scoutApp');

//express setup
app.configure(function () {
	app.use(express.logger('\033[90m:date :method :url :response-time\\ms\033[0m \033[31m:referrer \033[0m'));
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());

	// Authenticator
	app.use(express.basicAuth(‘testUser’, 'passmeoverbro'));

	// This route deals enables HTML5Mode by forwarding missing files to the index.html
	app.all('/*', auth, function(req, res) {
    	res.sendfile(__dirname + '/public/index.html');
  	})
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// mongoose setup to be separated out in near future ==============

// define model --> later these can be moved to server/models =====
	var Flow = mongoose.model('Flow', {
		flow_name		: String,
		prototype_link	: String,
		platform		: String,
		desc			: String
	});

// ================================================================

//app routes

// get the database and return current flows
app.post('/api/', function(req, res) {
 		var greet = "hello";
 		res.json({greeting:greet});
 });

// Turn on the application ========================================

app.listen(port);
console.log('scout listening on ', port);

