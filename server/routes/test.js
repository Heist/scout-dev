// test.js
'use strict';

module.exports = function(app, passport, debug) {

// Module dependencies
    var async = require('async');

// load data storage models
    var Test    = global.rootRequire('./server/models/data/test');
 
// load functions
    var devTest  = global.rootRequire('./server/models/functions/dev-tests');
    var dupeTest = global.rootRequire('./server/models/functions/dupe-tests');
    var editTest = global.rootRequire('./server/models/functions/edit-test');
    var delTest  = global.rootRequire('./server/models/functions/delete-test');

// TEST ROUTES ===================================================

    app.route('/api/test/')
    .get(function(req,res){
    // get all of the tests
        Test.find({created_by_account:req.user._account})
        .exec(function(err, docs) {
            if(err){console.log(err);}
            res.json(docs);
        });
    })
    .post(function(req,res){
    // add a new test
        Test.create({
            created_by_account : req.body.created_by.account,
            created_by_user : req.body.created_by._id
        }, function(err, test){
            if(err){console.log(err);}
            res.json(test);
        });
    });

    app.route('/api/test/dev_tests/')
    .post(function(req, res){
    // This builds a mock for testing reports
        devTest(req.user._account, req.user._id, function(err, test){
            res.json(test);
        });
    });

    app.route('/api/test/:_id')
    .get(function(req,res){
    // get one test
        Test.findById(req.params._id)
            .populate('_tasks')
            .exec(function(err,test){
                if(err){console.log(err);}
                res.json(test);
            });
    })
    .post(function(req,res){
    // Duplicate a test with new steps and things but which appears to be identical
        dupeTest(req.params._id, function(err, test){
            res.json(test);
        });
    })
    .put(function(req,res){
    // update one test with new information
        editTest(req.body, function(err, test){
            if(err){console.log(err);}
            res.json(test);
        });
    })
    .delete(function(req,res){
    // Delete a test and dependencies
        delTest(req.params._id, function(err, test){
            if(err){ console.log(err); }
            res.json(test);
        });
    });
};