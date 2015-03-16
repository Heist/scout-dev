// dev-tests.js
// Mocks for testing routes on live
'use strict'; 

module.exports = function(account, user, next){

// Module dependencies
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

    var models = require('../../models');

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


// Alright, run the waterfall - whcih could also be a promise chain.
    async.waterfall([
        function(callback){
            async.waterfall([
                function(callback){
                    models.Test.create({
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

                        models.Task.create(tasks, function(err, t0, t1){
                            test._tasks.push(t0._id, t1._id);
                            test.save(callback);
                        });
                    });
                }, 
                function(arg, callback){
                    models.Subject.create({ name: 'Jane she is a cat' },
                        function(err, data){
                            if (err) { console.log(err); }
                            callback(null, {test: arg, subject: data});
                        });
                },
                function(arg, callback){
                    async.parallel({
                        test: function(done){
                            models.Test.findOne({'_id' : arg.test._id})
                                .exec(function(err, test){
                                    test._subjects.push(arg.subject._id);
                                    test.save(done);
                                });
                        },
                        tasks: function(done){
                            async.map(arg.test._tasks,
                                function(task, yeah){
                                    models.Task.findOne({'_id' : task})
                                        .exec(function(err, item){
                                            item._subjects.push(arg.subject._id);
                                            item.save(function(err, saved){
                                                yeah(null, saved);
                                            });
                                        });
                                }, done );
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

                    models.Message.create( arr2,
                        function(err, d0, d1, d2, d3, d4, d5){
                            if (err) { console.log(err);} 

                            // TODO: Something in here is rotten because
                            // Tags cross-delete between tests when deleting OR creating a NEW test
                            // They also persist their visibility, which should not be.

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
                            arg.subject.save(function(callback);
                        },
                        function(callback){                    
                            arg.tasks[0]._messages = arg.task2;
                            arg.tasks[0].save(callback);
                        },
                        function(callback){                    
                            arg.tasks[1]._messages = arg.task2;
                            arg.tasks[1].save(callback);
                        },
                        function(callback){
                            // this needs to be by test and tag.
                            // test issss...
                            models.Tag.findOneAndUpdate(
                                {'name': 'yellow', '_test' : arg.test._id },
                                {'_messages': arg.yellow,
                                '_test': arg.test._id },
                                { upsert: true },
                                callback
                                );
                        },
                        function(callback){
                            models.Tag.findOneAndUpdate(
                                {'name': 'blue', '_test' : arg.test._id },
                                {'_messages': arg.blue,
                                 '_test': arg.test._id },
                                { upsert: true },
                                callback);
                        },
                        function(callback){
                            models.Tag.findOneAndUpdate(
                                {'name': 'green', '_test' : arg.test._id },
                                {'_messages': arg.green,
                                 '_test': arg.test._id },
                                { upsert: true }, callback );
                        }
                    ], 
                    function(err, results){ 
                        models.Test.findOne({'_id':arg.test._id})
                        .populate('_messages _subjects _tasks')
                        .exec(function(err,test){
                            callback(null, { test : test });
                        });
                    });
                }
            ], callback );                
        },
        function(arg, callback){
            callback(null, arg);
        }
    ], 
    function(err, results){
        next(null, results.test);
    });

};