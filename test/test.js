// test.js 
// a sample test using Mocha, Chai, and SuperTest.

var should = require('chai').expect;
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://127.0.0.1:8080');

describe('User', function(){
	it('returns a 200 response',function(done){
		api.get('/users/1')
		.set('Accept', 'application/json')
		.expect(200, done);
	});
});