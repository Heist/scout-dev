// unit.skip tests for the tag pool backend

(function(){
'use strict';

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var request = require('supertest-as-promised');
var Promise = require('bluebird');

var mongoose = require('mongoose');
// var models = require('../server/models');
var fn = require('../server/models/functions');

var app = require('../server.js');
var api = request(app);

// Tag Pool Tests  ==============================
var models = Promise.promisifyAll(require('../server/models'));


describe('The Tag Pool', function(){
	var agent = request.agent(app); // this is to check logins, not account creation.
	var m = {};
	
	before(function(done){
			var obj = models.Subject.findOneAsync({});
			obj.then(function(s){
				m.s = s;
				return models.Test.findOneAsync({'_subjects': {$in: [m.s._id]}})
						.then(function(t){
							m.t = t;
							return models.Task.findOneAsync({'_test':m.t._id, '_subjects': {$in: [m.s._id]}})
							.then(function(tsk){
								m.tsk = tsk;
								done();
							})
						});
			});
	})

	it.skip('on tag creation, should store in pool as a whole', function(done){

	});

	it('tests a new message, removes tags from body of note and stores them in .tags', function(done){
		agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' })
			.end(function(err, res) { // get logged in
				// This may require a more global variable.
				agent.post('/api/message/')
					.send({
						body : 'This is a #blue #note #purple', 
						_test : m.t._id,
						_task : m.tsk._id,
						_subject : m.s._id
					})
					.end(function(err, res){
						console.log('data returned', err, res);
						expect(res.body).to.be.an('object')
						expect(res.body.tags).to.have.length(3)
						expect(res.body.body).to.equal('This is a')
						done();
					});
			});
	});

	it.skip('does not accept a message without a test', function(){

	});

	it.skip('does not accept a message without a subject', function(){

	});

	it.skip('should create tags per user', function(done){
		
	});

	it.skip('should make tags available to anyone on that test', function(done){
		
	});

	it.skip('should store tags on notes', function(done){
		
	});

	it.skip('should lowercase tags and check against canonical tag', function(done){
		
	});

	it.skip('should save lowercased tags to test list of tags', function(done){
		
	});
})

})();