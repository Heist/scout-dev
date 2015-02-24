// run.js
'use strict';

module.exports = function(app, passport, io, debug) {

// Module dependencies ====================================
    var async = require('async');

// load data storage models ===============================
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// load functions ========================================= 
    var newMessage = global.rootRequire('./server/models/functions/new-message.js');
    var objectUpdates  = global.rootRequire('./server/models/functions/object-updates');

// RUN ROUTES =============================================
    app.route('/api/run/')
        .get(function(req,res){
        })
        .post(function(req,res){
            console.log('touched run post', req.body);
            // req.body should just be a list of objects on DB to be updated.

            
            objectUpdates('' , function(err, next){
                if(err){ console.log(err); }
                res.json('completed', next);
            });
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