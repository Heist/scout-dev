// summary.js
'use strict';

module.exports = function (app, passport) {

// Module dependencies ==========================
    var async = require('async');
    var _ = require('lodash');
 
// load functions  ==============================
    var fn  = require('../models/functions');

// SUMMARY ROUTES ============================================

    app.route('/api/summary/:_id')
    .get(function(req, res){
    // get the navigation console for the summary.
        fn.buildSummary(req.params._id, function(err, summary){
            if(err){ console.log(err); }
            
            var output = {
                name : summary.navlist.test,
                list : summary.navlist.list,
                messages : summary.messages
            }

            res.json(output);
        });
    })
    .put(function(req, res){
        // this should be used for updating objects with
        // visibility and summaries
        // 

        var object_array = req.body.navlist || req.body;
        var message_array = req.body.messages || [];

        async.parallel([
            function(callback){
                fn.objectUpdate(object_array,
                function(err, update){
                    if(err){ console.log(err); }
                    callback(null, update);
                });
            },
            function(callback){
                fn.messageFav(message_array,
                    function(err, update){
                        if(err){ console.log(err); }
                        callback(null, update);
                    });
            }
        ],
        function(err,results){
            if(err){ console.log(err); }
            res.json(results);
        });
    })
    .post(function(req,res){
        // update an object but not any messages
        // 
        
        fn.objectUpdate(req.body,
            function(err, update){
                if(err){ console.log(err); }
                res.json(update);
            });
    });

    // Comment route =============================
    app.route('/api/comment/')
       .post(function(req, res){
        // Add a comment to a message declared on the request.
        fn.newComment(req.body, req.user, function(err, comment){
            if(err){ console.log(err); }
            res.json(comment);
        });
    });
};