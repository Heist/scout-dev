// run.js
(function(){
'use strict';

module.exports = function(app, passport, io, debug) {

// Module dependencies ====================================
    var async = require('async');

// load data storage models =====================
    var models  = require('../models');
 
// load functions  ==============================
    var fn  = require('../models/functions');

// RUN ROUTES =============================================
    app.route('/api/run/')
        .get(function(req,res){
        })
        .post(function(req,res){
            // req.body should be an array of objects on DB to be updated.
            console.log('test complete');
            fn.objectUpdate(req.body, function(err, next){
                if(err){ console.log(err); }
                res.json('completed', next);
            });
        });

    app.route('/api/run/:_id')
        .get(function(req,res){

            // Find a test by _id and _account and populate its tasks, then return.
            models.Test.findOne({
                    '_id' : req.params._id, 
                    '_tasks': {$not: {$size: 0}}, 
                    'created_by_account' : req.user._account 
                })
                .populate('_tasks')
                .exec(function(err, docs){
                    if(err){console.log(err);}
                    res.json(docs);
                });

        });
};
})();