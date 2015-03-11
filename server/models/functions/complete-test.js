// complete-test.js
// Finish a test and post its relevant parts
'use strict';

module.exports = function(test_id, next){

// Module dependencies ==========================
    var _ = require('lodash');
    var async = require('async');
    
    var models = require('../models');
    var functions = require('../models/functions');

// FINISH THE TEST AND POST CHANGES =======================
    
    async.map(req.body.tasks, 
        function(task, callback){
            models.Task.findById(task, function(err, doc){
                if(!doc){
                    callback(null, null);
                }

                if(doc._subjects.indexOf(test_id) === -1){
                    doc._subjects.push(test_id);
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


           