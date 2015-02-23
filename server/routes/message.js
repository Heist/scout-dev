//message.js
'use strict';

module.exports = function(app, passport, debug) {

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

// load functions  ==============================
    var newMessage     = global.rootRequire('./server/models/functions/new-message.js');
    var messageUpdates = global.rootRequire('./server/models/functions/message-updates');
    var buildMsgList   = global.rootRequire('./server/models/functions/messages-list');


//MESSAGE ROUTES  ================================================

 // Message Routes from Summary ===========================
    app.route('/api/summary/message/')
       .put(function(req, res){
        // post updates - faving - to a message or array of messages
            var message_array = [req.body];
            messageUpdates(message_array, function(err, messages){
                if(err){console.log(err);}
                res.json(messages);
            });
        });



    app.route('/api/message/')
    .get(function(req,res){
        // return all messages in the system. This is too many messages.
        // TODO: get all messages by current user?
        // Get all messages for current user account?
        // Messages don't store their account, because they're a User's creation. Bad?
        
        // Message.find({})
        //     .exec(function(err, messages) {
        //         if(err){ console.log(err); }
        //         res.json(messages);
        //     });
    })
    .post(function(req,res){
     // create a new message
        newMessage(req.body, req.user._id, function(err, message){
                if(err){console.log(err);}
                res.json(message);
            });
    })
    .put(function(req, res){
        
    });

    app.route('/api/message/:_id')
    .get(function(req,res){
        //get one specific message
        Message.findById(req.params._id)
            .exec(function(err,msg){
                if(err){ console.log(err); }
                res.json(msg);
            });
    })
    .put(function(req, res){
        // edit the body of a message
     
    });
};