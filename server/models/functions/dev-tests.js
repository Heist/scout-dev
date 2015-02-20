// dev-tests.js
// Mocks for testing routes on live
'use strict'; 

module.exports = function(account, user, next){

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');


// The promisified chain to make this a WHOLE bunch cleaner...
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

    // async.waterfall([
    //     function(callback){
    //         callback(null, 'butts');
    //     },
    //     function(args, callback){
    //         callback(null, args);
    //     }
    // ], 
    // function(err, results){
    //     next(null, results);
    // });


// Alright, run the waterfall - whcih could also be a promise chain.
    async.waterfall([
        function(callback){
            async.waterfall([
                function(callback){
                    Test.create({
                        created_by_account: account,
                        created_by_user : user,
                        name : "DeveloperTest",
                        desc : "- Pew\n"+
                               "- Rub face on everything.\n",
                        kind : "interview"
                    },
                    function(err, test){
                        var tasks = [{
                                _test : test._id,
                                name  :"Task 1",
                                desc  :"Chase ball of string and scratch the furniture and always hungry. \n- Nap all day.",
                                index : 0
                            }, 
                            {
                                _test : test._id,
                                name  : "Task 2",
                                desc  : "Sunbathe climb the curtains run hiss purr. \n- Puking I don't like that food claw scratched eat.",
                                index : 1
                            }];

                        Task.create(tasks, function(err, t0, t1){
                            test._tasks.push(t0._id, t1._id);
                            test.save(function(err, data){
                                callback(null, data);
                            });
                        });
                    });
                }, 
                function(arg, callback){
                    Subject.create({ name: 'Jane she is a cat' },
                        function(err, data){
                            if (err) { console.log(err); }
                            callback(null, {test: arg, subject: data});
                        });
                },
                function(arg, callback){
                    async.parallel({
                        test: function(done){
                            Test.findOne({'_id' : arg.test._id})
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
                                    Task.findOne({'_id' : task})
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
                    var arr = [
                            {
                                body:'One #yellow #blue #green',
                                _test: arg.test._id,
                                _subject: arg.subject._id
                            },
                            {
                                body:'Two #yellow #blue',
                                _test: arg.test._id,
                                _subject: arg.subject._id
                            },
                            {
                                body:'Three #yellow',
                                _test: arg.test._id,
                                _subject: arg.subject._id
                            }
                        ];

                    // concatenate 2X arr for an array to transcribe to messages
                    // this will create a rack of messages to put into tests.
                    var arr2 = arr.concat(arr);

                    Message.create( arr2,
                        function(err, d0, d1, d2, d3, d4, d5){
                            if (err) { console.log(err);} 

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
                                {'_messages': arg.yellow,
                                '_test': arg.test._id },
                                { upsert: true },
                                function(err, data){
                                    callback(null, data);
                                });
                        },
                        function(callback){
                            Tag.findOneAndUpdate(
                                {'name': 'blue'},
                                {'_messages': arg.blue,
                                 '_test': arg.test._id },
                                { upsert: true },
                                function(err, data){
                                    callback(null, data);
                                });
                        },
                        function(callback){
                            Tag.findOneAndUpdate(
                                {'name': 'green'},
                                {'_messages': arg.green,
                                 '_test': arg.test._id },
                                { upsert: true },
                                function(err, data){
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
                callback(null, results);
            });                
        },
        function(arg, callback){
            callback(null, arg);
        }
    ], 
    function(err, results){
        console.log('route results', results);
        next(null, results);
    });

};