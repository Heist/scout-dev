// user-create.js
// create a new user on the system
'use strict';

module.exports = function(user, next){
// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
	var bcrypt = require('bcrypt-nodejs');

// load data storage models =====================
    var User = global.rootRequire('./server/models/auth/user');
    var Invitation = global.rootRequire('./server/models/auth/invitation');
    var newUserTests = global.rootRequire('./server/models/functions/default-tests.js');

// CREATE A NEW USER ============================
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
		    
		    var pass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);

            User.create({ 
                'name' : user.name,
                '_account' : arg ? arg._account : mongoose.Types.ObjectId(),
                'local.email' : user.email,
                'local.password' : pass
            }, function(err, user){ 
                if (err){ console.log(err); }
                console.log('making a new user', user);
                callback(null, {invite: arg.invite, user : user});
            });
        },
        function(arg, callback){
        	console.log('test for invites', arg);
        	if(arg.invite === '' ){
        		console.log('make some tests');
                newUserTests(user._account, user._id, function(err, tests){
                    console.log('newUserTests generated tests for', user._id);
                    callback(null, arg.user);
                });
        	} else {
        		callback(null, arg.user);
        	}
        }], function(err, results){
        	if(err){console.log(err);}
        	console.log('new user', results);
        	next(null, results);
        });
};