var express = require('express');
var app = express();
var port = 3000;

//express setup
app.configure(function () {
	app.use(express.logger('\033[90m:date :method :url :response-time\\ms\033[0m \033[31m:referrer \033[0m'));
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(port);
console.log('hello world on', port);