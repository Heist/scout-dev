// /routes/account.js
'use strict';

// ACCOUNT AND INVITATION ROUTES =========================================

module.exports = function(app){

    var mongoose = require('mongoose');  //THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');

    var User    = require('../models/auth/user');
    var Invitation = require('../models/auth/invitation');
    var Emailer  = require('../models/mailer');

    //if there's a user, get a user
    // if there's an account, get the users attached to that account

    app.route('/api/account/:_user')
        .get(function(req,res){
            var getUser =  mongoose.Types.ObjectId(req.params._user);

            var reply = {};
            var promise = 
                User.findById(getUser).exec();

            promise.then(function(user){
                // console.log('touched user', user)
                            
                reply.id = user._id;
                reply.email = user.local.email;
                reply.name = user.name;
                reply.account = user._account;
                reply.trello = false;

                if (user.trello.id){ reply.trello = true; }

                // console.log(reply);
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

            var promise = User.findOne({'local.email' : req.body.address }).exec();

            promise.then(function(user){
                // if there is a user with that name already ....
                if(user !== null){ 
                    user._account = req.user._account;
                    user.save(function(err,data){
                        console.log('existing user updated', data.user_email);

                        res.json({
                            email: data.local.email, 
                            name: data.name, 
                            _id: data._id, 
                            _account: data._account,
                            msg:'user found'
                        });
                    });
                    throw new Error('User found');
                }

                else {
                // No user? Find an invitation for that req.body.address
                    return Invitation.findOne({'user_email' : req.body.address}).exec();
                }
            })
            .then(function(i){
                // console.log(i);
                if(i){
                    res.send('You have already sent that invitation.');
                } else {
                    console.log('no invitation exists');
                    
                    var invite = new Invitation();
        
                    invite._account = req.user._account;
                    invite.created_by = req.user._id;
                    invite.user_email = req.body.address;

                    invite.save(function(err,data){
                        if(err) {return res.send (err);}
                    });

                    return invite;
                }
            })
            .then(function(invite){
                // console.log('invite new no id', invite);
                res.json(invite);

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
                    invite_link: 'http://'+app.locals.real_url+'/login/'+invite._id
                };

                var mailer = new Emailer(envelope_options, message_variables);

                mailer.send(function(err, result) {
                    if (err) { return console.log(err); }
                    else {
                        // console.log('Message sent: ' + result.response);
                    }
                });

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
                        email: invite.user_email,
                    },
                    author: req.user.name,
                    subject: "Invite from Field Guide",
                    template: "invite"
                };

                var message_variables = {
                    created_by: "Field Guide",
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
