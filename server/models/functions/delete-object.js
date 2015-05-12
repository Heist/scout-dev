// delete task or tag - removes misc. objects from tests.
// delete-object.js

'use strict';
module.exports = function(objectKey, next){

// Module dependencies ==========================
    var async = require('async');
    var models   = require('../../models');
    var Promise = require('bluebird');

// delete an object
    // find an object
    // remove it from its test
    // NO LONGER: remove all related messages and tags 
    var obj = object.doctype;

    async.parallel([
        function(callback){
            models.Task.findById(task, function(err, doc){
                if(err){ console.error(err) }

                models.Test.findOne({'_id': doc._test})
                    .exec(function(err, test){
                        if(err){ console.error(err) }

                        test._tasks.remove(doc._id);
                        test.save(function(err,data){
                            if(err){ console.error(err); }
                        });
                    });
            })
            .remove(function(err){
                if(err){ console.error(err); }
                callback(null, 'task');
            });
        }
    ], 
    function(err, results){
        if(err){ console.error(err); }
        next(task);
    });
};