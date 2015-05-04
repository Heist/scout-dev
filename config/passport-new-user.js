// passport-new-user.js
// passport user creation function
'use strict';

module.exports =  function(user, next){
// Module Dependencies
    var async = require('async');

// load required models
    var User = require('../server/models/auth/user');

// load required functions
    var newUser = require('../server/models/functions/user-create');
    
// Check if a user by that e-mail already exists, or create a new user.
    async.waterfall([
        function(callback){
          User.findOne({ 'local.email' : user.email })
            .exec(function(err, doc) {
                if(err){console.log(err);}
                var call = (doc !== null ) ? 1 : null ;
                callback(null, call);
            });
        },
        function(arg, callback){
            if(arg !== null ){ callback(null, arg); }
            else {
                newUser(user, function(err, doc){
                    if(err){console.log(err);}
                    callback(null, doc);
                });
            }
        }], next);
};