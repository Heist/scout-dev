// add-subject.js
// add a test subject
'use strict';

module.exports = function(request, next){

// Module dependencies ==========================
    var async    = require('async');
    var models = require('../models');

// CREATE A NEW SUBJECT ===================================
    async.waterfall([function(callback){

        models.Subject.create({
            name     : request.name,
            testroom : request.testroom,
            test     : request.test
        },
        function(err, data){
            if(err){console.log(err);}
            callback(null, data);
        });

    }, function(subject, callback){
        models.Test.findOneAndUpdate(
            {'_id' : subject.test},
            {'last_run' : new Date(),
              $push : { _subjects : subject._id } 
            },
            function(err, test){
                if(err){console.log(err);}
                callback(null, subject);
            });
            
    }], function(err,results){
            if(err){console.log(err);} 
            next(null, results);
        });
};