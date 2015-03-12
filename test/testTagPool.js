// unit.skip tests for the tag pool backend

(function(){
'use strict';

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var request = require('supertest-as-promised');

var mongoose = require('mongoose');
var models = require('../server/models');
var fn = require('../server/models/functions');

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
				
				var findS = function(){
								return models.Subject.findOne({});
							}
				var findT = function(){
								return models.Test.findOne({});
							}


				findS.then(function(s){
					findT.then(function(s, t){
						fn.messageNew({
							body : 'This is a #blue #note #purple', 
							_test : t._id ,
							_subject : s._id
						}, agent, 
						function(err, data){
							expect(data.body).to.be.an('object');
							expect(data.body.tags).to.have.length(3);
							expect(data.body.msg).to.equal('This is a');
							done();	
						})
					})
				})
				
			});
					
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