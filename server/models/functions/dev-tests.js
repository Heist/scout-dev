// dev-tests.js
// Mocks for testing routes on live
'use strict'; 

module.exports = function(account, user, next){

// Module dependencies
    var _ = require('lodash');
    var Bluebird = require('bluebird');
    var mongoose = Bluebird.promisifyAll(require('mongoose'));
    var async = require('async');

    var models = Bluebird.promisifyAll(require('../../models'));
    var fn = Bluebird.promisifyAll(require('../../models/functions'));

    console.log('mocking tests .... ', account, user._id);

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
        console.log('create subject devTest', test);
        
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

    var createTasks = function(test){
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
            return models.Task.create(task, function(err, t){ 
                return t;
            });
        });
    }

    var createMessages = function(subject, tasks, test, usr){
        // there will be two tasks in here
        var arr = ['One #yellow #blue #green', 'Two #yellow #blue','Three #yellow'];
        var tasks = _.pluck(tasks, '_id');

        var posterList =  function( m, s, ta, t, u){
                return  _.map(ta, function(task){
                   return _.map(m, function(msg){
                            // return
                            return {
                                    body : msg,
                                    _subject : s,
                                    _test : t,
                                    _task : task,
                                    user : u
                                }
                        });
                });
        }
        
        var list = posterList(arr, subject, tasks, test, usr);
        list = list[0].concat(list[1]);
        console.log(list.length);


        return Bluebird.map(list,
            function(msg){
                return fn.messageNew(msg, usr, function(err, message){
                    if(err){console.log(err);}
                    console.log('new', message); // this is fine
                    return message; // this returns nothing
                })
            });

    }

    var mockTest = function(acct, usr){
        return createTest(acct, usr).then(function(test){ 
            return Bluebird.all([
                    createSubject(test._id), 
                    createTasks(test._id) 
                ]).then(function(arr){
                    console.log(arr[0]._id, arr[1].length, arr[0]._test[0], usr);
                    return createMessages(arr[0]._id, arr[1], arr[0]._test[0], usr, 
                        function(err, obj){ 
                            if(err){console.log(err);} 
                            console.log('create messages', obj); 
                            return obj; })
                    .then(function(next){
                        if(error){console.log(error);}
                        console.log('messages', messages);
                        return messages;
                    })
                })
        }).then(function(err){
            if(err){console.log(err)}
        });// grab errors here)
    };

    return mockTest(account, user._id);
};
             