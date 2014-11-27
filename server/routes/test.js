// test.js
'use strict';

module.exports = function(app, passport) {

// Module dependencies
var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
var _ = require('underscore');
var async = require('async');

// load data storage models
var Message = require('../models/data/message');
var Task    = require('../models/data/task');
var Test    = require('../models/data/test');
var Tag     = require('../models/data/tag');
var Session = require('../models/data/session');
var Subject = require('../models/data/subject');

// TEST ROUTES ===================================================

app.route('/api/test/')
    // get all of the tests    
    .get(function(req,res){
        // console.log(' get all tests ', req.isAuthenticated(), req.user._id)
        Test.find({created_by_account:req.user._account})
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    })
    // add a new test
    .post(function(req,res){
        // console.log('post a new test', req.body)
            var test = new Test();

            // console.log('fish through this to get data', req.body);
            test.name = req.body.name;

            test.created_by_user = req.body.created_by._id;
            test.created_by_account = req.body.created_by.account;

            // console.log('user account - test add route', req.user._account);

            // later, we will be building playlists
            // sessions should store tests but tests 
            // don't need to know they belong to any playlist specially.
            // sessions should store their own ordering data, etc.

            if(test._session){
                test._session = req.body._session;
            }
            
            test.save(function(err, test){
                if(err){res.send(err);}
                
                res.json(test);

            });
        });


app.route('/api/test/:_id')
    .get(function(req,res){
        // get one test

        Test.findById(req.params._id)
            .populate('_tasks')
            .exec(function(err,test){
                if(err){res.send(err);}

                // console.log('single test', test)
                res.json(test);
        });        
    })
    // Duplicate a test with new steps and things but which appears to be identical
    .post(function(req,res){
        // console.log('touched dupe test',req.params._id, req.body);
        var obj = {};
        var reply = {};

        var promise = Test.findById(req.params._id).populate({path:'_tasks'}).exec();

        promise.then(function(org_test){
            // console.log('test duped', org_test._id);
            obj = org_test;

            var update = {
                created_by_account : org_test.created_by_account,
                created_by_user : org_test.created_by_user,
                desc    : org_test.desc,
                link    : org_test.link,
                name    : org_test.name,
                platform: org_test.platform,
                kind    : org_test.kind
            };

            return Test.create(update, function(err, test){
                if (err){console.log(err);}
                // console.log(test._id);
            });
        })
        .then(function(new_test){
            // console.log('test duped step 2', new_test._id, obj._id);
            reply.new_test = new_test._id;

            if (obj._tasks){
                // console.log('obj._tasks.length', obj._tasks.length);
                async.each(obj._tasks, function(task){
                    // console.log('async task',task);
                    var make =  {
                        desc : task.desc,
                        index : task.index,
                        name : task.name,
                        _test : new_test._id
                    };

                    Task.create(make, function(err, task){
                        if (err){ console.log(err); }
                        
                        var update = { $push : { _tasks : task._id } }; 
                        // console.log('new_test._id', new_test._id);
                        Test.findOneAndUpdate({'_id' : new_test._id}, update, function(err, test){
                            // console.log(test._id);
                        });
                    });
                });
            }
        })
        .then(function(){
            // console.log('test duped - last step');
            Test.findById(reply.new_test).exec(function(err, test){
                res.json(test);
            });
        });
    })
    // update one test with new information
    .put(function(req,res){
        console.log('touched test put', req.body)
        var t = req.body;
        // console.log(test);

        // Get the tasks so we can update their collected indices.
        var tasks = [];

        if(t._tasks){
            tasks = _.pluck(t._tasks, '_id');
            console.log('tasks from updated test', tasks);
            // console.log('unplucked _tasks', t._tasks);
            async.each(t._tasks, function(task){
                Task.findOneAndUpdate(
                    {'_id':task._id},
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
            // console.log('found', doc);
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

        // console.log('delete this test', req.params._id)

        Test.find({_id:req.params._id})
            .remove(function(err){
                if (err) {res.send(err);}
            });

        Task.find({_test:req.params._id})
            .remove(function(err){
                if (err) {res.send(err);}
            });

        Message.find({_test:req.params._id})
            .remove(function(err){
                if (err) {res.send(err);}
            });

        Tag.find({_test:req.params._id})
            .remove(function(err){
                if (err) {res.send(err);}
            });

        res.json('test removed', req.params._id);

    });
};