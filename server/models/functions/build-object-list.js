// build-object-list.js
// Builds the left navigation array for report routes
'use strict';

module.exports = function(report_id, next){

// Module dependencies ==========================
    var _ = require('lodash');
    var async = require('async');
    
    var models = require('../../models');

// CREATE THE LEFT NAVIGATION LIST ========================
    // get all relevant objects, sanitize them and return them in an array


    // TODO: When we make tasks, they live in the Test, and the Test stores their order, right?
    // Right. They aren't returned to the Test this way. This is purely for Reports.
    // Sooooooo, normal index is no use.
    // TODO: FIX ON TEST CREATION PAGE.
    async.parallel({
        tags: function(callback){
            models.Tag.find({'_test' : report_id })
                .sort({name: 1})
                .exec(function(err, docs){
                    if (err) { console.log(err); }
                    if(!docs ){ callback(null, null); }
                    callback(null, docs);
                });
        },
        tasks: function(callback){
            models.Task.find({'_test': report_id})
                .sort({ report_index: 'asc'})
                .exec(function(err, docs){
                    if (err) { console.log(err); }
                    if(!docs ){ callback(null, null); }
                    callback(null, docs);
                });
        },
        test: function(callback){
            models.Test.find({'_id' : report_id})
                .limit(1)
                .exec(function(err, docs){
                    if(err){console.log(err);}
                    if(!docs ){ callback(null, null); }
                    callback(null, docs);
                });
        }
    },
    function(err, results) {
        var return_array = [];
        if (results.test){
            _.each(results.test, function(test){
                return_array.push(test);
            });
        }

        if(results.tasks){
            _.each(results.tasks, function(task){
                return_array.push(task);
            });
        }

        if(results.tags){
            _.each(results.tags, function(tag){
                return_array.push(tag);
            });
        }

        var navlist = {
            test : (results.test.length > 0) ? results.test[0].name : 'Test name not found',
            list: return_array
        };

        // todo: refactor so this does not fail if things are null.
        next(null, navlist);
        
    });

};