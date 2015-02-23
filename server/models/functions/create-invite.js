// create-invite.js
// Create a new invitation
'use strict';

module.exports = function(address, inviter, next){

// Module dependencies ====================================
    var mongoose = require('mongoose');  // Permits use of ObjectID type
    var _        = require('lodash');
    var async    = require('async');
    var Promise  = require('bluebird');

// Load models ============================================
    var User       = global.rootRequire('./server/models/auth/user');
    var Invitation = global.rootRequire('./server/models/auth/invitation');
    var Emailer    = global.rootRequire('./server/models/mailer');

// Create an invitation ===================================
    async.waterfall([
        function(callback){
            User.findOne({'local.email' : address })
                .exec(function(err, user){
                    if(!user){
                        // if there is no user, set user to null.
                        callback(null, null);
                    }
                    else {
                        // otherwise pass along the user.
                        callback(null, user.local.email+' already has a Field Guide account.');
                    }
                });
        },
        function(user, callback){
            
            if(user !== null ){
                // If there is a user, skip the invite chain and return.
                callback(null, user);
            }

            Invitation
                .findOne({'invite_email' : address})
                .exec(function(err, i){
                    if(!i){ 
                        // if there is no invitation, pass to next step.
                        callback(null, null); 
                    }
                    else {
                        // if there is an invite, pass that to results.
                        callback(null, 'You have already sent that invitation.');
                    }
                });
        },
        function(args, callback){
            if(args !== null){
                // If either a user or an invitation exists on the system, pass it along.
                callback(null, args);
            }

            // Send an invitation in e-mail to whomever.
            // TODO: Promisify this bit.
            
            Invitation.create({
                _account : inviter._account,
                created_by_user : inviter._id,
                invite_email : address
            }, function(err, invite){
                if(err){ console.log(err); }

                var mailer = new Emailer(
                    { to: { email: invite.invite_email, },
                      author: invite._account,
                      subject: "Invite from Field Guide",
                      template: "invite"
                    },
                    { invitation_by: inviter.name,
                      invite_link: 'http://projects.fieldguideapp.com/login/'+invite._id
                    });

                mailer.send(function(err, result) {
                    if (err) { 
                        console.log(err); 
                    }
                    callback(null, 'Invitation sent to '+ invite.invite_email);
                });
            });
        }
    ], 
    function(err, results){
        if(err){console.log(err);}
        next(null, results);
    });
};