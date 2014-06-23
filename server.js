var express = require('express');
var app = express();
var port = Number(process.env.PORT || 5000);

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


//app route things go here

app.post('/api/greet', function(req, res) {
	var greet = "hello, "+req.body.name ;
	res.json({greeting:greet});
});


app.listen(port);
console.log('hello world on', port);