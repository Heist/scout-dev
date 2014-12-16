// reportPrivateRoutes.js
'use strict';

module.exports = function(app) {
    //Module dependencies
    var mongoose = require('mongoose');  //THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('underscore');
    var async = require('async');

    //load data storage models
    var Message = require('../models/data/message');
    var Task    = require('../models/data/task');
    var Test    = require('../models/data/test');
    var Tag     = require('../models/data/tag');
    var Comment = require('../models/data/comment');

    var Subject = require('../models/data/subject');
    var User = require('../models/auth/user');

    app.route('/api/auth/report/:_id')
    .get(function(req, res){
        console.log('touched report get', req.params._id);

        // var t = new Trello ();

        var test_id = mongoose.Types.ObjectId(req.params._id);
        var reply = {};

        async.parallel({
            tags: function(callback){
                Tag.find({'_test' : req.params._id })
                    .populate('_messages')
                    .exec(function(err, docs){
                        if (err) {console.log(err);}
                        callback(null, docs);
                    });
            },
            tasks: function(callback){
                Task.find({'_test': req.params._id})
                    .sort({ index: 'asc'})
                    .populate('_messages')
                    .exec(function(err, docs){
                        if (err) {console.log(err);}
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
                       .populate({path:'_comments', select: 'name'})
                       .exec(function(err, docs){
                            if(err){console.log(err);}
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
            res.json({navlist: return_array, messages: results.messages});
        });

    });

    app.route('/api/comment/')
       .post(function(req, res){
        console.log('touched add a new comment');
        // Add a comment to a message declared on the request.
        async.waterfall([
            function(callback){
                Comment.create(
                    {
                        name: req.user.name,
                        body: req.body.comment.body,
                        created_by: req.user._id
                    },
                    function(err, cmt){
                        if (err) {console.log(err);} 
                        callback(null, cmt);
                    });
            },
            function(arg, callback){
                Message.findOne(req.body.message)
                    .exec(function(err, msg){
                        msg._comments.push(arg._id);
                        msg.save(function(err, data){
                            callback(null, {msg: data, comment: arg});
                        });
                    });
            }
        ],
        function(err, results){
            console.log(results);
            res.json(results);
        });
    });
};