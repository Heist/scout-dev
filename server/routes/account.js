// /routes/account.js
'use strict';

// ACCOUNT AND INVITATION ROUTES =========================================

module.exports = function(app){

    var mongoose = require('mongoose');  //THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('underscore');
    var async = require('async');

    var User    = require('../models/auth/user');
    var Invitation = require('../models/auth/invitation');
    var Emailer  = require('../models/mailer');
    var nodemailer = require('nodemailer');

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
            
        })
        .delete(function(req,res){
            console.log('touched delete user');
            User.remove({'_id' : req.params._user}, function(err, doc){
                if(err) {return res.send (err);}

                res.json('User removed');
            });
        });


    app.route('/api/invite/')
        .post(function(req,res){
            console.log('user posting invite', req.body);

            var promise = User.findOne({'local.email' : req.body.address }).exec(function(err, docs){
                if(err) {return res.send (err);}
                console.log('docs',docs);
            });

            promise.then(function(user){
                console.log('next promise', user);
                if(user !== null){ 
                    res.send('A user with that address already exists.');
                    // if there's a user, say "there's already a user"
                    // maybe reset that user's password?
                    // send something to imply a user by that name already exists?
                }
                
                return Invitation.findOne({'user_email' : req.body.address}).exec();
            })
            .then(function(i){
                console.log(i);
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
                console.log('invite', invite);
                res.json(invite);

                 // var transporter = nodemailer.createTransport({
                 //        service: 'Mandrill',
                 //        auth: {
                 //            user: 'mandrill@fieldguideapp.com',
                 //            pass: 'jvVhe4uJxHB7MFfHabelbg'
                 //        },
                 //        host:           "smtp.mandrillapp.com",
                 //        port:           587
                 //    });

                 //    var mailOptions = {
                 //        from: 'Field Guide Invitations <invite@fieldguide.com>', // sender address
                 //        to: invite.user_email, // list of receivers
                 //        subject: 'Hello ✔ Welcome to Field Guide', // Subject line
                 //        text: 'Hello world ✔', // plaintext body
                 //        html: '<a href="http://"'+app.locals.real_url+'/>Sign up for Field Guide!</a>' // html body
                 //    };


                 //    transporter.sendMail(mailOptions, function(error, info){
                 //        if(error){
                 //            console.log(error);
                 //        }else{
                 //            console.log('Message sent: ' + info.response);
                 //        }
                 //    });

            });
        });

    app.route('/api/invite/:_id')
        .post(function(req,res){
            Invitation.findById(req.params._id).exec(function(err,doc){
                
                console.log('invite', doc);
                res.json(doc);

                var options = {
                    to: {
                        email: "username@domain.com",
                        name: "Rick",
                        surname: "Roll",
                        subject: "Invite from Field Guide",
                        template: "mail-html"
                    }
                };

                var data = {
                    name: "Rick",
                    surname: "Roll",
                    id: "3434_invite_id"
                };

                var mailer = new Emailer(options, data);

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
            console.log(req.params._id);
            Invitation.remove({'_id': req.params._id}, function(err, invite){
                if(err) {return res.send (err);}

                res.json('Invitation recalled');
            });

        });
};
