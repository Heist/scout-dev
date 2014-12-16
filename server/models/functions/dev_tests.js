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
            async.parallel({
                test: function(done){
                    Test.findOne(arg.test._id)
                        .exec(function(err, test){
                            test._subjects.push(arg.subject._id);
                            test.save(function(err, saved){
                                done(null, saved._id);
                            });
                        });
                },
                tasks: function(done){
                    console.log('parallel', arg.test._tasks);
                    async.map(arg.test._tasks,
                        function(task, yeah){
                            Task.findOne(task)
                                .exec(function(err, item){
                                    item._subjects.push(arg.subject._id);
                                    item.save(function(err, saved){
                                        yeah(null, saved._id);
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
            console.log('waterfall', arg);
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
            // concatenate 2X arr for new arr.
            var arr2 = arr.concat(arr);

            Message.create( arr2,
                function(err, d0, d1, d2, d3, d4, d5){
                    if (err) {console.log(err);} 
                    var pusher1 = [d0, d1, d2];
                    var pusher2 = [d3, d4, d5];
                    callback(null, {msg_arr1: pusher1, msg_arr2: pusher2, subject: arg.subject, test: arg.test, tasks: arg.tasks});
                });
        },
        function(arg, callback){
            console.log('parallel tasks', arg.tasks);
            var arr1 = _.pluck(arg.msg_arr1, '_id');
            var arr2 = _.pluck(arg.msg_arr2, '_id');
            var arr3 = arr1.concat(arr2);
            
            // now in here, push the appropriate messages to the subject
            // then the messages to the tasks
            async.parallel([
                function(callback){
                    arg.subject._messages = arr3;
                    arg.subject.save(function(err, subject){
                        if (err) {console.log(err);}
                        callback(null, subject);
                    });
                },
                function(callback){
                    async.map(arg.tasks, 
                        function(task, callback){
                            Task.findOne({'_id': task})
                                .exec(function(err, task){
                                    task._messages=arr1;
                                    task.save(function(err, data){
                                        if (err) {console.log(err);}
                                        callback(null, data);
                                    });
                                });
                        }, 
                        function(err, results){
                            callback(null, results);
                        });
                }
            ], 
            function(err, results){
                // results are subject, task, task.
                console.log('parallel', results);
                callback(null, results);
            });
        }
    ],
    function(err, results){
        console.log(results);
        return results;
    });
};