// build-object-list.js
// Builds the left navigation array for report routes
'use strict';

module.exports = function(report_id, next){

// Module dependencies ==========================
    var _ = require('lodash');
    var Bluebird = require('bluebird');
    
    var models = Bluebird.promisifyAll(require('../../models'));

// CREATE THE LEFT NAVIGATION LIST ========================
    // get all relevant objects, sanitize them and return them in an array for left nav of summary

    // TODO: When we make tasks, they live in the Test, and the Test stores their order, right?
    // Right. They aren't returned to the Test this way. This is purely for Reports.
    // Sooooooo, normal index is no use.
    // TODO: FIX ON TEST CREATION PAGE.

    // ADD INDEXES TO QUERIED (ie: _test) FIELDS
    // db.tags.createIndex({_test:1}) << for example, to create an index on the field "_tests"
    // Get all report IDs, then make the three queries. 
    // there is a little bit of latency on every db request.

    // if we are accidentally making 150 queries to the DB, then that might be what is slowing it down.
    
    return Bluebird.all([
            models.Tag.find({'_test' : report_id }).sort({name: 1}).exec(),
            models.Task.find({'_test': report_id}).sort({ report_index: 'asc'}).exec(),
            models.Test.find({'_id' : report_id}).limit(1).exec()
        ]).then(function(arr){
            var navlist = {
                test : (arr[2].length > 0) ? arr[2][0].name : 'Test name not found',
                list: _.flatten(arr)
            };
            // console.log(navlist);
            return navlist;
        }).catch(function(err){
            if(err){ console.log(err); }
        })

};