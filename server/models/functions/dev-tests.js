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
    
    var msgArr = [ 'One #yellow #blue #green', 'Two #yellow #blue', 'Three #yellow' ];
    var msgArr2 = [{
                body:'One #yellow #blue #green',
                _test: test._id,
                _subject: subject._id,
                _task: task._id
            },
            {
                body:'Two #yellow #blue',
                _test: test._id,
                _subject: subject._id,
                _task: task._id
            },
            {
                body:'Three #yellow',
                _test: test._id,
                _subject: subject._id,
                _task: task._id
            }
        ];

    var createSubject = function(test){
        var newSubject = {
            name: 'Jane she is a cat',
            testroom : request.testroom,
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
        return models.Task.create(tasks, function(err, t0, t1){});
    }

    var updateWithSubject = function(){ 
        // this should push the new subject into the test and tasks.
            async.parallel({
                        
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
        }

        var createMessages = function(arr, subject, task, test, user){

            var update = {
                body : request.body,
                msg  : tags.msg,
                tags : tags.tags || null,
                _subject : request.subject,
                _test : request.test,
                _task : request.task,
                user : user
            };

            return Bluebird.map(arr, function(msg){ 
                    fn.messageNew(msg, )
                })
        }

        

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
             