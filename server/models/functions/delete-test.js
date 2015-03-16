// delete-test.js
// deletes a single test by id and all related tasks, messages, tags
'use strict';

module.exports = function(test, next){
// Module dependencies ==========================
    var async = require('async');
    var models   = require('../../models');

// DELETE TEST ============================================
    console.log(test);
    async.parallel([
        function(callback){
            models.Test.remove({ '_id' : test}, 
                function(err, doc){
                    if(err){ console.log(err); }
                    callback(null, 'test');
                });
        },
        function(callback){
            models.Task.remove({ '_test' : test },
                function(err, doc){
                    if(err){ console.log(err); }
                    callback(null, 'task');
                });
        },
        function(callback){
            models.Message.remove({ '_test' : test }, 
                function(err, doc){
                    if(err){ console.log(err); }
                    callback(null, 'messages');
                });
        },
        function(callback){
            models.Tag.remove({ '_test' : test },
                 function(err, doc){
                        if(err){ console.log(err); }
                        callback(null, 'tags');
                    });
        }
    ], 
    function(err, results){
        if(err){ console.log(err); }
        console.log(results, test);

        next(null, test);
    });  
};