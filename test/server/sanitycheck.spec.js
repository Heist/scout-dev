'use strict';

var child = require('child_process');
var request = require('request');
// sanitycheck.spec.js

describe("basic server lifecycle", function() {
	var server;

	beforeEach(function() {
		server = child.fork('server.js');

		// theory is good! In practice this detaches on running
		// and then hides it in your processes
		// to kill detached process: ps aux | grep server.js
		// kill 96865 << process number
	});

	it("'s alive!", function(done) {
		request('http://localhost:5000/api/test', function(error, response, body) {
			expect(error).toBeFalsey();
			done();
		});
	});

	it("runs two tests", function() {
	});

	afterEach(function(done) {
		server.kill('SIGINT');
		server.on('exit', function() {
			done();
		});
	});
});