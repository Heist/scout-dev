// dev-tests.js
// Mocks for testing routes on live
'use strict'; 

module.exports = function(account, user, next){

// Module dependencies
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Bluebird = require('bluebird');
    var fn = require('../../models/functions');

    var models = Bluebird.promisifyAll(require('../../models'));

    var tasks = [{
            name  :"Task 1",
            desc  :"Chase ball of string and scratch the furniture and always hungry. \n- Nap all day.",
            index : 0
        }, 
        {
            name  : "Task 2",
            desc  : "Sunbathe climb the curtains run hiss purr. \n- Puking I don't like that food claw scratched eat.",
            index : 1
        }];

    var createSubject = function(test){
        var newSubject = {
            name: 'Jane she is a cat',
            test     : test
        };

        return fn.addSubject(newSubject, callback);
    }

    var createTest = function(account, user){
        return models.Test.create({
                        created_by_account: account,
                        created_by_user : user,
                        name : "DeveloperTest",
                        desc : "- Pew\n"+
                               "- Rub face on everything.\n",
                        kind : "interview"
                    });
    }

    var createTasks = function(tasks, test){
        return Bluebird.map(tasks, function(task){
            models.Task.create(task, function(err, t){});
        });
    }

    var createMessages = function(subject, task, test, user){
        var arr = ['One #yellow #blue #green', 'Two #yellow #blue','Three #yellow'];

        var note = function(tag){
            return {
                body : tag,
                _subject : subject,
                _test : test,
                _task : task,
                user : user
            }
        };
        
        var posterList = _.map(arr, note);

        console.log(posterList);
        // each item in array is set to be the body of the object
        // then each object is given the same message values
        // return the object array

        return Bluebird.map(arr, function(msg){ 
                fn.messageNew(msg, function(err, msg){});
            })
    }

    var mockTest = function(){
        return createTest({}).then({
            return createTasks({}).then({
                return createSubject({}).then({
                    return createMessages({})
                })
            })
        }).catch(function (error) {
              console.log(error)
            });
    };

// The promisified chain to make this a WHOLE bunch cleaner...
// https://gist.githubusercontent.com/artcommacode/45c85e867d1bd1f3c1bb/raw/gistfile1.js
// var tasks = [{
//   name: "Task 1",
//   desc: "Chase ball of string and scratch the furniture and always hungry. \n- Nap all day."
// }, {
//   name: "Task 2",
//   desc: "Sunbathe climb the curtains run hiss purr. \n- Puking I don't like that food claw scratched eat."
// }]
// var createTest = Promise.promisify(Test.create, Test)
// var createTask = Promise.promisify(Task.create, Task)
// var saveTest = Promise.promisify(test.save, test)

// createTest(test).then(function (test) {
//   return Promise.all(tasks.map(function (task) {
//     task._test = test._id
//     return createTask(task)
//   })).then(function (tasks) {
//     test._tasks.concat(tasks)
//     return saveTest(test)
//   })
// }).then(function (test) {
//   console.log('done')
// }).catch(function (error) {
//   console.log(error)
// })
             