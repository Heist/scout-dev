// /routes/account.js
'use strict';

// ACCOUNT AND INVITATION ROUTES =========================================

module.exports = function(app, debug){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // Permits use of ObjectID type
    var _        = require('lodash');
    var async    = require('async');
    var Promise  = require('bluebird');

// Load models ==================================
    var User        = global.rootRequire('./server/models/auth/user');
    var Invitation  = global.rootRequire('./server/models/auth/invitation');
    var Emailer     = global.rootRequire('./server/models/mailer');

// Load functions ===============================
    var createInvite = global.rootRequire('./server/models/functions/create-invite');
    var resendInvite = global.rootRequire('./server/models/functions/resend-invite');

// INVITATION ROUTES ======================================
    app.route('/api/account/:_user')
        .get(function(req,res){
        // if there's a user, get a user
        // if there's an account, get the users attached to that account
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
            // create a new invitation
            createInvite(req.body, req.user, function(err, invite){
                if(err){console.log(err);}
                res.json(invite);
            });
        });

    app.route('/api/invite/:_id')
        .put(function(req,res){
            console.log('invite put');
        })
        .post(function(req,res){
            // this is to resend an invitation already sent
            resendInvite(req.params._id, req.user, function(err, invite){
                if(err){console.log(err);}
                res.json(invite);
            });
        })
        .delete(function(req,res){
            Invitation.remove({'_id': req.params._id}, function(err, invite){
                if(err) {return console.log (err);}
                res.json('Invitation recalled');
            });
        });
};
