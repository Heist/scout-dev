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
		}).then(function(next){
			agent.post('/auth/login').send({ email:'login@heistmade.com', password: 'login' }).end(function(err, res){
				loggedIn = agent;

				loggedIn.post('/api/message/')
				.send({
					body : 'New message body #puce #blue', 
					_test : m.t._id,
					_task : m.tsk._id,
					_subject : m.s._id
				})
				.end(function(err, res){
					m.puce = res.body.msg;
					done();
				})
			})
		})
	})

	it('does not accept a message without a test', function(done){
		loggedIn.post('/api/message/')
			.send({
				body : 'This is a #blue #note #purple', 
				_task : m.tsk._id,
				_subject : m.s._id
			})
			.end(function(err, res){
				console.log(res.body);
				expect(res.body).to.equal('Path `_test` is required.')
				done();
			});
	});

	it('does not accept a message without a subject', function(done){
		loggedIn.post('/api/message/')
			.send({
				body : 'This is a #blue #note #purple', 
				_test : m.t._id,
				_task : m.tsk._id,
			})
			.end(function(err, res){
				expect(res.body).to.equal('Path `_subject` is required.')
				done();
			});
	});

	it.skip('Reject note if just a tag', function(done){
		loggedIn.post('/api/message/')
			.send({
				body : '#purple', 
				_test : m.t._id,
				_task : m.tsk._id,
				_subject : m.s._id
			})
			.end(function(err, res){
				expect(res.body).to.equal('Path `body` is required.')
				done();
			});
	})

	it('should accept a full message', function(done){
		loggedIn.post('/api/message/')
			.send({
				body : 'This is a #blue #note #purple', 
				_test : m.t._id,
				_task : m.tsk._id,
				_subject : m.s._id
			})
			.end(function(err, res){
				expect(res.body).to.be.an('object')
				expect(res.body.msg._tags).to.have.length(3)
				expect(res.body.msg.body).to.equal('This is a #blue #note #purple')
				expect(res.body.tags).to.have.length(6)
				done();
			});
	});

	it('Accept tag without message', function(done){
		loggedIn.post('/api/tag/')
			.send({
				_test : m.t._id,
				name: 'Gray'
			})
			.end(function(err,res){
				expect(res.body.nameCheck).to.equal('gray')
				expect(res.body.name).to.equal('Gray')
				expect(res.body._messages).to.have.length(0);
				done();
			})
	});

	it('Accept a tag with message', function(done){
		loggedIn.post('/api/tag/')
			.send({
				_test : m.t._id,
				name: 'Gray',
				msg:  m.msg._id
			})
			.end(function(err,res){
				expect(res.body.nameCheck).to.equal('gray')
				expect(res.body.name).to.equal('Gray')
				expect(res.body._messages).to.have.length(1);
				expect(res.body._messages[0]).to.equal(m.msg._id.toString());
				done();
			})
	});	

	it('Update existing tag with new message', function(done){
		loggedIn.post('/api/tag/')
			.send({
				_test : m.t._id,
				name: 'Gray',
				msg:  m.msg2._id
			})
			.end(function(err,res){
				expect(res.body.nameCheck).to.equal('gray')
				expect(res.body.name).to.equal('Gray')
				expect(res.body._messages).to.have.length(2);
				expect(res.body._messages[1]).to.equal(m.msg2._id.toString());
				done();
			})
	})

	it('Change capitalization on an existing tag name', function(done){
		loggedIn.post('/api/tag/')
			.send({
				_test : m.t._id,
				name: 'Blue',
				msg:  m.msg2._id
			})
			.end(function(err,res){
				expect(res.body.nameCheck).to.equal('blue')
				expect(res.body.name).to.equal('Blue')
				done();
			})
	});

	it('should return tags by test', function(done){
			loggedIn.get('/api/tag/'+m.t._id)
				.end(function(err,res){
					expect(res.body).to.have.length(7);
					done();
				});
	});

	it('should edit an existing message', function(done){
		loggedIn.put('/api/message/')
			.send({
				_id : m.msg2._id,
				body: 'New message body #yeah #body'
			})
			.end(function(err,res){
				expect(res.body).to.be.an('object')
				expect(res.body.msg._tags).to.have.length(2)
				expect(res.body.msg.body).to.equal('New message body #yeah #body')
				expect(res.body.tags).to.have.length(9)
				done();
			});
	});

	it('should remove a tag that has no messages', function(done){
		// Puce is now a message, that should help with things
			loggedIn.put('/api/message/')
				.send({
					_id : m.puce._id,
					body : 'Kill puce #yellow'
				})
				.end(function(err, res){
					expect(res.body).to.be.an('object')
					expect(res.body.msg._tags).to.have.length(1)
					expect(res.body.msg.body).to.equal('Kill puce #yellow')
					expect(res.body.tags).to.have.length(8)
					done();
				})
	});
})

})();