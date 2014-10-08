// report.js
'use strict';

module.exports = function(app, passport) {

// Module dependencies
var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('underscore');

// load data storage models
var Message = require('../models/data/message');
var Task    = require('../models/data/task');
var Test    = require('../models/data/test');
var Tag     = require('../models/data/tag');
var Session = require('../models/data/session');
var Subject = require('../models/data/subject');

// REPORT ROUTES =============================================
// http://mongoosejs.com/docs/api.html#model_Model.populate
app.route('/api/report/:_id')
	.get(function(req, res){
		console.log(req.body)
		var reply = {};

		var test_id = req.params._id;
		console.log('touched report get', req.params);

		var promise = 
			Test.findOne({_id: test_id})
				.populate('_subjects')
				.exec(function(err, test){
					if(err) res.send(err);
					console.log('test found', test._id)
				});

		promise.then(function(test){
			reply.test = test;
			console.log('test found', test._id)
			res.json(reply);
		})
		.then(null, function(err){
			if(err) return res.send (err)
		});
	});	

}