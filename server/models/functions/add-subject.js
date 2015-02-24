// add-subject.js
// add a test subject
'use strict';

module.exports = function(request, next){

// Module dependencies ==========================
    var async    = require('async');

// load data storage models =====================
    var Subject = global.rootRequire('./server/models/data/subject');
    var Test     = global.rootRequire('./server/models/data/test');

// CREATE A NEW SUBJECT ===================================
    async.waterfall([function(callback){

        
        var subject = new Subject();

        subject.name = request.name;
        subject.testroom = request.testroom;
        subject.test = request.test;
        
        subject.save(function(err, data){
            if(err){console.log(err);}
            
            callback(null, data);
        });
    },function(subject, callback){
        Test.findById(subject.test)
            .exec(function(err, obj){
                if(err){console.log(err);}
                if(obj){
                    var now = new Date();
                    obj.last_run = now;

                    if(obj._subjects.indexOf(subject) === -1){
                        obj._subjects.push(subject);
                    }
                    
                    obj.save(function(err, saved){
                        if(err){console.log(err);}
                        callback(null, {subject: subject, test: saved});
                    });
                } else {
                    callback(null, subject);
                }
            });
        // callback(null, {subject: args});
    }], function(err,results){
            if(err){console.log(err);} 
            next(null, results.subject);
        });
};