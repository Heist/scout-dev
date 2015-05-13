// test.js
'use strict';

module.exports = function(app, passport) {

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
            if(err){ console.error(err); }
            res.json(docs);
        });
    })
    .post(function(req,res){
        // 
    // add a new test
        fn.testNew(req, function(err, test){
            if(err){ console.error(err); }
            res.json(test);
        });
    });

    app.route('/api/dev_tests/')
    .post(function(req, res){
    // This builds a mock for testing reports
    // 
        fn.devTests(req.user._account, req.user).then(function(test){
            res.json(test);
        });
    });

    app.route('/api/test/:_id')
    .get(function(req,res){
    // get one test
        models.Test.findById(req.params._id)
            .populate('_tasks')
            .populate('_tags')
            .exec(function(err,test){
                if(err){ console.error(err); }
                res.json(test);
            });
    })
    .post(function(req,res){
    // Duplicate a test with new steps and things but which appears to be identical
        fn.dupeTests(req.params._id, function(err, test){
            res.json(test);
        });
    })
    .put(function(req,res){
    // update one test with new information
        fn.editTest(req.body, function(err, test){
            if(err){ console.error(err); }
            res.json(test);
        });
    })
    .delete(function(req,res){
    // Delete a test and dependencies
        fn.deleteTest(req.params._id, function(err, test){
            if(err){ console.error(err); }
            res.json(test);
        });
    });
};