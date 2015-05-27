// user-create.js
// create a new user on the system
'use strict';

module.exports = function(user, next){
// Module dependencies ==========================
    var async    = require('async');
	var bcrypt   = require('bcrypt-nodejs');
    var mongoose = require('mongoose');
    var models   = require('../../models');
    var fn       = require('../../models/functions');

// CREATE A NEW USER ============================
	async.waterfall([
        function(callback){
	            models.Invite.findOne({'invite_email': user.email})
	                .exec(function(err, invite){
	                    if (err){  }
                        if( !invite ){ callback(null, null); }
                        else {
                            // 
                        // there was a pending invite with that invite _id, and it's not pending now.
                            invite.pending = false;
                            invite.save(function(err, data){
                                callback(null, data);
                            });
                        }
	                });
        },
        function(invite, callback){
		    var pass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
            models.User.create({ 
                'name' : user.name,
                '_account' : (invite !== null ) ? invite._account : mongoose.Types.ObjectId(),
                'local.email' : user.email,
                'local.password' : pass
            }, function(err, user){ 
                if (err){ console.error('error in user creation', err); }
                callback(null, {invite: invite, user : user});
            });
        },
        function(arg, callback){
        	if(arg.invite === null ){
                callback(null, {user: arg.user, tests: false});
        	} else {
        		callback(null, {user: arg.user, tests: false});
        	}
        }], function(err, results){
        	if(err){ console.error(err); }
        	next(null, results);
        });
};