// user-create.js
// create a new user on the system
'use strict';

module.exports = function(user, next){
// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');

// load data storage models =====================
    var User = require('../server/models/auth/user');
    var Invitation = require('../server/models/auth/invitation');
    var newUserTests = require('../server/models/functions/default-tests.js');

// CREATE A NEW USER ============================
	async.waterfall([
        function(callback){
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
            User.create({ 
                'name' : user.name,
                '_account' : arg.invite ? arg.invite._account : mongoose.Types.ObjectId(),
                'local.email' : user.email,
                'local.password' : User.generateHash(user.password)
            }, function(err, user){ 
                if (err){ console.log(err); } 
                if(!arg.invite){
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