// reportPrivateRoutes.js
'use strict';

module.exports = function(app, debug) {
    //Module dependencies
    var mongoose = require('mongoose');  //THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');

    //load data storage models
    var Message = require('../models/data/message');
    var Task    = require('../models/data/task');
    var Test    = require('../models/data/test');
    var Tag     = require('../models/data/tag');
    var Comment = require('../models/data/comment');

    var Subject = require('../models/data/subject');
    var User = require('../models/auth/user');

    app.route('/api/private/report/:_id')
    .get(function(req, res){
        console.log('touched report get', req.params._id);

        async.parallel({
            tags: function(callback){
                Tag.find({'_test' : req.params._id})
                    .exec(function(err, docs){
                        if (err) {console.log(err);}
                        callback(null, docs);
                    });
            },
            tasks: function(callback){
                Task.find({'_test': req.params._id, 'visible' : true })
                    .sort({ index: 'asc'})
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
                console.log('last_run', test.last_run);
            });
            _.each(results.tasks, function(task){
                return_array.push(task);
            });
            _.each(results.tags, function(tag){
                return_array.push(tag);
            });

            console.log('test from results', results.test[0].name);
            res.json({test: results.test[0].name, navlist: return_array, messages: results.messages});
        });

    });

    app.route('/api/comment/:_id')
       .post(function(req, res){
        console.log('touched add a new comment', req.body, req.params._id);
        // Add a comment to a message declared on the request.

        var reply = {};
        var promise = Comment.create( {
                name: req.user.name,
                body: req.body.comment.body,
                created_by: req.user._id
            },
            function(err, cmt){
                if (err) {console.log(err);}
            });

        promise.then(function(comment){
            reply.comment = comment;
            return Message.findOneAndUpdate(
                {'_id' : req.params._id},
                {$push : {_comments: comment._id}},
                function(err, msg){
                    if (err) {console.log(err);}
                });
        }).then(function(){
            Message.findOne({'_id': req.params._id})
                   .populate('_comments _subject')
                   .exec(function(err, msg){
                        if (err) {console.log(err);}
                        console.log(reply);
                        res.json({msg : msg, comment: reply.comment});
                    });
        });
    });
};