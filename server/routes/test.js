// test.js
'use strict';

module.exports = function(app, passport, debug) {

// Module dependencies ==========================
    var async = require('async');

// load data storage models =====================
    var models  = require('../models');
 
// load functions  ==============================
    var fn  = require('../models/functions');

// TEST ROUTES ===================================================

    app.route('/api/test/')
    .get(function(req,res){
    // get all of the tests
        models.Test.find({created_by_account:req.user._account})
        .exec(function(err, docs) {
            if(err){console.log(err);}
            res.json(docs);
        });
    })
    .post(function(req,res){
        console.log('touched New Test', req.user);
    // add a new test
        models.Test.create({
            created_by_account : req.user._account,
            created_by_user : req.user._id
        }, function(err, test){
            if(err){console.log(err);}
            res.json(test);
        });
    });

    app.route('/api/dev_tests/')
    .post(function(req, res){
    // This builds a mock for testing reports
        fn.devTest(req.user._account, req.user._id, function(err, test){
            res.json(test);
        });
    });

    app.route('/api/test/:_id')
    .get(function(req,res){
    // get one test
        models.Test.findById(req.params._id)
            .populate('_tasks')
            .exec(function(err,test){
                if(err){console.log(err);}
                res.json(test);
            });
    })
    .post(function(req,res){
    // Duplicate a test with new steps and things but which appears to be identical
        fn.dupeTest(req.params._id, function(err, test){
            res.json(test);
        });
    })
    .put(function(req,res){
    // update one test with new information
        fn.editTest(req.body, function(err, test){
            if(err){console.log(err);}
            res.json(test);
        });
    })
    .delete(function(req,res){
    // Delete a test and dependencies
        fn.delTest(req.params._id, function(err, test){
            if(err){ console.log(err); }
            res.json(test);
        });
    });
};