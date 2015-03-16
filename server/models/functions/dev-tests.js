// dev-tests.js
// Mocks for testing routes on live
'use strict'; 

module.exports = function(account, user, next){

// Module dependencies
    var _ = require('lodash');
    var Bluebird = require('bluebird');
    var mongoose = Bluebird.promisifyAll(require('mongoose'));

    var models = Bluebird.promisifyAll(require('../../models'));
    var fn = Bluebird.promisifyAll(require('../../models/functions'));

    console.log('mocking tests .... ', account, user._id);

    var createTest = function(acct, usr){
        // this is just straight not working.
        var obj = {
                        created_by_account: acct,
                        created_by_user : usr,
                        name : "DeveloperTest",
                        desc : "- Pew\n"+
                               "- Rub face on everything.\n",
                        kind : "interview"
                    };

        return models.Test.create(obj, function(err, test){ 
                console.log(test);
                return test; 
            });
    };

    var createSubject = function(test){
        console.log('create subject devTest', test);

        var newSubject = {
            name: 'Jane she is a cat',
            test     : test
        };
        return fn.addSubject(newSubject, callback);
    }

    var createTasks = function(test){
        console.log('create tasks', test);

         var tasks = [{
            name  :"Task 1",
            desc  :"Chase ball of string and scratch the furniture and always hungry. \n- Nap all day.",
            index : 0,
            _test : test
        }, 
        {
            name  : "Task 2",
            desc  : "Sunbathe climb the curtains run hiss purr. \n- Puking I don't like that food claw scratched eat.",
            index : 1,
            _test : test
        }];

        return Bluebird.map(tasks, function(task){
            models.Task.createAsync(task, function(err, t){});
        });
    }

    var createMessages = function(subject, tasks, test, usr){
        // there will be two tasks in here
        console.log('making messages...', subject, tasks, test, usr);

        var arr = ['One #yellow #blue #green', 'Two #yellow #blue','Three #yellow'];

        var note = function(tag){
            return {
                body : tag,
                _subject : subject,
                _test : test,
                _task : task,
                user : usr
            }
        };
        
        var posterList = _.map(arr, note);

        console.log('create messages', posterList);
        // each item in array is set to be the body of the object
        // then each object is given the same message values
        // return the object array

        return Bluebird.map(arr, function(msg){ 
                fn.messageNew(msg, function(err, msg){});
            })
    }

    var mockTest = function(acct, usr){
        return createTest(acct, usr)
        .then(function(test){
            console.log('test');
            return Bluebird.all([
                createTasks(test),
                createSubject(test)
                ])
        }).then(function(array){
            console.log(array);
        }).then(function (error) {
              console.log(error)
            });
    };

    // return createTest(account, user._id);
    return mockTest(account, user._id);
};
             