// test.js
'use strict';

module.exports = function(app, passport, debug) {

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');

    // load data storage models
    var Message = require('../models/data/message');
    var Task    = require('../models/data/task');
    var Test    = require('../models/data/test');
    var Tag     = require('../models/data/tag');
    var Subject = require('../models/data/subject');

    // load functions
    var devTest = require('../models/functions/dev-tests.js');
    var dupeTest = require('../models/functions/dupe-tests.js');

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
        var test = new Test();

        test.created_by_account = req.body.created_by.account;
        test.created_by_user = req.body.created_by._id;

        test.save(function(err, test){
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
        var t = req.body;
        var tasks = [];

        if(t._tasks.length > 0){
            tasks = _.pluck(t._tasks, '_id');            
            async.each(t._tasks, function(task){

                Task.findOneAndUpdate(
                    {'_id': task._id},
                    {index : task.index },
                    function(err, doc){
                        if(err){console.log(err);}
                    });
            });

        }
        
        var id = mongoose.Types.ObjectId(t._id);

        var update = {
                desc    : t.desc,
                link    : t.link,
                name    : t.name,
                platform: t.platform,
                kind    : t.kind,
                _tasks  : tasks
            };

        var options = {
            upsert : true
        };

        Test.findOneAndUpdate({_id:req.params._id}, update, function (err, doc) {
            if (err){console.log(err);}
            res.json(doc);
        });
      
    })
    .delete(function(req,res){
        // deletes a single test by id
        // from session list of tests
        // and then removes 
        // all tasks
        // all messages
        // all tags
        // that belonged to that test.

        Test.find({_id:req.params._id})
            .remove(function(err){
                if (err) { console.log(err); }
            });

        Task.find({_test:req.params._id})
            .remove(function(err){
                if (err) { console.log(err); }
            });

        Message.find({_test:req.params._id})
            .remove(function(err){
                if (err) { console.log(err); }
            });

        Tag.find({_test:req.params._id})
            .remove(function(err){
                if (err) { console.log(err); }
            });

        res.json('test removed', req.params._id);

    });
};