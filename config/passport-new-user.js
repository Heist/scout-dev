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
                console.log('first function email', user.email);
                var call = (doc !== null ) ? 'That email is already taken.' : null ;
                callback(null, call);
            });
        },
        function(next, callback){
            console.log('hit new user');
            if(next !== null ){ console.log('aint no next'); callback(null, next); }
            else {
                console.log('hit new user');
                newUser(user, function(err, doc){
                    if(err){console.log(err);}
                    callback(null, doc);
                });
            }
        }], next);
};