// default-tests-new.js - generates first-time signup tests
'use strict';

module.exports = function(account, id, callback){
// on first login via signup, create a test for this user.

// Module dependencies
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _        = require('lodash');
    var Promise  = require('bluebird');
    var models   = Promise.promisifyAll(require('../../models'));
    var fn       = require('../../models/functions');
    var tests    = fn.defaultTestData(account, id);

    console.log('did tests load properly?', tests.length);

    var modelSave  = function(mongooseModel){
        return new Promise(function (resolve, reject) {
            mongooseModel.save(function(err,done) {
              if (!done || done.error || err) {
                console.log(err);
                return reject(done.error);}
              return resolve(done);
            })
        })
    }

    var createTests = function(testObject){
        return Promise.map(testObject, function(n){
            var t = new models.Test({
                name : n.name,
                created_by_account: account,
                created_by_user : id,
                desc : n.desc,
                kind : n.kind,
                link : n.link,
                summary : n.summary
            });
            return modelSave(t);
        });
    }

    var createSubjects = function(test, testSubjects){
        console.log(testSubjects, test._id);
        return Promise.map(testSubjects, function(m){
            var subj = new models.Subject({
                                name  : m,
                                _test : test._id
                            });

            return modelSave(subj);
        })
    }


    var createMessages = function(task, taskMessages, subjects){
        // console.log('subjects, one of which is undefined', subjects);
        return Promise.map(taskMessages, function(msg, i){
            
            var sub = _.filter(subjects, function(s){ return s.name === msg._subject; })[0];

            return fn.messageNew({
                body     : msg.body,
                _subject : sub._id,
                _test    : task._test,
                _task    : task._id
            }, id);
        })
    }

    var createTasks = function(test, testTasks, subjects){
        return Promise.map(testTasks, function(task, i){
            var t = new models.Task({
                _test : test._id,
                index : i,
                name  : task.name,
                desc  : task.desc,
                created_by_user : id
            });

            return modelSave(t)
        })
    }

    var createTags = function(test_id, testTags){
       return Promise.map(testTags, function(tag, i){
                var t = new models.Tag({
                        name      : tag,
                        nameCheck : tag.toLowerCase(),
                        _test     : test_id
                    });
                return modelSave(t);
            })   
    }

    var updateTestWithTagsTasks = function(test_id, tags, tasks){
        console.log('did we make it in?', test_id)
        return models.Test.findOne({_id : test_id}).exec().then(function(test){

            var tagUpdate  = _.pluck(tags, '_id');
            var taskUpdate = _.pluck(tasks, '_id');
            
            console.log('tags and tasks inside test save', tagUpdate, taskUpdate);
            test._tags  = tagUpdate;
            test._tasks = taskUpdate;
            return modelSave(test);
        })
    }

// Create Tests ===========================================
    createTests(tests)
    .then(function(testArray){
        // Here, tests is globally tests.
        
        return Promise.map(testArray, function(test){
            // now we are in a single test
            console.log('do we have a user who owns this?', test.created_by_user);
            var data = _.filter(tests, function(n){ return n.name === test.name })[0];

            return createSubjects(test, data.subjects).then(function(subjects){
                // Now subjects is available down the chain.
                
                return Promise.all([
                        createTags(test._id, data.tags),
                        createTasks(test, data.tasks, subjects)
                    ])
            }).then(function(array){
                return updateTestWithTagsTasks(test._id, array[0], array[1] );
            })
        })
    }).then(function(savedArray){
        console.log('did we save tests?', savedArray.length);
        callback(null, savedArray);
    }).catch(function(err){
        if(err){console.log(err);}
    });
}