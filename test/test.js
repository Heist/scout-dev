// test.js 
'use strict';
// a sample test for the API using Mocha, Chai, and SuperTest.

var should = require('chai').should;
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://127.0.0.1:8080');
var navlist = global.rootRequire('./server/models/functions/build-object-list')

console.log('NODE_ENV: '+ process.env.NODE_ENV);

if ( process.env.NODE_ENV !== 'test' ) {
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
	it('Should return an object with two parts, test and navlist',function(done){
		navlist(); // in here you call the navlist and supply it some data from the db and if it's wrong, flunk it.
		// DONE.
	});
});