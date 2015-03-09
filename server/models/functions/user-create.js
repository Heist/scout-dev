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
        function(invite, callback){
		    var pass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
            User.create({ 
                'name' : user.name,
                '_account' : invite ? invite._account : mongoose.Types.ObjectId(),
                'local.email' : user.email,
                'local.password' : pass
            }, function(err, user){ 
                if (err){ console.log(err); }
                callback(null, {invite: invite, user : user});
            });
        },
        function(arg, callback){
        	if(arg.invite === null ){
        		console.log('make some tests');
                newUserTests(arg.user._account, arg.user._id, function(err, tests){
                    callback(null, {user: arg.user, tests: true});
                });
        	} else {
        		callback(null, {user: arg.user, tests: false});
        	}
        }], function(err, results){
        	if(err){console.log(err);}
        	next(null, results);
        });
};