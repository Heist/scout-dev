// build-summary.js
// builds out the response object for a summary.
(function(){
'use strict';

module.exports = function(report_id, next){
// Module dependencies ==========================
    var async = require('async');
    var functions = require('../models/functions');

// BUILD A REPORT OBJECT ==================================
    async.parallel({
        navlist: function(callback){
            functions.buildNavList(report_id, function(err, list){
                if(err){console.log(err);}
                callback(null, list);
            });
        },
        messages: function(callback){
            functions.buildMsgList(report_id, function(err, list){
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
})();