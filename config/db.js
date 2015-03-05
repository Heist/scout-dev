// db.js
'use strict';

var mongoose = require('mongoose');

// reminder: this is local because it's local to _the server_
// server's always gon' be local to the code
// Test for our ip address and set what environment we're in accordingly
var ifaces = require('os').networkInterfaces();
var ipAddress = function(arr){
	var address;
	Object.keys(arr).forEach(function (ifname) {
	  ifaces[ifname].forEach(function (iface) {
	  	return ('IPv4' !== iface.family || iface.internal !== false) ?
	  			address :
	  			address = iface.address;
	  });
	});
	return address;
};
var environment = function(ip){
	var arr = ip.split(".");
	return (arr[0].length === 2) ? 'test': 'production';
};
 
 process.env.NODE_ENV = environment(ipAddress(ifaces));

if(process.env.NODE_ENV !=='test'){
	console.log("Environment "+process.env.NODE_ENV+", connecting to production|dev DB");
	var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/field_guide_app';
	var db = mongoose.createConnection(mongoUrl);
	var auth_db = db.useDb('field_guide_users');

	module.exports = {auth: auth_db, db: db};

	// this segment does not work right now.
	    db.on('error', console.error.bind(console, 'connection error:'));
	    db.once('open', function callback () {
	             // yay!
	    });
	}
else {
	console.log("Test environment set, connecting to test DB");
	var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/field_guide_app_test';
	var db = mongoose.createConnection(mongoUrl);
	var auth_db = db.useDb('field_guide_users_test');

	module.exports = {auth: auth_db, db: db};

	// this segment does not work right now.
	    db.on('error', console.error.bind(console, 'connection error:'));
	    db.once('open', function callback () {
	             // yay!
	    });

}