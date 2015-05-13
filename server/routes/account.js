// /routes/account.js
'use strict';

// ACCOUNT AND Invite ROUTES =========================================

module.exports = function(app){
// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models =====================
    var models  = require('../models');
 
// load functions  ==============================
    var fn  = require('../models/functions')
    var Emailer     = require('../models/mailer');

// Invite ROUTES ======================================
    app.route('/api/account/:_user')
        .get(function(req,res){
        // if there's a user, get a user
        // if there's an account, get the users attached to that account
            var getUser =  mongoose.Types.ObjectId(req.params._user);

            var reply = {};
            var promise = 
                models.User.findById(getUser).exec();

            promise.then(function(user){
                            
                reply.id = user._id;
                reply.email = user.local.email;
                reply.name = user.name;
                reply.account = user._account;
                reply.trello = false;

                if (user.trello.id){ reply.trello = true; }

                return models.User.find({_account: user._account}).select('local.email name _account').exec();

            })
            .then(function(team_members){
                reply.team = team_members;
                
                return models.Invite.find({_account: reply.account, pending: true}).exec();
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
        //     
        //     User.remove({'_id' : req.params._user}, function(err, doc){
        //         if(err) {return res.send (err);}

        //         res.json('User removed');
        //     });
        // });

    // Invite ROUTES ==================================
    app.route('/api/invite/')
        .post(function(req,res){
            // create a new Invite
            fn.createInvite(req.body, req.user, function(err, invite){
                if(err){ console.error(err); }
                res.json(invite);
            });
        });

    app.route('/api/invite/:_id')
        .put(function(req,res){
            // 
        })
        .post(function(req,res){
            // this is to resend an Invite already sent
            fn.resendInvite(req.params._id, req.user, function(err, invite){
                if(err){ console.error(err); }
                res.json(invite);
            });
        })
        .delete(function(req,res){
            models.Invite.remove({'_id': req.params._id}, function(err, invite){
                if(err) {return console.log (err);}
                res.json('Invite recalled');
            });
        });
};
