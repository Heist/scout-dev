// tag.js
'use strict';

module.exports = function(app, passport, debug) {

// Module dependencies
var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('lodash');

// load data storage models
    var Message = require('../models/data/message');
    var Task    = require('../models/data/task');
    var Test    = require('../models/data/test');
    var Tag     = require('../models/data/tag');
    var Subject = require('../models/data/subject');

// TAG ROUTES ================================================
    app.route('/api/tag/')
        .get(function(req,res){
            Tag.find(function(err, tags) {
                    if(err){console.log(err);}
                    res.json(tags);
                });
        });

    app.route('/api/tag/:_id')
        .get(function(req,res){
            Tag.findById(req.params._id)
                .exec(function(err, tags) {
                    if(err){console.log(err);}
                    res.json(tags);
                });
        })
        .post(function(req,res){
            // console.log('tag post touched')
            res.json('tag post touched');
        })
        .put(function(req, res){
            console.log('touched update tag', req.body)
            var update = {
                summary : req.body.summary, 
                summarized : req.body.summarized,
            };

            Tag.findOneAndUpdate({'_id' : req.params._id}, update, function(err, tag){
                if(err){return console.log(err);}
                res.json(tag);
            });
        });        
};