// account_export.js
'use strict';

// A function to export your entire account, called in the Public Routes file.
// Eventually, this will supply your tests, with their themes, which call
// Messages as related to their subjects into a JSON file.


module.exports = function(account, callback, debug){ 
    //Module dependencies
    var mongoose = require('mongoose');  // SOMETIMES WE NEED OBJECTIDS
    var _ = require('lodash');
    var async = require('async');

    // load data storage models
    var models = require('../../models');

    // get all users who have the same account number as this user
    // get all tests with that account number
    // populate that test with tasks and messages
    // populate that test with tags and messages

    async.parallel({
        users: function(callback){
            models.User.find({'_account': account })
                .select('name local.email')
                .exec(function(err, data){
                    if(err){console.log(err);}
                    callback(null, data);
                });
        },
        tests: function(callback){
            async.waterfall([
                function(callback){
                    models.Test.find({'created_by_account' : account})
                        .populate('created_by_user')
                        .select('name platform desc updated created created_by_user')
                        .exec(function(err, data){
                            if(err){console.log(err);}
                            // console.log(data.length);
                            callback(null,data);
                        });
                },
                function(args, callback){
                    async.map(args, 
                        function(arg, callback){
                            async.parallel({
                                test: function(callback){
                                    callback(null, arg);   
                                },
                                tasks: function(callback){
                                    models.Task.find({'_test' : arg._id})
                                    .populate('_test _messages')
                                    .select('_messages created desc name pass_fail index report_index updated visible ')
                                    .exec(function(err, data){
                                        if(err){console.log(err);}
                                        // for each task
                                        // find all messages
                                        // for each message
                                        // find all comments,
                                        // replace the message in the task with a commented message in the task.

                                        async.map(data,
                                        function(obj, callback){
                                            if(obj._messages){
                                                async.map(obj._messages, 
                                                    function(msg, callback){
                                                        // if a message exists, find it, populate it, and return it.
                                                        models.Message.findOne({'_id':msg._id})
                                                            .populate('_comments')
                                                            .exec(function(err, data){
                                                                if(err){console.log(err);}
                                                                callback(null, data);
                                                            });
                                                    },
                                                    function(err, results){
                                                        if(err){console.log(err);}
                                                        // these results are your populated, commented messages.
                                                        obj._messages = '';
                                                        obj._messages = results;
                                                        callback(null, obj._messages);
                                                    });
                                            } else {
                                                // No messages? Just pass back the object.
                                                callback(null, obj);
                                            }
                                        }, callback);
                                    });
                                }, 
                                tags: function(callback){
                                    models.Tag.find({'_test' : arg._id})
                                        .populate('_test _messages')
                                        .exec(function(err, data){
                                                if(err){console.log(err);}
                                                // for each task
                                                // find all messages
                                                // for each message
                                                // find all comments,
                                                // replace the message in the task with a commented message in the task.

                                                async.map(data,
                                                function(obj, callback){
                                                    if(obj._messages){
                                                        async.map(obj._messages, 
                                                            function(msg, callback){
                                                                // if a message exists, find it, populate it, and return it.
                                                                models.Message.findOne({'_id':msg._id})
                                                                    .populate('_comments')
                                                                    .exec(function(err, data){
                                                                        if(err){console.log(err);}
                                                                        callback(null, data);
                                                                    });
                                                            },
                                                            function(err, results){
                                                                if(err){console.log(err);}
                                                                // these results are your populated, commented messages.
                                                                obj._messages = '';
                                                                obj._messages = results;
                                                                callback(null, obj._messages);
                                                            });
                                                    } else {
                                                        // No messages? Just pass back the object.
                                                        callback(null, obj);
                                                    }
                                                }, callback);
                                            });        
                                }
                            }, callback);
                        }, callback);
                },
            ], callback);
        }
    }, callback);  
};