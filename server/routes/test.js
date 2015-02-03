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
var Session = require('../models/data/session');
var Subject = require('../models/data/subject');

// var DevTest = require('../models/functions/dev_tests.js');

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

            console.log('fish through this to get data', req.body);

            test.created_by_user = req.body.created_by._id;
            test.created_by_account = req.body.created_by.account;
            
            test.save(function(err, test){
                if(err){res.send(err);}
                res.json(test);
            });
        });

app.route('/api/test/dev_tests/')
    .post(function(req, res){
        
        async.waterfall([
            function(callback){
                // var dev = new DevTest(req.user._account, req.user._id);
                var test = {
                    created_by_account: req.user._account,
                    created_by_user : req.user._id,
                    name : "DeveloperTest",
                    desc : "- Pew\n"+
                           "- Rub face on everything.\n",
                    kind : "interview"
                };
                async.waterfall([
                    function(callback){
                        Test.create(test , function(err, test){
                            var tasks = [
                                {
                                    _test : test._id,
                                    name  :"Task 1",
                                    desc  :"Chase ball of string and scratch the furniture and always hungry. \n- Nap all day.",
                                    index : 0
                                }, {
                                    _test : test._id,
                                    name  : "Task 2",
                                    desc  : "Sunbathe climb the curtains run hiss purr. \n- Puking I don't like that food claw scratched eat.",
                                    index : 1
                                }
                            ];

                            Task.create(tasks, function(err, t0, t1){
                                test._tasks.push(t0._id, t1._id);
                                test.save(function(err, new_test){
                                    // console.log('new_test', new_test);
                                    callback(null, new_test);
                                });
                            });
                        });
                    }, 
                    function(arg, callback){
                        Subject.create(
                            {
                                name: 'Jane she is a cat'
                            },
                            function(err, data){
                                if (err) {console.log(err);}
                                callback(null, {test: arg, subject: data});
                            });
                    },
                    function(arg, callback){
                        async.parallel({
                            test: function(done){
                                Test.findOne({'_id' : arg.test._id})
                                    .exec(function(err, test){
                                        test._subjects.push(arg.subject._id);
                                        test.save(function(err, saved){
                                            done(null, saved);
                                        });
                                    });
                            },
                            tasks: function(done){
                                async.map(arg.test._tasks,
                                    function(task, yeah){
                                        Task.findOne({'_id' : task})
                                            .exec(function(err, item){
                                                item._subjects.push(arg.subject._id);
                                                item.save(function(err, saved){
                                                    yeah(null, saved);
                                                });
                                            });
                                    }, 
                                function(err, results){
                                    done(null, results);
                                });
                            }
                        }, 
                        function(err, results){
                            callback(null, {tasks: results.tasks, test: results.test, subject: arg.subject});
                        });
                    },
                    function(arg, callback){
                        // console.log('messages need a test', arg.test._id);
                        var arr = [
                                {
                                    body:'One #yellow #blue #green',
                                    _test: arg.test._id,
                                    _subject: arg.subject._id
                                },
                                {
                                    body:'Two #yellow #blue',
                                    _test: arg.test._id,
                                    _subject: arg.subject._id
                                },
                                {
                                    body:'Three #yellow',
                                    _test: arg.test._id,
                                    _subject: arg.subject._id
                                }
                            ];
                        // concatenate 2X arr for new arr.
                        var arr2 = arr.concat(arr);


                        Message.create( arr2,
                            function(err, d0, d1, d2, d3, d4, d5){
                                if (err) {console.log(err);} 

                                var output = {
                                    task1 : [d0._id, d1._id, d2._id],
                                    task2 : [d3._id, d4._id, d5._id],
                                    yellow: [d0._id, d1._id, d2._id, d3._id, d4._id, d5._id],
                                    blue: [d0._id,d1._id,d3._id,d4._id],
                                    green: [d0._id,d3._id],
                                    subject: arg.subject,
                                    test: arg.test,
                                    tasks: arg.tasks
                                };
                               
                                callback(null, output);
                            });
                    },
                    function(arg, callback){
                        async.parallel([
                            function(callback){
                                arg.subject._messages = arg.yellow;
                                arg.subject.save(function(err, subject){
                                    if (err) { console.log(err); }
                                    callback(null, subject);
                                });
                            },
                            function(callback){                    
                                arg.tasks[0]._messages = arg.task2;
                                arg.tasks[0].save(function(err,data){
                                    if (err) { console.log(err); }
                                    callback(null, data);
                                });
                            },
                            function(callback){                    
                                arg.tasks[1]._messages = arg.task2;
                                arg.tasks[1].save(function(err,data){
                                    if (err) { console.log(err); }
                                    callback(null, data);
                                });
                            },
                            function(callback){
                                Tag.findOneAndUpdate(
                                    {'name': 'yellow'},
                                    {'_messages': arg.yellow,
                                    '_test': arg.test._id },
                                    { upsert: true },
                                    function(err, data){
                                        callback(null, data);
                                    });
                            },
                            function(callback){
                                Tag.findOneAndUpdate(
                                    {'name': 'blue'},
                                    {'_messages': arg.blue,
                                     '_test': arg.test._id },
                                    { upsert: true },
                                    function(err, data){
                                        callback(null, data);
                                    });
                            },
                            function(callback){
                                Tag.findOneAndUpdate(
                                    {'name': 'green'},
                                    {'_messages': arg.green,
                                     '_test': arg.test._id },
                                    { upsert: true },
                                    function(err, data){
                                        callback(null, data);
                                    });
                            }
                        ], 
                        function(err, results){ 
                            callback(null, { test : arg.test });
                        });
                    }
                ], 
                function(err, results){
                    // in here we return A TEST.
                    callback(null, results);
                });                
            },
            function(arg, callback){
                
                callback(null, arg);
                // Test.find({created_by_account:results.test._account}).exec();
            }
        ], 
        function(err, results){
            console.log('route results', results);
            res.json(results.test);
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
    .post(function(req,res){
        // Duplicate a test with new steps and things but which appears to be identical
        // console.log('touched dupe test',req.params._id, req.body);
        console.log('touched individual test post');
        async.waterfall([
            function(callback) {
                Test.findById(req.params._id)
                    .populate({path:'_tasks'})
                    .exec(function(err, doc){
                        if(err){console.log(err);}
                        callback(null, doc);
                    });
            },
            function(args, callback){
                var old = args;
                var update = {
                        created_by_account : old.created_by_account,
                        created_by_user : old.created_by_user,
                        desc    : old.desc,
                        link    : old.link,
                        name    : old.name || "New Test",
                        platform: old.platform,
                        kind    : old.kind,
                        visible : 'true'
                    };

                Test.create(update, function(err, test){
                    if (err){console.log(err);}

                    callback(null, {'old' : old, 'test' : test});
                });
            },
            function(args, callback) {
                // console.log('step two', test);
                if(args.old._tasks){
                    async.map(args.old._tasks, function(task, callback){
                        // console.log('async task',task);
                        var make =  {
                            desc : task.desc,
                            index : task.index,
                            name : task.name,
                            visible : 'true',
                            _test : args.test._id
                        };

                        Task.create(make, function(err, doc){
                            if (err){ console.log(err); }
                            callback(null,doc._id);
                        });

                    }, function(err, results){
                        console.log('callback', results);
                        callback(null, {tasks: results, test: args.test});
                    });
                } else {
                    callback(null, {test: args.test});
                }
            },
            function(args, callback){
                if(args.tasks){
                    args.test._tasks = args.tasks;

                    args.test.save(function(err,test){
                        if (err){ console.log(err); }
                        callback(null, test);
                    });
                }
            }
           // down here insert the new tasks into the new test.
        ], function (err, result) {
            // console.log('end of waterfall',result);
            res.json(result);
        });
    })
    // update one test with new information
    .put(function(req,res){
        // console.log('touched test put', req.body);
        
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