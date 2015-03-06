// test.js 
'use strict';
// a sample test for the API using Mocha, Chai, and SuperTest.

var app = require('../server.js');

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var request = require('supertest-as-promised');
var express = require('express');
var cookieParser = require('cookie-parser');
// var api = supertest(app);

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
// var Invite = global.rootRequire('./server/models/auth/invitation');

// // App DB =======================================
// var Comment = global.rootRequire('./server/models/data/comment');
// var Message = global.rootRequire('./server/models/data/message');
// var Subject = global.rootRequire('./server/models/data/subject');
// var Tag = global.rootRequire('./server/models/data/tag');
// var Task = global.rootRequire('./server/models/data/task');
var Test = global.rootRequire('./server/models/data/test');

describe("Check Passport", function(){
	var agent = request.agent(app);	
	
	before(function(){
		// make a demo user to use in this block of login checks
		User.create({
			name : 'login',
			email : 'login@heistmade.com',
			password : User.generateHash('login', function(err, password){
						return password;
					}),
			_account : mongoose.Types.ObjectId()
		}, function(err, u){
			if(err){console.log(err);} 
		});
	});

	after(function(done){
		User.remove({}, function(err, doc){});
		Test.remove({}, function(err, doc){});
		done();
	});
	
	describe('POST /auth/signup', function () {
		var url = '/auth/signup';
		it('should fail an empty request', function(done){
			agent.post(url)
			.send({ user: null, password: null })
			.end(function(err, res) {
				expect(res.body).to.deep.include({ error: 'Email and Password required' });
				done();
			});
		});

		it('should register a new user on the db', function(done){
			agent.post(url).send({
				email: 'becky@made.com', 
				name:'becky',
				password:'becky'
			}).then(function(err, res){
				console.log('response', res.body);
				expect(res.body).to.deep.include({redirect: '/overview', msg:'register user worked' });
				done();
			}).catch(function(err){

			}).done();
		});
	});

});