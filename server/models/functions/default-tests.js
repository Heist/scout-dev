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
                created_by_account: n.created_by_account,
                created_by_user : n.created_by_user,
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
            var make = {
                name  : m,
                _test : test._id
            }
            var subj = new models.Subject(make);
            return modelSave(subj);
        })
    }


    var createMessages = function(task, taskMessages, subjects){
        return Promise.map(taskMessages, function(msg, i){
                var sub = _.filter(subjects, function(s){
                    return s.name === msg.name;
                })

                return fn.messageNew({
                    body     : msg.body,
                    _subject : sub._id,
                    _test    : task._test,
                    _task    : task._id
                });
        })
    }

    var createTasks = function(test, testTasks, subjects){
        return Promise.map(testTasks, function(task, i){
                        task._test = test._id;
                        task.index = i

                        var t = new models.Task(task);
                        test._tasks.push(t._id);

                        return modelSave(t).then(function(savedTask){
                            return createMessages(savedTask, task._messages, subjects);
                        });
                })
    }

    var createTags = function(test, testTags){
       return Promise.map(testTags, function(tag, i){
                var t = new models.Tag({
                        name      : tag,
                        nameCheck : tag.toLowerCase(),
                        _test     : test._id
                    });
                test._tags.push(t._id);

                return modelSave(t);
            })   
    }

// Create Tests ===========================================
    createTests(tests).then(function(testArray){
        // Here, tests is globally tests.
        console.log('made it to TestArray', testArray.length);
        return Promise.map(testArray, function(test){
            // now we are in a single test
            console.log(test.name);
            var data = _.filter(tests, function(n){ return n.name === test.name })[0];

            return createSubjects(test, data.subjects).then(function(subjects){
                // Now subjects is available down the chain.
                console.log(subjects.length);
                Promise.all([
                        createTags(test, data.tags),
                        createTasks(test, data.tasks, subjects)
                    ])
            })
        })
    }).then(function(testsMade){
        callback(null, testsMade);
    }).catch(function(err){
        if(err){console.log(err);}
    });
}