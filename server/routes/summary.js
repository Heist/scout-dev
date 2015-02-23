// summary.js
'use strict';

module.exports = function (app, passport, debug) {

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
    var buildSummary = global.rootRequire('./server/models/functions/build-summary');

    var objectUpdates  = global.rootRequire('./server/models/functions/object-updates');
    var messageFav = global.rootRequire('./server/models/functions/message-fav');

    var newComment     = global.rootRequire('./server/models/functions/comment');    

// SUMMARY ROUTES ============================================

    app.route('/api/summary/:_id')
    .get(function(req, res){
    // get the navigation console for the summary.
        buildSummary(req.params._id, function(err, summary){
            if(err){ console.log(err); }
            res.json(summary);
        });
    })
    .put(function(req, res){
        // this should be used for updating objects with
        // visibility and summaries
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
                messageFav(message_array,
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

    // Comment route =============================
    app.route('/api/comment/')
       .post(function(req, res){
        // Add a comment to a message declared on the request.
        newComment(req.body, req.user, function(err, comment){
            if(err){console.log(err);}
            res.json(comment);
        });
    });
};