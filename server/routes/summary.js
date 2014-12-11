// summary.js
'use strict';

module.exports = function (app, passport) {

    // Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('underscore');
    var async = require('async');

    // load data storage models
    var Message = require('../models/data/message');
    var Task    = require('../models/data/task');
    var Test    = require('../models/data/test');
    var Tag     = require('../models/data/tag');
    var Session = require('../models/data/session');
    var Subject = require('../models/data/subject');

// SUMMARY ROUTES ============================================

    app.route('/api/summary/:_id')
    .get(function(req, res){

        // how to populate grandchildren sub-subdocuments is in here.
        var reply = {};
        // the promise gets your main document, with its populated subs
        var promise = 
            Test.find({'_id' : req.params._id}).exec(function(err, test){
                if(err){res.send(err);}
            });

        promise.then(function(test){
            reply.test = test;
            // a promise-then pair: Then must RETURN something to the promise. Backwards chaining.
            return Task.find({'_test':req.params._id}).sort({ index: 'asc'})
                        .exec(function(err, task){
                            if (err) {console.log(err);}
                        });
        })
        .then(function(tasks){
            reply.tasks = tasks;
            return Tag.find({'_test' : req.params._id, '_messages' : {$not :{$size : 0}}}).exec();
        })
        .then(function(tags){
            reply.tags = tags;
            
            return Message.find({ '_test':{$in: [req.params._id]}})
                        .populate({path:'_subject', select: 'name' })
                        .exec();
        })
        .then(function(messages){
            reply.messages = messages;
            // console.log(messages);
            res.json(reply);
        })
        .then(null, function(err){
            if(err) {return res.send (err);}
        });
    })
    .put(function(req, res){
        console.log('touched summary put', req.body);

        async.parallel([
            function(callback){
                Test.findOneAndUpdate(
                    {'_id':req.body.test._id}, 
                    {
                        summary: req.body.test.summary,
                        report_index : req.body.test.report_index,
                        report: true
                    },
                    function(err,test){
                        if(err) {return res.send (err);}
                        callback(null,'test updated');
                    });
            },
            function(callback){
                if(req.body.tags){
                    async.map(req.body.tags, 
                        function(tag, report){
                            Tag.findOneAndUpdate(
                                {'_id' : tag._id}, 
                                {'summary': tag.summary,
                                'report_index' : tag.report_index,
                                'summarized' : tag.summarized},
                                function(err, data){
                                    if(err) {return res.send (err);}
                                    report(null, data);
                                });
                        }, 
                        function(err, results){
                            callback(results);
                        });
                } else {
                    callback(null, 'no tags');
                }
            },
            function(callback){
                if(req.body.tasks){
                    async.map(req.body.tasks, 
                        function(task, report){
                            Task.findByIdAndUpdate(
                                task._id,
                                {'pass_fail': task.pass_fail,
                                'report_index' : task.report_index,
                                'summary': task.summary },
                                function(err, data){
                                    if(err) {return res.send (err);}
                                    report(null, data);
                                });
                        }, 
                        function(err, results){
                            callback(results);
                        });
                        
                } else {
                    callback(null, 'no tasks');
                }
            },
            function(callback){
                if(req.body.messages){
                    async.map(req.body.messages, 
                        function(msg, report){
                        // console.log(msg);
                            Message.findByIdAndUpdate(
                                msg._id, 
                                { 'fav_task' : msg.fav_task,
                                'fav_tag'  : msg.fav_tag,
                                'body'  : msg.body,
                                }, 
                                function(err, data){
                                    if(err){res.send(err);}
                                    report(null, data);
                                });
                        }, 
                        function(err, results){
                            callback(results);
                        });
                } else {
                    callback(null, 'no messages');
                }
            }
        ],
        function(err, results){
            res.send("test updated - server");
        });

    });

    app.route('/api/summary/message/:_id').put(function(req,res){
        // for adding favs to messages - include messages in reports.

        var update = {
            fav_task : req.body.fav_task, 
            fav_tag : req.body.fav_tag,
        };

        Message.findOneAndUpdate({'_id' : req.params._id}, update, function(err, msg){
                        if(err){return console.log(err);}
                        res.json(msg);
                    });
    });
    app.route('/api/summary/task/').put(function(req,res){
        // batch update only tasks
        async.map(req.body.tasks, 
                function(task, callback){
                    Task.findByIdAndUpdate(
                        task._id,
                        {'pass_fail': task.pass_fail,
                        'report_index' : task.report_index,
                        'summary': task.summary },
                        function(err, data){
                            if(err) {return res.send (err);}
                            callback(null, data);
                        });
                }, 
                function(err, results){
                    res.json(results);
                });
    });

    app.route('/api/summary/task/:_id').put(function(req,res){
        console.log('touched summary task', req.body.pass_fail, req.body._id);

        Task.findById(req.params._id)
            .exec(function(err, doc){
                if (err) {res.send(err);}

                if(req.body.summary){doc.summary = req.body.summary;}
                if(req.body.pass_fail !== null){ doc.pass_fail = req.body.pass_fail;}
                if(req.body.visible !== null){ doc.visible = req.body.visible;}

                doc.save(function(err,data){
                    if(err){res.send(err);}

                    // console.log('updated task', task);
                    res.json(data);
                });
        });

    });

    app.route('/api/summary/test/:_id').put(function(req,res){

        console.log('touched summary task', req.body.pass_fail, req.body._id);

        Test.findById(req.params._id)
            .exec(function(err, doc){
                if (err) {res.send(err);}

                if(req.body.summary){doc.summary = req.body.summary;}
                if(req.body.pass_fail !== null){ doc.pass_fail = req.body.pass_fail;}
                if(req.body.visible !== null){ doc.visible = req.body.visible;}

                doc.save(function(err,data){
                    if(err){res.send(err);}

                    // console.log('updated task', task);
                    res.json(data);
                });
        });

    });

    app.route('/api/summary/tag/:_id').put(function(req,res){

        console.log('touched summary task', req.body.pass_fail, req.body._id);

        Tag.findById(req.params._id)
            .exec(function(err, doc){
                if (err) {res.send(err);}

                if(req.body.summary){doc.summary = req.body.summary;}
                if(req.body.pass_fail !== null){ doc.pass_fail = req.body.pass_fail;}
                if(req.body.visible !== null){ doc.visible = req.body.visible;}
                
                doc.save(function(err,data){
                    if(err){res.send(err);}

                    // console.log('updated task', task);
                    res.json(data);
                });
        });

    });

};