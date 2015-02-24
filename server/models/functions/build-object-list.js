// build-object-list.js
// Builds the left navigation array for report routes
'use strict';

module.exports = function(report_id, next){

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

// CREATE THE LEFT NAVIGATION LIST ========================
    // get all relevant objects, sanitize them and return them in an array
    // get all relevant messages
    async.parallel({
        tags: function(callback){
            Tag.find({'_test' : report_id })
                .sort({name: 1})
                .exec(function(err, docs){
                    if (err) {
                        console.log(err);
                    }
                    callback(null, docs);
                });
        },
        tasks: function(callback){
            Task.find({'_test': report_id})
                .sort({ index: 'asc'})
                .exec(function(err, docs){
                    if (err) {
                        console.log(err);
                    }
                    callback(null, docs);
                });
        },
        test: function(callback){
            Test.find({'_id' : report_id})
                .limit(1)
                .exec(function(err, docs){
                    if(err){console.log(err);}
                    callback(null, docs);
                });
        }
    },
    function(err, results) {
        var return_array = [];

        _.each(results.test, function(test){
            return_array.push(test);
        });
        _.each(results.tasks, function(task){
            return_array.push(task);
        });
        _.each(results.tags, function(tag){
            return_array.push(tag);
        });

        var navlist = {
            test: results.test[0].name,
            list: return_array
        };

        next(null, navlist);
    });

};