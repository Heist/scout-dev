var express = require('express');
var app = express();
var port = Number(process.env.PORT || 5000);

//express setup
app.configure(function () {
	app.use(express.logger('\033[90m:date :method :url :response-time\\ms\033[0m \033[31m:referrer \033[0m'));
	app.use(express.static(__dirname + '/public'));
});

//app things go here	










app.listen(port);
console.log('hello world on', port);