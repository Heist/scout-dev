// dev_tests.js - generates first-time signup tests
'use strict';

module.exports = function(account, id){
    // on first login via signup, create a test for this user.
    console.log('new signup');

    var Test    = require('../data/test');
    var Task    = require('../data/task');
    var Tag     = require('../data/tag');

    var Message = require('../data/message');
    var Subject = require('../data/subject');
    

    var async   = require('async');
    var _ = require('underscore');

    var test = {
        created_by_account: account,
        created_by_user : id,
        name : "DeveloperTest",
        desc : "Pew\n"+
               "Rub face on everything.\n",
        kind : "interview"
    };


    async.waterfall([
        function(callback){
            Test.create(test , function(err, test){
                var tasks = [
                    {
                        _test : test._id,
                        name  :"Task 1",
                        desc  :"Chase ball of string and scratch the furniture and always hungry. \n Nap all day.",
                        index : 0
                    }, {
                        _test : test._id,
                        name  : "Task 2",
                        desc  : "Sunbathe climb the curtains run hiss purr, \n puking I don't like that food claw scratched eat. ",
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
            async.parallel([
                function(arg, callback){
                    Test.findOne(arg.test._id)
                        .exec(function(err, test){
                            test._subjects.push(arg.subject._id);
                            test.save(function(err, saved){
                                callback(null, saved);
                            });
                        });
                },
                function(arg, callback){
                    Task.find('_test', arg.test._id)
                        .exec(function(err, tasks){
                            async.map(tasks,
                                function(task){
                                    task._subjects.push(arg.subject._id);
                                    task.save(function(err, saved){
                                        callback(null, saved);
                                    });
                                }, 
                                function(err, results){
                                    callback(null, results);
                                });
                        });
                }
            ], 
            function(err, results){
                callback(null, results);
            });
        },
        function(arg, callback){
            var arr = [
                    {
                        body:'note #yellow #blue #green',
                        _test: arg.test._id,
                        _subject: arg.subject._id
                    },
                    {
                        body:'note #yellow #blue',
                        _test: arg.test._id,
                        _subject: arg.subject._id
                    },
                    {
                        body:'note #yellow',
                        _test: arg.test._id,
                        _subject: arg.subject._id
                    }
                ];

            Message.create(
                arr, 
                function(err, d0, d1, d2){
                    if (err) {console.log(err);} 
                    var pusher = [d0, d1, d2];
                    callback(null, {msg_arr: pusher, subject: arg.subject, test: arg.test});
                });
        },
        function(arg, callback){
            var arr = _.pluck(arg.msg_arr, '_id');
            arg.subject._messages = arr;
            arg.subject.save(function(err, subject){
                if (err) {console.log(err);}
                callback(subject);
            });
        }
    ],
    function(err, results){
        console.log(results);
        return results;
    });
};