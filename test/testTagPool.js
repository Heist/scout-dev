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



	it.skip('on tag creation, should store in pool as a whole', function(done){

	});

	it.skip('should remove tags from the body of a note', function(done){

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