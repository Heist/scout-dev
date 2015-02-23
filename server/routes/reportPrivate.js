// reportPrivateRoutes.js
'use strict';

module.exports = function(app, debug) {
    
// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models =====================
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// load functions ===============================
    var objectUpdates  = global.rootRequire('./server/models/functions/object-updates');
    var buildNavList   = global.rootRequire('./server/models/functions/build-object-list');

    var newMessage     = global.rootRequire('./server/models/functions/new-message');
    var messageUpdates = global.rootRequire('./server/models/functions/message-updates');
    var buildMsgList   = global.rootRequire('./server/models/functions/messages-list');

    
// PRIVATE REPORT ROUTES ============================================
    app.route('/api/private/report/:_id')
    .get(function(req, res){
    // get the navigation console for the summary.
        async.parallel({
            navlist: function(callback){
                buildNavList(req.params._id, function(err, list){
                    if(err){console.log(err);}
                    callback(null, list);
                });
            },
            messages: function(callback){
                buildMsgList(req.params._id, function(err, list){
                    if(err){console.log(err);}
                    callback(null, list);
                });
            }
        },
        function(err, results){
            if(err){console.log(err);}
            res.json(results);
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
                created_by_user: req.user._id
            },
            function(err, cmt){
                if(err){ console.log(err); }
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
                        if (err) { console.log(err);}
                        console.log(reply);
                        res.json({msg : msg, comment: reply.comment});
                    });
        });
    });
};