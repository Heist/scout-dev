// dev_tests.js - generates first-time signup tests
'use strict';

module.exports = function(account, id){
    // on first login via signup, create a test for this user.
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
        desc : "- Pew\n"+
               "- Rub face on everything.\n",
        kind : "interview"
    };


    async.waterfall([
        function(callback){
            Test.create(test , function(err, test){
                var tasks = [
                    {
                        _test : test._id,
                        name  :"Task 1",
                        desc  :"Chase ball of string and scratch the furniture and always hungry. \n- Nap all day.",
                        index : 0
                    }, {
                        _test : test._id,
                        name  : "Task 2",
                        desc  : "Sunbathe climb the curtains run hiss purr. \n- Puking I don't like that food claw scratched eat.",
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
                                done(null, saved);
                            });
                        });
                },
                tasks: function(done){
                    async.map(arg.test._tasks,
                        function(task, yeah){
                            Task.findOne(task)
                                .exec(function(err, item){
                                    item._subjects.push(arg.subject._id);
                                    item.save(function(err, saved){
                                        yeah(null, saved);
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
            // console.log('messages need a test', arg.test._id);
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

                    var output = {
                        task1 : [d0._id, d1._id, d2._id],
                        task2 : [d3._id, d4._id, d5._id],
                        yellow: [d0._id, d1._id, d2._id, d3._id, d4._id, d5._id],
                        blue: [d0._id,d1._id,d3._id,d4._id],
                        green: [d0._id,d3._id],
                        subject: arg.subject,
                        test: arg.test,
                        tasks: arg.tasks
                    };
                   
                    callback(null, output);
                });
        },
        function(arg, callback){
            async.parallel([
                function(callback){
                    arg.subject._messages = arg.yellow;
                    arg.subject.save(function(err, subject){
                        if (err) { console.log(err); }
                        callback(null, subject);
                    });
                },
                function(callback){                    
                    arg.tasks[0]._messages = arg.task2;
                    arg.tasks[0].save(function(err,data){
                        if (err) { console.log(err); }
                        callback(null, data);
                    });
                },
                function(callback){                    
                    arg.tasks[1]._messages = arg.task2;
                    arg.tasks[1].save(function(err,data){
                        if (err) { console.log(err); }
                        callback(null, data);
                    });
                },
                function(callback){
                    Tag.findOneAndUpdate(
                        {'name': 'yellow'},
                        {'_messages': arg.yellow },
                        { upsert: true },
                        function(err, data){
                            callback(null, data);
                        });
                },
                function(callback){
                    Tag.findOneAndUpdate(
                        {'name': 'blue'},
                        {'_messages': arg.blue },
                        { upsert: true },
                        function(err, data){
                            callback(null, data);
                        });
                },
                function(callback){
                    Tag.findOneAndUpdate(
                        {'name': 'green'},
                        {'_messages': arg.green },
                        { upsert: true },
                        function(err, data){
                            console.log('green', data);
                            callback(null, data);
                        });
                }
            ], 
            function(err, results){ 
                callback(null, { test : arg.test });
            });
        }
    ], 
    function(err, results){
        // in here we return A TEST.
        console.log(results);
        return results; 
    });
};