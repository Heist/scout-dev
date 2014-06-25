var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = Number(process.env.PORT || 5000);

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

// mongoose setup to be separated out in near future ==============

// define model =================
	var Flow = mongoose.model('Flow', {
		flow_name		: String,
		prototype_link	: String,
		platform		: String,
		desc			: String
	});

// ================================================================

//app routes

// get the database and return current flows
app.get('/', function(req, res) {
	Flow.find(function(err, flows) {
		if (err)
			res.send(err)
		res.json(flows);
	});
});


app.listen(port);
console.log('hello world on', port);