// test.js 
'use strict';
// a sample test for the API using Mocha, Chai, and SuperTest.

var app = require('../server.js');

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var supertest = require('supertest');
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
var Invite = global.rootRequire('./server/models/auth/invitation');

// App DB =======================================
var Comment = global.rootRequire('./server/models/data/comment');
var Message = global.rootRequire('./server/models/data/message');
var Subject = global.rootRequire('./server/models/data/subject');
var Tag = global.rootRequire('./server/models/data/tag');
var Task = global.rootRequire('./server/models/data/task');
var Test = global.rootRequire('./server/models/data/test');

describe("Check Passport", function(){
	
	var baseUrl = '/auth/login';
	var emailAddress = 'login@heistmade.com';
	var realPassword = 'login';
	var name = 'login';
	var account = mongoose.Types.ObjectId();
	var agent = supertest.agent(app);

	// // beforeEach(function (done) {

	// 	User.generateHash(realPassword, function (err, passwordHash) {
	// 	// Create a User
	// 		User.create({
	// 				_account : account,
	// 				name: name,
	// 				local            : {
	// 					email        : emailAddress,
	// 					password     : passwordHash,
	// 					name         : name
	// 				}
	// 			}, 
	// 			function (err, u) {
	// 				console.log(u);
	// 				done();
	// 			});
	// 	});
	// // });

	afterEach(function(done){
		User.remove(function(err, doc){
			done();
		});
	});

	describe('POST /auth/signup', function () {
		var url = '/auth/signup';

		it('should fail an empty request', function(done){
			agent.post(url)
			.send({ user: null, password: null })
			.end(function(err, res) {
				// user1 will manage its own cookies
				// res.redirects contains an Array of redirects
				// console.log(res);
				// console.log(res);
				expect(res.body).to.deep.include({ error: 'Email and Password required' });
				done();
			});
		});

		it('should deny registered e-mail addresses', function(done){
			done();
		});

		it('should register a new user on the db', function(done){
			agent.post(url).send({
				email: 'becky@made.com', 
				name:'becky',
				password:'becky'
			}).end(function(err, res) {
				// agent will manage its own cookies
				// res.redirects contains an Array of redirects
				expect(res.body).to.deep.include({redirect: '/overview', msg:'register user worked' });
				done();
			});
		});

		// 	api(app)
		// 		.post(baseUrl)
		// 		.send(post)
		// 		.expect(302)
		// 		.end(function (err, res) {
		// 			should.not.exist(err);
		// 			// confirm the redirect
		// 			res.header.location.should.include('/login');
		// 			done();
		// 		});
		});
	});
