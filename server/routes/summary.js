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
            
            console.log(summary);
            // organise the returned information to pass back a good set for raw data
            var rawList = _.sortBy(_.filter(summary.navlist.list, function(n){ return n.name !== 'Summary'; }), function(obj){ return obj.report_index; });

            // Find the test in the left nav order
            var testIdx = _.indexOf(_.pluck(rawList, 'doctype'), 'test');

            // Set the messages from the summary tag to the test object
            rawList[testIdx]._messages = _.filter(summary.navlist.list, function(n){
                            return n.name === 'Summary';
                        })[0]._messages;

            var output = {
                name : summary.navlist.test,
                list : rawList,
                messages : summary.messages
            }

            res.json(output);
        });
    })
    .put(function(req, res){
        // this should be used for updating objects with
        // visibility and summaries
        // console.log('object update this steeze', req.body);

        var object_array = req.body.navlist || req.body;
        var message_array = req.body.messages || [];

        async.parallel([
            function(callback){
                fn.objectUpdate(object_array,
                function(err, update){
                    if(err){console.log(err);}
                    callback(null, update);
                });
            },
            function(callback){
                fn.messageFav(message_array,
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
    })
    .post(function(req,res){
        // update an object but not any messages
        // console.log('solo update', req.body);
        
        fn.objectUpdate(req.body,
            function(err, update){
                if(err){console.log(err);}
                res.json(update);
            });
    });

    // Comment route =============================
    app.route('/api/comment/')
       .post(function(req, res){
        // Add a comment to a message declared on the request.
        fn.newComment(req.body, req.user, function(err, comment){
            if(err){console.log(err);}
            res.json(comment);
        });
    });
};