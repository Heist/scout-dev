// subject.js
'use strict';

module.exports = function(app, passport) {

// Module dependencies
var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('lodash');
var request = require('request');
var async = require('async');

// load data storage models
var Message = require('../models/data/message');
var Task    = require('../models/data/task');
var Test    = require('../models/data/test');
var Tag     = require('../models/data/tag');
var Session = require('../models/data/session');
var Subject = require('../models/data/subject');

// SUBJECT ROUTES ===============================================
    app.route('/api/subject/')
        .get(function(req,res){
                Subject.find({})
                    .exec(function(err,subjects){
                        if(err){res.send(err);}
                        
                        res.json(subjects);
                    });
            })
        .post(function(req,res){
                // console.log('touched add subject', req.body);

                async.waterfall([function(callback){
                    var subject = new Subject();

                    subject.name = req.body.name;
                    subject.testroom = req.body.testroom;
                    subject.test = req.body.test;
                    
                    subject.save(function(err, data){
                        if(err){res.send(err);}
                        
                        callback(null, data);
                    });
                },function(args, callback){
                    Test.findById(args.test)
                        .exec(function(err, doc){
                            if(err){throw err;}

                            var now = new Date();
                            doc.last_run = now;

                            doc.save(function(err, saved){
                                if(err){throw err;}
                                callback(null, {subject: args, test: saved});
                            });
                        });
                    // callback(null, {subject: args});
                }], function(err,results){
                        if(err){throw err;} 
                        res.json(results.subject);
                    });
            });

    app.route('/api/subject/:_id')
        .get(function(req, res){
            Subject.findById(req.params._id)
                .exec(function(err, subject){
                    if(err){res.send(err);}
                    res.json(subject);
                });
        });
};
