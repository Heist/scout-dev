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


describe('Nav List', function(){
	var agent = request.agent(app); // this is to check logins, not account creation.
	var m = {};
	var loggedIn = {};

	before(function(done){
		var obj = models.Subject.findOneAsync();
		obj.then(function(s){
			m.s = s;
			return models.Test.findOneAsync({'_subjects': {$in: [m.s._id]}});
		})
		.then(function(t){
			m.t = t;
			return models.Task.findOneAsync({'_test': m.t._id, '_subjects': {$in: [m.s._id]}});
		})
		.then(function(tsk){
			m.tsk = tsk;
			return models.Message.findAsync({'_test': m.t._id});
		})
		.then(function(msg){
			m.msg = msg[0];
			m.msg2 = msg[1];
			m.msg3 = msg[2];
			done();
		});	

		agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' }).end(function(err, res){
			loggedIn = agent;
		})
	})

	it('returns a list of messsages and a list of objects', function(done){
		loggedIn.get('/api/summary/'+m.t._id)
			.end(function(err, res){
				expect(res.body).to.be.an('object');
				expect(res.body.navlist).to.be.an('object');
				expect(res.body.navlist).to.have.property('test');
				expect(res.body.navlist).to.have.property('list');
				expect(res.body.navlist.test).to.be.a('string');
				expect(res.body.navlist.list).to.have.length(6);
				expect(res.body.messages).to.be.an('array');
				done();
			});
	});

})

})();