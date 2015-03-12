// unit.skip tests for the tag pool backend

(function(){
'use strict';

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var request = require('supertest-as-promised');

var mongoose = require('mongoose');
var models = require('../server/models');

var app = require('../server.js');
var api = request(app);

// Tag Pool Tests  ==============================

describe('The Tag Pool', function(){
	var agent = request.agent(app); // this is to check logins, not account creation.
	it.skip('on tag creation, should store in pool as a whole', function(done){

	});

	it('removes tags from body of note and stores them in .tags', function(done){
		agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' })
			.end(function(err, res) { // get logged in
				agent.get('/api/subject/') // get our subject and test to post our message to
				.end(function(err, res){
					console.log(res.body);
					agent.get('/api/test/')
					.end(function(err, res){
						console.log(res.body);
						done();	
					})
					
					// agent.post('/api/message/').send({
					// 		msg : {
					// 			body : 'This is a #blue #note #purple', 
					// 			_test : '' ,
					// 			_subject : ''
					// 		}
					// 	})
					// .end(function(err, data){
					// 	expect(data.body).to.be.an('object');
					// 	expect(data.body.tags).to.have.length(3);
					// 	expect(data.body.msg).to.equal('This is a');
					// 	done();	
					// });
				});
			});
		// agent.login
		// agent.put('/api/message/', message with tags);
		// 

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