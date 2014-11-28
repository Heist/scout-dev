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

        var query = {'_id':req.body.test._id};
        var update = {
            summary: req.body.test.summary,
            report: true
        };

        Test.findOneAndUpdate(query, update,function(err,test){
                if(err) {return res.send (err);}
                console.log('test updated', test);
            });

        // if we have tags, update them in the db.
        // NO FUNCTIONS IN A LOOP.
        if(req.body.tags){
            async.each(req.body.tags, function(tag, callback){
                Tag.findOneAndUpdate(
                    {'_id' : tag._id}, 
                    {'summary': tag.summary,
                    'summarized' : tag.summarized},
                    function(err, data){
                        if(err) {return res.send (err);}
                    });
            });
        }
        
        if(req.body.tasks){
            async.each(req.body.tasks, function(task, callback){
                Task.findByIdAndUpdate(
                    task._id,
                    {'pass_fail': task.pass_fail,
                    'summary': task.summary },
                    function(err, data){
                        if(err) {return res.send (err);}
                    });
            });
        }
        
        // this is actually users, not messages.
        // messages needs to be returned separately on the front end.
        // perhaps try underscore_pop or something.

        if(req.body.messages){
            async.each(req.body.messages, function(msg, callback){
                // console.log(msg);
                Message.findByIdAndUpdate(
                    msg._id, 
                    { 'fav_task' : msg.fav_task,
                    'fav_tag'  : msg.fav_tag,
                    'body'  : msg.body,
                    }, 
                    function(err, mess){
                        if(err){res.send(err);}
                    });
            });
        }
        
        res.send("test updated - server");
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