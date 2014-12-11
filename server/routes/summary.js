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
         //async.map
         // each object in req body
         // if it has a summary, find the object by doctype and update components

        async.parallel([
            function(callback){
                async.map(req.body.navlist, 
                    function(obj, callback){
                        var Model;
                        if(obj.doctype === 'tag'){Model = Tag;}
                        if(obj.doctype === 'task'){Model = Task;}
                        if(obj.doctype === 'test'){Model = Test;}

                        Model.findById(obj._id)
                             .exec(function(err, model){

                                model.pass_fail     = obj.pass_fail;
                                model.report_index  = obj.report_index;
                                model.summary       = obj.summary;
                                model.summarized    = obj.summarized;
                                model.report        = true;

                                model.save(function(err, data){
                                    callback(null, data);
                                });
                            });

                    },
                    function(err, results){
                        console.log('map', results);
                        callback(null, results);
                    });
            },
            function(callback){
                async.map(req.body.messages, 
                    function(msg, callback){
                        Message.findByIdAndUpdate(
                            msg._id, 
                            { 
                                'fav_task' : msg.fav_task,
                                'fav_tag'  : msg.fav_tag,
                                'body'  : msg.body,
                            }, 
                            function(err, data){
                                if(err){res.send(err);}
                                callback(null, data);
                            });
                    }, 
                    function(err, results){
                        callback(null, results);
                    });
            }
        ],
        function(err, results){
            // the results array will equal ['one','two'] even though
            // the second function had a shorter timeout.
            console.log('done summary update');
            res.json(results);
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