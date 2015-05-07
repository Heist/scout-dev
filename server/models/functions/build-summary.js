// build-summary.js
// builds out the response object for a summary.
(function(){
'use strict';

module.exports = function(report_id, next){
// Module dependencies ==========================
    var async = require('async');
    var fn    = require('../../models/functions');

// BUILD A REPORT OBJECT ==================================
    async.parallel({
        navlist: function(callback){
            fn.buildObjectList(report_id).then(function(data){
                    callback(null, data);
                });
        },
        messages: function(callback){
            fn.messageList(report_id, function(err, list){
                if(err){ console.log(err); }
                callback(null, list);
            });
        }
    },
    function(err, results){
        if(err){ console.log(err); }
        console.log('build summary results', results);
        next(null, results);
    });
};
})();