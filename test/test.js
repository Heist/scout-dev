// test.js 
'use strict';
// a sample test for the API using Mocha, Chai, and SuperTest.

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://127.0.0.1:8080');
var mongoose = require('mongoose');

var app = require('../server').app;

// // Set global to work outside of node ===========
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

describe("Get a new user from Passport", function(){
	
	var baseUrl = '/auth/login';
	var emailAddress = 'login@heistmade.com';
	var realPassword = 'login';

	beforeEach(function (done) {
	// TODO this should be refactored into a User.new() function.
	// Hash the password
	// User.find().exec(function(err, docs){
	// 	console.log(docs);
	// 	done();
	// });

		User.generateHash(realPassword, function (err, passwordHash) {
		// Create a User
			var u = {
				_account : account,
				name: name,
				local            : {
					email        : emailAddress,
					password     : passwordHash,
					name         : name
				}
			};
	 
			User.create(u, function (err, u) {
				// call the done() method so the mocha knows we are done.
				console.log(u);
				done();
			});
		});
	});

	afterEach(function(done){
		User.remove(function(err, doc){
			done();
		});
	});

	describe('POST /auth/login', function () {
		
		it('should redirect to "/account" if authentication fails', function (done) {
			console.log('it block');
			done();
			// post is what we will be sending to the /auth/local
		// 	var post = {
		// 		email: emailAddress,
		// 		password: realPassword
		// 	};

		// 	api(app)
		// 		.post(baseUrl)
		// 		.send(post)
		// 		.expect(302)
		// 		.end(function (err, res) {
		// 		 should.not.exist(err);
		// 		 // confirm the redirect
		// 			 res.header.location.should.include('/account');
		// 			 done();
		// 		});
		// });

		// it('should redirect to "/login" if authentication fails', function (done) {
		// 	var post = {
		// 		email: 'berry@example.com',
		// 		password: 'fakepassword'
		// 	};

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


});

// // Write A Test =================================
// describe('Mock a full test', function(){

// 	describe("Test creation", function(){  
// 	//holds a customer to use in the each test  
// 		var currentCustomer = null;  
// 		beforeEach(function(done){    
// 	//add some test data    
// 			.create( function(doc){      
// 				currentCustomer = doc;      
// 				done();    
// 			});  
// 		});    
	
// 		afterEach(function(done){    
// 	//delete all the customer records
// 			customer.model.remove({}, function() {      
// 				done();    
// 			});  
// 		});  
// 		//tests...  
// 	});
// });


// FUNCTION TESTS ===============================
// describe('NavList', function(){
// 	describe('Nav.Testname', function(){
// 		it('testname',function(done){
// 				navlist('54f0c190d86c9ed326251fc1', function(err, list){
// 						expect(list).to.be.an('object');
// 						expect(list.test).to.be.a('string');
// 						expect(list.list).to.not.be.empty;
// 						done();
// 					});
// 		});
// 	});
// });