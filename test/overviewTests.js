// overviewTests.js
// test to see that objects are returned and populated correctly
'use strict';


var app = require('../server.js');

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var request = require('supertest-as-promised');
// var api = request(app);

var mongoose = require('mongoose');

// Set global to work outside of node ===========
global.rootRequire = function(name) {
	    	name = name.substring(1, name.length);
	    	var dir = __dirname.substring(0, __dirname.length - 5);
		    return require(dir + name);
		};

// What functions are we testing? ===============
var navlist  = require('../server/models/functions/build-object-list');
var devTests = require('../server/models/auth/user');

// Required data schema ========================================
// database is set by ip address in config/db.js
// database should perhaps be set by process.env.NODE_ENV

// Auth DB ======================================
var User = global.rootRequire('./server/models/auth/user');
var Invite = global.rootRequire('./server/models/auth/invitation');

// // App DB =======================================
var Test = global.rootRequire('./server/models/data/test');

describe('Check overview and population', function(){
	var agent = request.agent(app); // this is to check logins, not account creation.
	var account = mongoose.Types.ObjectId();


	before(function(){
		// make a demo user to use in this block of login checks

        var pass = User.schema.methods.genHash('login');
		User.create({
			name : 'login',
			local : {
					email : 'login@heistmade.com',
					password : pass
					},
			_account : account
		}, function(err, u){
			if(err){console.log(err);} 
			Invite.create({
                _account : u._account,
                created_by_user : u._id,
                invite_email : 'sarah@made.com'
            }, function(err, invite){
                if(err){ console.log(err); }
            });
		});        
	});

	after(function(done){
		User.remove({}, function(err, doc){});
		Test.remove({}, function(err, doc){});
		Invite.remove({}, function(err, doc){});
		done();
	});

	describe('Automatic dev test generation', function(){
		it('should generate tests on the db and populate them with data', function(done){

			agent.post('/auth/login').send({
				email:'login@heistmade.com',
				password: 'login'
			}).expect(200).end(function(err, res){
					
				agent
                .post('/api/dev_tests/')
                .send({})
                .expect(200)
                .end(function(err, res) {
                	console.log('data returned login', res);
                    should.not.exist(err);
                    console.log(res.headers['set-cookie']); // Should print nothing.
                    res.body.should.have.property('user');
                    res.body.user.should.have.properties('name', 'email');
                    done();
                });
				})
			
		});
	});	

	describe('Get tests for overview', function(){
		it('Should populate the overview with tests from current user', function(done){
			done();
		});

		it('Should not return tests from foreign keys', function(done){
			done();
		});
	});

	describe('Navigation list', function(){
		it('should return an ordered list of task, tag, and tests', function(done){
			done();
		});

		it('Should save changes to the nav list', function(done){
			done();
		});

		it('Should return in order of index', function(done){
			done();
		});

	});

});
