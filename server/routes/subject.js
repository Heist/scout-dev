// subject.js
'use strict';

module.exports = function(app, passport, debug) {

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
var Subject = require('../models/data/subject');

// SUBJECT ROUTES ===============================================
    app.route('/api/subject/')
        .get(function(req,res){
                Subject.find({})
                    .exec(function(err,subjects){
                        if(err){console.log(err);}
                        
                        res.json(subjects);
                    });
            })
        .post(function(req,res){
                // console.log('touched add subject', req.body);
                // TODO: UUID needs to stay the same
                async.waterfall([function(callback){
                    var subject = new Subject();

                    subject.name = req.body.name;
                    subject.testroom = req.body.testroom;
                    subject.test = req.body.test;
                    
                    subject.save(function(err, data){
                        if(err){console.log(err);}
                        
                        callback(null, data);
                    });
                },function(subject, callback){
                    Test.findById(subject.test)
                        .exec(function(err, doc){
                            if(err){console.log(err);}
                            if(doc){
                                var now = new Date();
                                doc.last_run = now;
    
                                doc.save(function(err, saved){
                                    if(err){console.log(err);}
                                    callback(null, {subject: subject, test: saved});
                                });
                            } else {
                                callback(null, subject);
                            }
                        });
                    // callback(null, {subject: args});
                }], function(err,results){
                        if(err){console.log(err);} 
                        res.json(results.subject);
                    });
            });

    app.route('/api/subject/:_id')
        .get(function(req, res){
            Subject.findById(req.params._id)
                .exec(function(err, subject){
                    if(err){console.log(err);}
                    res.json(subject);
                });
        });
};
