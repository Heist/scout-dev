// complete-test.js
// Finish a test and post its relevant parts
'use strict';

module.exports = function(test_id, next){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models =====================
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');

// load functions ===============================
    var objectUpdate  = global.rootRequire('./server/models/functions/object-update');

// FINISH THE TEST AND POST CHANGES =======================
    
    async.map(req.body.tasks, 
        function(task, callback){
            Task.findById(task, function(err, doc){
                if(!doc){
                    callback(null, null);
                }

                if(doc._subjects.indexOf(req.body.subject) === -1){
                    doc._subjects.push(req.body.subject);
                }

                doc.save(function(err, data){
                    if(err){console.log(err);}
                    callback(null, data);
                });
            });
        },
    function(err, results){
        if(err){ console.log(err); }
    });

};


           