    var mongoose = require('mongoose');  // SOMETIMES WE NEED OBJECTIDS
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

    var User    = require('../models/auth/user');
    var Invitation = require('../models/auth/invitation');
    var Emailer  = require('../models/mailer');


 // INVITATION ROUTES ==================================
    app.route('/api/invite/')
        .post(function(req,res){
            async.waterfall([
                function(callback){
                    User.findOne({'local.email' : req.body.address })
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
                        .findOne({'user_email' : req.body.address})
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
                    var invite = new Invitation();
                    invite._account = req.user._account;
                    invite.created_by = req.user._id;
                    invite.user_email = req.body.address;
                    invite.save();

                    var envelope_options = {
                            to: {
                                email: invite.user_email,
                            },
                            author: invite._account,
                            subject: "Invite from Field Guide",
                            template: "invite"
                        };

                    var message_variables = {
                        created_by: req.user.name,
                        invite_link: 'http://projects.fieldguideapp.com/login/'+invite._id
                    };

                    var mailer = new Emailer(envelope_options, message_variables);

                    mailer.send(function(err, result) {
                        if (err) { 
                            console.log(err); 
                        }
                        callback(null, 'Invitation sent to '+ invite.user_email);
                    });
                }
            ], 
            function(err, results){
                if(err){console.log(err);}
                res.send(results);
            });
        });
