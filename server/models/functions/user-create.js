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
            Invitation.findOne({'_id': user.invite_id})
                .exec(function(err, invite){
                    if (err){ console.log(err); }
                    if (!invite){ callback(null, null); }
                    if(invite){
                        // there was a pending invite with that invite _id, and it's not pending now.
                        invite.pending = false;
                        invite.save(function(err, data){
                            callback(null, {invite: invite});
                        });
                    }
                });
        },
        function(arg, callback){
        	console.log('make me a user');
            User.create({ 
                'name' : user.name,
                '_account' : arg.invite ? arg.invite._account : mongoose.Types.ObjectId(),
                'local.email' : user.email,
                'local.password' : User.generateHash(user.password)
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