// test.js 
'use strict';
// a sample test for the API using Mocha, Chai, and SuperTest.

// Module dependencies ==========================
var should = require('chai').should;
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://127.0.0.1:8080');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tekpub_test');

// Set global to work outside of node ===========
global.rootRequire = function(name) {
	    	name = name.substring(1, name.length);
	    	var dir = __dirname.substring(0, __dirname.length - 4);
		    return require(dir + name);
		};

// What functions are we testing? ===============
var navlist  = require('../server/models/functions/build-object-list');
var devTests = require('../server/models/auth/user');

// Required models ==============================
var User = require('../server/models/data/');


// Connect to the test database =================


// Write A Test =================================
describe('Mock a full test', function(){

	describe("Test creation", function(){  
	//holds a customer to use in the each test  
		var currentCustomer = null;  
		beforeEach(function(done){    
	//add some test data    
			.create( function(doc){      
				currentCustomer = doc;      
				done();    
			});  
		});    
	
		afterEach(function(done){    
	//delete all the customer records
			customer.model.remove({}, function() {      
				done();    
			});  
		});  
		//tests...  
	});
});


// FUNCTION TESTS ===============================
describe('NavList', function(){
	describe('Nav.Testname', function(){
		it('testname',function(done){
				// navlist('54f0c190d86c9ed326251fc1', function(err, list){
				// 		expect(list).to.be.an('object');
				// 		expect(list.test).to.be.a('string');
				// 		expect(list.list).to.not.be.empty;
				// 		done();
				// 	});
		});
	});
});