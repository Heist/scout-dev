// summary.js
'use strict';

module.exports = function (app, passport, debug) {

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models ==========================
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// load functions ==========================
    var newMessage = global.rootRequire('./server/models/functions/new-message.js');
    var tagUpdate  = global.rootRequire('./server/models/functions/update-tag.js');
    var objectUpdates = global.rootRequire('./server/models/functions/object-updates.js');
    var messageUpdates = global.rootRequire('./server/models/functions/message-updates.js');


// SUMMARY ROUTES ============================================

    app.route('/api/summary/:_id')
    .get(function(req, res){
        // get all the objects used in summary
        // push them to the nav list using map
        // order them by their report-index and return them
        
        // TODO call this into a function called 'create navList'
        console.log('touched report get', req.params._id);
        async.parallel({
            tags: function(callback){
                Tag.find({'_test' : req.params._id })
                    .sort({name: 1})
                    .exec(function(err, docs){
                        if (err) {
                            console.log(err);
                        }
                        callback(null, docs);
                    });
            },
            tasks: function(callback){
                Task.find({'_test': req.params._id})
                    .sort({ index: 'asc'})
                    .exec(function(err, docs){
                        if (err) {
                            console.log(err);
                        }
                        callback(null, docs);
                    });
            },
            test: function(callback){
                Test.find({'_id' : req.params._id})
                    .limit(1)
                    .exec(function(err, docs){
                        if(err){console.log(err);}
                        callback(null, docs);
                    });
            },
            messages: function(callback){
                Message.find({ '_test':{$in: [req.params._id]}})
                       .populate({path:'_subject', select: 'name' })
                       .populate({path:'_comments', select: 'name body created'})
                       .exec(function(err, docs){
                            if(err){console.log(err);}
                            console.log(docs);
                            callback(null, docs);
                        });
            }
        },
        function(err, results) {
            // results is now equals to: {one: 1, two: 2}
            var return_array = [];
            _.each(results.test, function(test){
                return_array.push(test);
            });
            _.each(results.tasks, function(task){
                return_array.push(task);
            });
            _.each(results.tags, function(tag){
                return_array.push(tag);
            });
            // callback(null, );
            console.log(results.test[0].name);
            res.json({test: results.test[0].name, navlist: return_array, messages: results.messages});
        });

    });

app.route('/api/summary/:_id/navListUpdates/')
    .put(function(req, res){
        console.log('touched summary put');
        
        // this function takes two arrays and updates the objects it finds within them.
        var object_array = req.body.navlist || req.body;
        var message_array = req.body.messages || [];

        async.parallel([
            function(callback){
                objectUpdates(object_array,
                function(err, update){
                    if(err){console.log(err);}
                    callback(null, update);
                });
            },
            function(callback){
                messageUpdates(message_array,
                    function(err, update){
                        if(err){console.log(err);}
                        callback(null, update);
                    });
            }
        ],
        function(err,results){
            if(err){console.log(err);}
            res.json(results);
        });
        
    });
    
    app.route('/api/summary/message/')
       .post(function(req,res){
        // create a new message from the summary.
            newMessage(req.body, req.user._id, function(err, message){
                    if(err){console.log(err);}
                    res.json(message);
                });
        });

    app.route('/api/summary/message/:_id')
        .put(function(req,res){
        // for adding favs to messages - include messages in reports.
        Message.findOneAndUpdate(
            {'_id' : req.params._id}, 
            { 
                fav_task : req.body.fav_task, 
                fav_tag : req.body.fav_tag,
            }, 
            function(err, msg){
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
                        'summary': task.summary,
                        'embed':task.embed },
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
        // TODO: abstract all three into a generic update method.
        console.log('touched summary task', req.body.pass_fail, req.body._id);
        var summary   = req.body.summary,
            pass_fail = req.body.pass_fail || false,
            visible   = req.body.visible || false,
            embed     = req.body.embed || '';

        Task.findOneAndUpdate(
            {'_id' : req.body._id },
            {
                summary : summary,
                pass_fail : pass_fail,
                visible : visible,
                embed : embed
            },
            function(err, task){
                if(err){console.log(err);}
                res.json(task);
            });
    });

    app.route('/api/summary/test/:_id').put(function(req,res){
        console.log('touched summary test', req.body.pass_fail, req.body._id);
        var summary   = req.body.summary,
            pass_fail = req.body.pass_fail || false,
            visible   = req.body.visible || false,
            embed     = req.body.embed || '';

        Test.findOneAndUpdate(
            {'_id' : req.body._id },
            {
                summary : summary,
                pass_fail : pass_fail,
                visible : visible,
                embed : embed
            },
            function(err, test){
                if(err){console.log(err);}
                res.json(test);
            });
            

    });

    app.route('/api/summary/tag/:_id')
        .put(function(req,res){
            tagUpdate(req.params._id, req.body, function(err, tag){
                if(err){console.log(err);}
                res.json(tag);
            });
    });

};