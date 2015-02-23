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
    var objectUpdates  = global.rootRequire('./server/models/functions/object-updates');
    var buildNavList   = global.rootRequire('./server/models/functions/build-object-list');

    var newMessage     = global.rootRequire('./server/models/functions/new-message');
    var messageUpdates = global.rootRequire('./server/models/functions/message-updates');
    var buildMsgList   = global.rootRequire('./server/models/functions/messages-list');

    
// SUMMARY ROUTES ============================================

    app.route('/api/summary/:_id')
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

    app.route('/api/summary/:_id/navListUpdates/')
    .put(function(req, res){
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
        // create a new message from the summary
            newMessage(req.body, req.user._id, function(err, message){
                    if(err){console.log(err);}
                    res.json(message);
                });
        })
       .put(function(req, res){
        // post updates - faving - to a message or array of messages
            var message_array = [req.body];
            messageUpdates(message_array, function(err, messages){
                if(err){console.log(err);}
                res.json(messages);
            });
        });
};