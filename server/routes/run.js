// run.js
'use strict';

module.exports = function(app, passport, io, debug) {

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');

// load data storage models
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// load functions 
    var newMessage = global.rootRequire('./server/models/functions/new-message.js');

// RUN ROUTES =============================================
    app.route('/api/run/')
        .get(function(req,res){
        })
        .post(function(req,res){
            console.log('touched run post', req.body);

            
        });

    app.route('/api/run/:_id')
        .get(function(req,res){
            // Find a test by _id and populate its tasks, then return.
            // Todo: Account-lock this.

            Test.findOne({
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