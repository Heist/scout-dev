// summary.js
'use strict';

module.exports = function (app, passport, debug) {

    // Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');

    // load data storage models
    var Message = require('../models/data/message');
    var Task    = require('../models/data/task');
    var Test    = require('../models/data/test');
    var Tag     = require('../models/data/tag');
    var Subject = require('../models/data/subject');

// SUMMARY ROUTES ============================================

    app.route('/api/summary/:_id')
    .get(function(req, res){
        // get all the objects used in summary
        // push them to the nav list using map
        // order them by their report-index and return them
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

    })
    .put(function(req, res){
        console.log('touched summary put');
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
                                model.embed         = obj.embed;
                                model.report        = true;

                                model.save(function(err, data){
                                    console.log('update', data.name, data.report_index);
                                    callback(null, data);
                                });
                            });

                    },
                    function(err, results){
                        // console.log('map', results);
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
                                if(err){console.log(err);}
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
    
    app.route('/api/summary/message/')
       .post(function(req,res){
        console.log('touched new message ', req.body);

        var body, _subject, created_by_user, _test, _task;

        if (req.body.body) { body = req.body.body;}        
        if (req.body._subject) {_subject = mongoose.Types.ObjectId(req.body._subject); }
        if (req.body._test) {_test = mongoose.Types.ObjectId(req.body._test); }
        if (req.user._id) {created_by_user = mongoose.Types.ObjectId(req.user._id); }

        if (req.body._task) {_task = mongoose.Types.ObjectId(req.body._task); }

        var new_note = {
            _subject : _subject,
            _test : _test,
            body : body,
            created_by : created_by_user
        };

        async.waterfall([
            function(callback){
                Message.create(
                    new_note, 
                    function(err, msg){
                        if (err) {
                            console.log(err);
                        } 
                        callback(null, msg);
                    });
            },
            function(msg, callback){
                Message.findById(msg._id)
                       .populate('_subject')
                       .exec(function(err, note){
                            if (err) {
                                console.log(err);
                            }
                            callback(null, note); 
                        });
            },
            function(msg, callback){
                async.parallel({
                    task: function(callback){
                        if (_task){
                            Task.findOne({'_id':_task})
                                .exec(function(err, task){
                                    task._messages.push(msg._id);
                                    task.save(function(err, data){
                                        callback(null, data);
                                    });
                                });
                        }
                    },
                    subject: function(callback){
                        Subject.findById(_subject)
                               .exec(function(err, subject){
                                    subject._messages.push(msg._id);
                                    subject.save(function(err, subject){
                                        callback(null, subject);
                                    });
                                });
                    },
                    tags: function(done){
                        if(req.body.tags){
                            async.map(
                                req.body.tags, 
                                function(tag, callback){

                                    Tag.findOneAndUpdate( 
                                        {name: tag, _test: msg._test}, 
                                        { $push: { _messages: msg._id },
                                                name: tag,
                                                _test: msg._test
                                        }, 
                                        {upsert:true}, 
                                        function(err, data){ 
                                            callback(null, data);
                                        });
                                }, 
                                function(err, results){
                                    done(null, results);
                                });
                        } 
                    }
                }, function(err, results){
                    callback(null, {msg: msg, waterfall: results});
                });
            }
        ], 
        function(err, results){
            console.log('waterfall results', results.msg, results.waterfall.tags);
            res.json({msg: results.msg, tags: results.waterfall.tags});
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
        console.log('touched summary task', req.body.pass_fail, req.body._id);

        Task.findOne({'_id': req.body._id})
            .exec(function(err, doc){
                if (err) {
                    console.log(err);
                }

                console.log('touched task', req.body._id);

                if(req.body.summary){doc.summary = req.body.summary;}
                if(req.body.pass_fail !== null){ doc.pass_fail = req.body.pass_fail;}
                if(req.body.visible !== null){ doc.visible = req.body.visible;}
                if(req.body.embed !== null){ doc.embed = req.body.embed;}

                doc.save(function(err,data){
                    if(err){console.log(err);}

                    console.log('updated task', data._id);
                    res.json(data);
                });
            });
    });

    app.route('/api/summary/test/:_id').put(function(req,res){

        console.log('touched summary test', req.body.pass_fail, req.body._id);

        Test.findOne({'_id' : req.body._id})
            .exec(function(err, doc){
                if (err) {
                    console.log(err);
                }

                // console.log('test found', doc._id);

                if(req.body.summary){doc.summary = req.body.summary;}
                if(req.body.pass_fail !== null){ doc.pass_fail = req.body.pass_fail;}
                if(req.body.visible !== null){ doc.visible = req.body.visible;}
                if(req.body.embed !== null){ doc.embed = req.body.embed;}

                doc.save(function(err,data){
                    if(err){console.log(err);}

                    console.log('updated test', data._id);
                    res.json(data);
                });
            });

    });

    app.route('/api/summary/tag/:_id').put(function(req,res){

        console.log('touched summary task', req.body.pass_fail, req.body._id);

        Tag.findById(req.params._id)
            .exec(function(err, doc){
                if (err) {
                    console.log(err);
                }

                if(req.body.summary){doc.summary = req.body.summary;}
                if(req.body.pass_fail !== null){ doc.pass_fail = req.body.pass_fail;}
                if(req.body.visible !== null){ doc.visible = req.body.visible;}
                if(req.body.embed !== null){ doc.embed = req.body.embed;}

                doc.save(function(err,data){
                    if(err){
                        console.log(err);
                    }
                    res.json(data);
                });
            });

    });

};