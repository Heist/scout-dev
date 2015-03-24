//message.js
(function(){
'use strict';

module.exports = function(app, passport, debug) {

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models =====================
    var models  = require('../models');
 
// load functions  ==============================
    var fn  = require('../models/functions')

//MESSAGE ROUTES  ================================================

 // Message Routes from Summary ===========================
    app.route('/api/message/')
    .post(function(req,res){
     // Create a new message
        // var messageNew = require('../models/functions/message-new')
        fn.messageNew(req.body, req.user._id).then(function(data){
            res.json(data);
        });
    })
    .put(function(req, res){
    // Edit the body of a message and change its tag associations
        console.log(req.body);
        fn.messageEdit(req.body, function(err, msg){
            if(err){console.log(err);}
            res.json(msg);
        });
    });

    app.route('/api/message/fav')
   .put(function(req, res){
    // post fav to a message or array of messages
        var message_array = [req.body];
        fn.messageFav(message_array, function(err, messages){
            if(err){console.log(err);}
            res.json(messages);
        });
    });

    app.route('/api/message/:_id')
    .get(function(req,res){
        //get one specific message
        models.Message.findById(req.params._id)
            .exec(function(err,msg){
                if(err){ console.log(err); }
                res.json(msg);
            });
    });
};
})();