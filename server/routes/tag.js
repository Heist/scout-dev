// tag.js
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

// TAG ROUTES ================================================
	app.route('/api/tag/')
		.get(function(req,res){
			Tag.find(function(err, tags) {
					if(err){res.send(err);}

					res.json(tags);
				})
			});

	app.route('/api/tag/:_id')
		.get(function(req,res){
			Tag.findById(req.params._id)
				.exec(function(err, tags) {
					if(err){res.send(err);}

					res.json(tags);
				})
		})
		.post(function(req,res){
			console.log('tag post touched')
			res.json('tag post touched')
		});
}