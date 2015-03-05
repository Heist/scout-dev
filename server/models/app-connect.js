// app-connect.js
// connect appropriate models to the auth database
// abstracted out to permit testing on a different DB
'use strict';

var mongoose = require( 'mongoose' ); 

var connect = rootRequire('./config/db');
var db = connect.db;

// CONNECTION EVENTS 
// When successfully connected 
mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open to ' + db);
}); 

// If the connection throws an error 
mongoose.connection.on('error',function (err) { 
	console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected 
mongoose.connection.on('disconnected', function () { 
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// BRING IN YOUR SCHEMAS & MODELS // For example 
var Message = require('./data/message');
module.exports = db.model('Message', Message);
