// dev-tests.js
// Mocks for testing routes on live
'use strict'; 

module.exports = function(account, user){

// Module dependencies
    var _ = require('lodash');
    var Bluebird = require('bluebird');
    var mongoose = Bluebird.promisifyAll(require('mongoose'));
    var async = require('async');

    var models = Bluebird.promisifyAll(require('../../models'));
    var fn = Bluebird.promisifyAll(require('../../models/functions'));

    
    // 

    var createTest = function(acct, usr){
        // this is just straight not working.
        var obj = { created_by_account: acct,
                    created_by_user : usr,
                    name : "DeveloperTest",
                    desc : "- Pew\n"+
                           "- Rub face on everything.\n",
                    kind : "interview"
                };

        return models.Test.create(obj, function(err, test){
                return test; 
            });
    };

    var createSubject = function(test){
        var obj = { name  : 'Jane she is a cat',
                    _test : test };

        return models.Subject.create(obj, function(err, s){})
                .then(function(s){
                    return Bluebird.all([
                        models.Test.findOneAndUpdate({'_id' : test}, {'last_run' : new Date(), $push : { _subjects : s._id }}, function(err, obj){}),
                        s
                    ])
                })
                .then(function(array){
                    return array[1];
                });
    }

    var createTasks = function(test, subject){
         var tasks = [{
            name  :"Task 1",
            desc  :"Chase ball of string and scratch the furniture and always hungry. \n- Nap all day.",
            index : 0,
            _test : test,
            _subjects : [subject]
        }, 
        {
            name  : "Task 2",
            desc  : "Sunbathe climb the curtains run hiss purr. \n- Puking I don't like that food claw scratched eat.",
            index : 1,
            _test : test,
            _subjects : [subject]
        }];

        return Bluebird.map(tasks, function(task){
            var rt = {};
            return  models.Task.create(task, function(err, t){ 
                // if(err){console.log('task make err', err) }
                    })
                    .then(function(t){
                        rt = t;
                        return models.Test.findOneAndUpdate({'_id' : test}, {'last_run' : new Date(), $push : { _tasks : t._id }}, function(err, obj){})
                    }).then(function(t){
                        return rt;
                    });
        });
    }

    var createMessagesList = function(subject, task, test, usr){
        // there will be two tasks in here
        var arr = ['One #yellow #blue #green', 'Two #yellow #blue','Three #yellow'];

        var posterList =  function( m, s, ta, t, u){
                   return Bluebird.map(m, function(msg){
                            return {
                                    body : msg,
                                    _subject : s,
                                    _test : t,
                                    _task : task,
                                    user : u
                                }
                        });
        }
        
        return posterList(arr, subject, task, test, usr)
                    .then(function(array){
                        return array;
                    });
    }

    var mockTest = function(acct, usr){
        var t = {};
        // console.log('mocking', acct, usr)
        return createTest(acct, usr)
            .then(function(test){
                // 
                t.test = test._id;
                return createSubject(t.test);
            }).then(function(subject){
                // 
                return createTasks(t.test, subject._id);
            }).then(function(tasks){
                // 
                return Bluebird.map(tasks, function(task){
                    return createMessagesList(task._subjects[0], task._id, t.test, usr);
                });
            }).then(function(messageList){
                // 
                var list = _.flatten(messageList);
                return Bluebird.map(list, function(msg){
                    return fn.messageNew(msg, msg.user)
                 });
            }).then(function(end){
                return end;
            })
    };

    return mockTest(account, user._id);
};
             