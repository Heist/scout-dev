// default-tests-new.js - generates first-time signup tests
'use strict';

module.exports = function(account, id, callback){
// on first login via signup, create a test for this user.

// Module dependencies
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _        = require('lodash');
    var Bluebird = require('bluebird');
    var models   = Bluebird.promisifyAll(require('../../models'));
    var makeTests    = require('../../models/functions/default-test-object');


    var modelSave  = function(mongooseModel){
        return new Bluebird(function (resolve, reject) {
            mongooseModel.save(function(err,done) {
              if (!done || done.error) {return reject(done.error);}
              return resolve(done);
            })
        })
    }
    
    var tests = makeTests(account, id);

    var createTests = function(testObject){
        return Bluebird.map(tests, function(n){
            var test = new models.Test(n.test);
            return test;
        });
    }

// Abstract and create tests 

    // in parallel:

    // Create a test for each
    // inside the test, create tasks for that test, setting their _test to test._id and index to $index
    // this works but returns undefin

    Bluebird.map(tests, function(n){
        var test =  new models.Test(n.test);
        var subjects;
        // TODO: in here, create all of the subjects in the test
        // subjects must be created with a _test 
        // set them to the variable subject
        return Bluebird.map(n.subjects, function(n){
                n.name  = n;
                n._test = test._id;

                var subj = new models.Subject(n);
                return modelSave(subj);
        }).then(function(subjectArray){
            subjects = subjectArray;

            return Bluebird.all([
               Bluebird.map(n.tags, function(tag, i){
                    var t = new models.Tag({
                            name      : tag,
                            nameCheck : tag.toLowerCase(),
                            _test     : test._id
                        });
                    test._tags.push(t._id);

                    return modelSave(t);
                }),
                Bluebird.map(n.tasks, function(task, i){
                        task._test = test._id;
                        task.index = i

                        var t = new models.Task(task);
                        test._tasks.push(t._id);

                        // TODO: in here, get the subject id from the subjects array
                        // _.filter(subjects, function(n){  return n.name === message.name  })
                        // then create a message-new for every message in the messages array for the task
                        // then return the saved task in the then step
                        Bluebird.map(n.tasks._messages, function(note){

                            return modelSave(t);
                        })
                })
            ]).then(function(array){
                // console.log('is test still set?', test);

                return modelSave(test);
            })
        }).then(function(testArray){
            // aight, did the tests get made?
            console.log('testArray length', testArray.length);



        }).then(function(messagedTest){
            // okay we've posted messages here.
            callback(null, 'true');
        }).catch(function(err){
            if(err){console.log(err);}
        });
    })
}