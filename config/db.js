// db.js
// database configuration and environment sniffing parcel
'use strict';

var mongoose = require('mongoose');
// var environment = require('../config/environment-test');
// reminder: this is local because it's local to _the server_
// server's always gon' be local to the code

// if(environment() !== 'test'){
	var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/field_guide_app';
	var db = mongoose.createConnection(mongoUrl);
	var auth_db = db.useDb('field_guide_users');
	console.log(mongoUrl);
// }
	
// else {
// 	console.log(environment());

// 	var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/field_guide_app_test';
// 	var db = mongoose.createConnection(mongoUrl);
// 	var auth_db = db.useDb('field_guide_users_test');
	
// 	console.log(mongoUrl);
// }

module.exports = {auth: auth_db, db: db};

// this segment does not work right now.
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	         // yay!
	});