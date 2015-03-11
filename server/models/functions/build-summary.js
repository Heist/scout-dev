// build-summary.js
// builds out the response object for a summary.
'use strict';

module.exports = function(report_id, next){
// Module dependencies ==========================
    var async = require('async');

// load functions ===============================
    var buildNavList   = global.rootRequire('./server/models/functions/build-object-list');
    var buildMsgList   = global.rootRequire('./server/models/functions/message-list');

// BUILD A REPORT OBJECT ==================================
    async.parallel({
        navlist: function(callback){
            buildNavList(report_id, function(err, list){
                if(err){console.log(err);}
                callback(null, list);
            });
        },
        messages: function(callback){
            buildMsgList(report_id, function(err, list){
                if(err){console.log(err);}
                callback(null, list);
            });
        }
    },
    function(err, results){
        if(err){console.log(err);}
        next(null, results);
    });
};