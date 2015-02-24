// complete-test.js
// Finish a test and post its relevant parts
'use strict';

module.exports = function(test_id, next){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models =====================
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// FINISH THE TEST AND POST CHANGES =======================
    
     async.parallel({
        // on post:
        // add subject to tests that have been updated with that subject
        // add subject to tasks that have been updated with that subject
        // add tests to subject that has been part of that test

                subject:function(callback){
                    // is this ever used?
                    Subject.findById(req.body.subject)
                        .exec(function(err, doc){
                            
                            if(!doc){
                                callback(null, null);
                            }

                            doc._tests = req.body.tests;
                            doc.save(function(err,data){
                                if(err){console.log(err);}
                                callback(null, data);
                            });
                        });
                },
                test:function(callback){
                    // for each test
                    // add a subject to that test if it has run.

                    async.map(req.body.tests,
                        // MAP OBJ TO TEST _ID, YOU ARE WORKING ON THIS
                        function(test, callback){
                            Test.findById(test, function(err, doc){
                                if(!doc){
                                    callback(null, null);
                                }

                                if(doc._subjects.indexOf(req.body.subject) === -1){
                                    doc._subjects.push(req.body.subject);
                                }

                                doc.save(function(err, data){
                                    if(err){console.log(err);}
                                    callback(null, data);
                                });

                            });
                        },
                        function(err, results){
                            callback(null, results);
                        });
                },
                tasks:function(callback){
                    // for each task in a run test
                    // if a subject has hit that task,
                    // push the subject to its subject array
        
                    async.map(req.body.tasks, 
                        function(task, callback){
                            Task.findById(task, function(err, doc){
                                if(!doc){
                                    callback(null, null);
                                }

                                if(doc._subjects.indexOf(req.body.subject) === -1){
                                    doc._subjects.push(req.body.subject);
                                }

                                doc.save(function(err, data){
                                    if(err){console.log(err);}
                                    callback(null, data);
                                });
                            });
                        },
                        function(err, results){
                            if(err){ console.log(err); }
                            
                            callback(null, results);
                        });
                }
            }, 
            function(err, results){
                if(err){ console.log(err); }
                next( null, results);
            });
        });

};


           