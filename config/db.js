// db.js
// database configuration and environment sniffing parcel
'use strict';

var mongoose = require('mongoose');
// var environment = require('../config/environment-test');
// reminder: this is local because it's local to _the server_
// server's always gon' be local to the code
	
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/field_guide_app';
var db = mongoose.createConnection(mongoUrl);
var auth_db = db.useDb('field_guide_users');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('db open');
         // yay!
});

console.log(mongoUrl);

module.exports = {auth: auth_db, db: db};