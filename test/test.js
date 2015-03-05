// test.js 
'use strict';
// a sample test for the API using Mocha, Chai, and SuperTest.

var should = require('chai').should;
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://127.0.0.1:8080');
var mongoose = require('mongoose');
var navlist = require('../server/models/functions/build-object-list');

global.rootRequire = function(name) {
	    	name = name.substring(1, name.length);
	    	var dir = __dirname.substring(0, __dirname.length - 4);
		    return require(dir + name);
		};
// Test for our ip address and set what environment we're in accordingly
// if() NODE_ENV= production node app.js

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
var NODE_ENV = environment(ipAddress(ifaces));

if ( NODE_ENV !== 'test' ) {
	console.log("Woops, you want NODE_ENV=test before you try this again!");
	process.exit(1);
}

describe('User', function(){
	it('returns a 200 response',function(done){
		api.get('/users/1')
		.set('Accept', 'application/json')
		.expect(200, done);
	});
});

describe('NavList', function(){
	// var record_id = mongoose.Types.ObjectId('54f0c190d86c9ed326251fc1');	
	before(function (){});
	it('Should return an object with two parts',function(done){
			navlist('54f0c190d86c9ed326251fc1', function(err, list){
					expect(list).to.be.an('object');
					expect(doc.test).to.be.a('string');
					done();
				});
	});

	
});