// user-create.js
// create a new user on the system
'use strict';

module.exports = function(user, next){
// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');

// load data storage models =====================
    var User = global.rootRequire('./server/models/auth/user');
    var Invitation = global.rootRequire('./server/models/auth/invitation');
    var newUserTests = global.rootRequire('./server/models/functions/default-tests.js');

// CREATE A NEW USER ============================
	console.log('new user', user);
	async.waterfall([
        function(callback){
        	console.log('find me an invitation');
        	if(user.invite){
	            Invitation.findOne({'_id': user.invite})
	                .exec(function(err, invite){
	                    if (err){ console.log(err); }
                    // there was a pending invite with that invite _id, and it's not pending now.
                        invite.pending = false;
                        invite.save(function(err, data){
                            callback(null, invite);
                        });
	                });
            } else {
            	callback(null, null);
            }
        },
        function(arg, callback){
        	console.log('make me a user', user.password);
        	var pass = return User.generateHash(user.password, function(err, next){
	        				return next;
			        	});
        	console.log(pass);
        	
            User.create({ 
                'name' : user.name,
                '_account' : arg ? arg._account : mongoose.Types.ObjectId(),
                'local.email' : user.email,
                'local.password' : pass
            }, function(err, user){ 
                if (err){ console.log(err); } 
                if(!arg.invite){
                	console.log('make some tests');
                    newUserTests(user._account, user._id, function(err, tests){
                        console.log('newUserTests generated tests for', user._id);
                        callback(null, tests);
                    });
                } else {
                	callback(null, user);
                }
            });
        }], next);
};