//message.js
(function(){
'use strict';

module.exports = function(app, passport) {

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
        
        fn.messageNew(req.body, req.user._id).then(function(data){
            if(typeof data === 'object'){
                models.Tag.findAsync({'_test' : req.body._test, '_messages' :{$not: {$size : 0}} })
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
        // this is used in all message editing in all parts of the app
        console.log('touched put', req.body);
        fn.messageEdit(req.body).then(function(data){
            console.log('returned message', data);
            if(typeof data === 'object'){
                models.Tag.findAsync({'_test' : data._test})
                    .then(function(tags){
                        console.log('tags', tags);

                        var send = {
                            msg  : data, 
                            tags : tags
                        };
                        
                        res.json(send);
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
            if(err){ console.error(err); }
            res.json(messages);
        });
    });

    app.route('/api/message/:_id')
    .get(function(req,res){
        //get one specific message
        models.Message.findById(req.params._id)
            .exec(function(err,msg){
                if(err){ console.error(err); }
                res.json(msg);
            });
    })
    .delete(function(req,res){
        
        fn.messageRemove(req.params._id).then(function(data){
            res.json(data); // this should be the string '1'
        });
    });
};
})();