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

    var newComment     = global.rootRequire('./server/models/functions/comment');
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

    app.route('/api/comment/')
       .post(function(req, res){
        // Add a comment to a message declared on the request.
        newComment(req.body, req.user, function(err, comment){
            if(err){console.log(err);}
            res.json(comment);
        });

    });
};