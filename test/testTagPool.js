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
			var obj = models.Subject.findOneAsync();
			obj.then(function(s){
				m.s = s;
				return models.Test.findOneAsync({'_subjects': {$in: [m.s._id]}})
						.then(function(t){
							m.t = t;
							console.log(m.t._id, m.s._id);
							return models.Task.findOneAsync({'_test': m.t._id, '_subjects': {$in: [m.s._id]}})
							.then(function(tsk){
								m.tsk = tsk;
								done();
							})
						});
			});
	})

		it.skip('does not accept a message without a test', function(){
		agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' })
			.end(function(err, res) { // get logged in
				// This may require a more global variable.
				agent.post('/api/message/')
					.send({
						body : 'This is a #blue #note #purple', 
						_task : m.tsk._id,
						_subject : m.s._id
					})
					.end(function(err, res){
						expect(res.body).to.deep.include({error : 'Bad message request.' })
						done();
					});
			});
	});

	it.skip('does not accept a message without a subject', function(){
		agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' })
			.end(function(err, res) { // get logged in
				// This may require a more global variable.
				agent.post('/api/message/')
					.send({
						body : 'This is a #blue #note #purple', 
						_test : m.t._id,
						_task : m.tsk._id,
					})
					.end(function(err, res){
						expect(res.body).to.deep.include({error : 'Bad message request.' })
						done();
					});
			});
	});

	it('should return null if note is just a tag', function(done){
		agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' })
			.end(function(err, res) { // get logged in
				// This may require a more global variable.
				// console.log('should return null', res.body);
				var toSend ={
						body : '#purple', 
						_test : m.t._id,
						_task : m.tsk._id,
						_subject : m.s._id
					};
				console.log('testTagPool message send', toSend);
				agent.post('/api/message/')
					.send(toSend)
					.end(function(err, res){
						console.log('test end', res.body)
						expect(res.body).to.deep.include({error : 'Bad message request.' })
						done();
					});
			});
	})


	it('POST to /api/message, logged in', function(done){
		agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' })
			.end(function(err, res) { // get logged in
				// This may require a more global variable.
				// console.log('testTagPool message return', m);
				agent.post('/api/message/')
					.send({
						body : 'This is a #blue #note #purple', 
						_test : m.t._id,
						_task : m.tsk._id,
						_subject : m.s._id
					})
					.end(function(err, res){
						console.log('test login message post', res.body);
						expect(res.body).to.be.an('object')
						expect(res.body._tags).to.have.length(3)
						expect(res.body.body).to.equal('This is a')
						done();
					});
			});
	});

	it.skip('on tag creation, should store in pool as a whole', function(done){
		// log in
		// get a given test
		// get all the available tags for that test
		agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' })
			.end(function(err, res) {
				agent.get('/api/test/'+m.t._id)
					.end(function(err,res){
						done();
					})
			})
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