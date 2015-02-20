// /routes/account.js
'use strict';

// ACCOUNT AND INVITATION ROUTES =========================================

module.exports = function(app, debug){

    var mongoose = require('mongoose');  //THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

    var User    = require('../models/auth/user');
    var Invitation = require('../models/auth/invitation');
    var Emailer  = require('../models/mailer');

    // if there's a user, get a user
    // if there's an account, get the users attached to that account

    app.route('/api/account/:_user')
        .get(function(req,res){
            var getUser =  mongoose.Types.ObjectId(req.params._user);

            var reply = {};
            var promise = 
                User.findById(getUser).exec();

            promise.then(function(user){
                            
                reply.id = user._id;
                reply.email = user.local.email;
                reply.name = user.name;
                reply.account = user._account;
                reply.trello = false;

                if (user.trello.id){ reply.trello = true; }

                return User.find({_account: user._account}).select('local.email name _account').exec();

            })
            .then(function(team_members){
                reply.team = team_members;
                
                return Invitation.find({_account: reply.account, pending: true}).exec();
            })
            .then(function(invites){
                reply.invites = invites;

                res.json(reply);
            })
            .then(null, function(err){
                if(err) {return res.send (err);}
            });
            
        });

        // .delete(function(req,res){
        //     console.log('touched delete user');
        //     User.remove({'_id' : req.params._user}, function(err, doc){
        //         if(err) {return res.send (err);}

        //         res.json('User removed');
        //     });
        // });

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
                        .findOne({'invite_email' : req.body.address})
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
                        _account : req.user._account,
                        created_by_user : req.user._id,
                        invite_email : req.body.address
                    }, function(err, invite){
                        if(err){ console.log(err); }

                        var mailer = new Emailer(
                            { to: { email: invite.invite_email, },
                              author: invite._account,
                              subject: "Invite from Field Guide",
                              template: "invite"
                            },
                            { invitation_by: req.user.name,
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
                res.send(results);
            });
        });

    app.route('/api/invite/:_id')
        .put(function(req,res){
            console.log('invite put');
        })
        .post(function(req,res){
            // this is to resend an invitation already sent

            Invitation.findById(req.params._id).exec(function(err,invite){
                res.json(invite);

                var envelope_options = {
                    to: {
                        email: invite.invite_email,
                    },
                    author: req.user.name,
                    subject: "Invite from Field Guide",
                    template: "invite"
                };

                var message_variables = {
                    invitation_by: "Field Guide",
                    invite_link: app.locals.real_url+'/login/'+invite._id
                };

                var mailer = new Emailer(envelope_options, message_variables);

                mailer.send(function(err, result) {
                    if (err) {
                        return console.log(err);
                    }else{
                        console.log('Message sent: ' + result.response);
                    }
                });

            });
        })
        .delete(function(req,res){
            Invitation.remove({'_id': req.params._id}, function(err, invite){
                if(err) {return res.send (err);}

                res.json('Invitation recalled');
            });

        });
};
