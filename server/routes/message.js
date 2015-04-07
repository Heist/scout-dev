//message.js
(function(){
'use strict';

module.exports = function(app, passport, debug) {

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Bluebird = require('bluebird');

// load data storage models =====================
    var models = Bluebird.promisifyAll(require('../models'));

// load functions  ==============================
    var fn  = require('../models/functions')

//MESSAGE ROUTES  ================================================

 // Message Routes from Summary ===========================
    app.route('/api/message/')
    .post(function(req,res){
     // Create a new message
     console.log('find post message route');
        fn.messageNew(req.body, req.user._id).then(function(data){
            if(typeof data === 'object'){
                models.Tag.findAsync({'_test' : req.body._test})
                    .then(function(tags){
                        res.json({msg: data, tags: tags});
                    })
            } else {
                res.json(data);
            }
        });
    })
    .put(function(req, res){
    // Edit the body of a message and change its tag associations
        
        console.log('find put message route');
        fn.messageEdit(req.body).then(function(data){
            if(typeof data === 'object'){
                models.Tag.findAsync({'_test' : data._test})
                    .then(function(tags){
                        res.json({msg: data, tags: tags});
                    })
            } else {
                res.json(data);
            }
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