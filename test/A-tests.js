// registrationTest.js 
// Tests user registration routes
'use strict';

// require('blanket')({ pattern: function (filename) { return !/node_modules/.test(filename); } });

// Set global to work outside of node ===========
global.rootRequire = function(name) {
	    	name = name.substring(1, name.length);
	    	var dir = __dirname.substring(0, __dirname.length - 5);
		    return require(dir + name);
		};

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var request = require('supertest-as-promised');

var mongoose = require('mongoose');
var models = require('../server/models')

var app = require('../server.js');
var api = request(app);


// What functions are we testing? ===============
var navlist  = global.rootRequire('./server/models/functions/build-object-list');
var devTests = global.rootRequire('./server/models/auth/user');

// =============================================================
// ROOT FUNCTIONS
// =============================================================

var account = mongoose.Types.ObjectId();

before(function(){
	// make a demo user to use in this block of login checks
	models.User.create({
		name : 'login',
		local : {
				email : 'login@heistmade.com',
				password : models.User.schema.methods.genHash('login')
				},
		_account : account
	}, function(err, u){
		if(err){console.log(err);} 
		models.Invite.create({
            _account : u._account,
            created_by_user : u._id,
            invite_email : 'sarah@made.com'
        }, function(err, invite){
            if(err){ console.log(err); }
        });
	});
});

after(function(done){
	// clean the DB =====
	models.User.remove({}, function(err, doc){});
	models.Invite.remove({}, function(err, doc){});
	
	models.Test.remove({}, function(err, doc){});
	models.Tag.remove({}, function(err, doc){});
	models.Task.remove({}, function(err, doc){});
	models.Message.remove({}, function(err, doc){});
	models.Comment.remove({}, function(err, doc){});
	models.Subject.remove({}, function(err, doc){});

	done();
});

// =============================================================
// START TESTS 
// =============================================================

describe("Check Passport", function(){
	var agent = request.agent(app); // this is to check logins, not account creation.

	describe('POST /auth/signup', function () {
		var url = '/auth/signup';
		it('should fail an empty request', function(done){
			api.post(url)
			.send({ user: null, password: null })
			.end(function(err, data) {
				expect(data.body).to.deep.include({ error: 'Email and Password required' });
				done();
			});
		});

		it('should register a new user on the db', function(done){
			api.post(url).send({
				email: 'becky@made.com', 
				name:'becky',
				password:'becky'
			}).then(function(data){
				expect(data.body).to.deep.include({redirect: '/overview', msg:'register user worked' });
				done();
			}).catch(function(err){
				done(err);
			}).done();
		});

		it('should fail a repeat request', function(done){
			api.post(url).send({
				email: 'login@heistmade.com', 
				name:'becky',
				password:'becky'
			})
			.then(function(data){
				expect(data.body).to.equal('That email is already taken.');
				done();
			})
			.catch(function(err){
				done(err);
			})
			.done();
		});

		it('should set new user account from existing invitation', function(done){
			api.post(url)
			.send({
				email: 'sarah@made.com', 
				name:'sarah',
				password:'sarah'
			}).then(function(data){
				expect(data.body._account).to.equal(account.toString());
				done();
			}).catch(function(err){
				done(err);
			}).done();
		});
	});

	describe('POST login/logout', function(){
		it('should reject an empty request', function(done){
			api.post('/auth/login').send({
				email:'',
				name: 'login',
				password: 'login'
			})
			.then(function(data){
				expect(data.body).to.deep.include({ error: 'Email and Password required' });
				done();
			})
			.catch(function(err){done(err);})
			.done();
		})

		it('should deny a non-logged-in user', function(done){
			api.get('/api/test/')
				.then(function(data){
					expect(data.body).to.be.an('object');
					expect(data.body).to.be.empty;
					done();
				})
				.catch(function(err){ done(err); })
				.done();
		});

		it('should log in an existing user', function(done){
			agent.post('/auth/login').send({
				email:'login@heistmade.com',
				password: 'login'
			})
			.then(function(data){
				expect(data.body).to.deep.include({name:'login', redirect: '/overview', msg:'login worked' });
				done();
			})
			.catch(function(err){done(err);})
			.done();
		})

		it('should log out a logged-in account', function(done){
			agent.post('/auth/logout')
			.send({})
			.then(function(data){
				expect(data.body).to.deep.include({ redirect: '/login' });
				done();
			}).catch(function(err){
				done(err);
			}).done();
		});
	});
});