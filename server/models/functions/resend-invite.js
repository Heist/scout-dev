// resend-invite.js
// Resend an extant invitation
'use strict';

module.exports = function(inviteId, inviter, next){

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
    Invitation.findById(inviteId)
        .exec(function(err,invite){
            
            var envelope_options = {
                to: {
                    email: invite.invite_email,
                },
                author: inviter.name,
                subject: "Invite from Field Guide",
                template: "invite"
            };

            var message_variables = {
                invitation_by: "Field Guide",
                invite_link: 'http://projects.fieldguideapp.com/login/'+invite._id
            };

            var mailer = new Emailer(envelope_options, message_variables);

            mailer.send(function(err, result) {
                if (err) {
                    return console.log(err);
                }else{
                    console.log('Message sent: ' + result.response);
                    next(invite);
                }
            });
        });
};