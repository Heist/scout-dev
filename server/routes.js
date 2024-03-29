// routes.js
'use strict';

module.exports = function(app, passport) {
// CONFIGURATION =====================================================

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var async = require('async');
    var crypto = require('crypto');
    var bcrypt = require('bcrypt-nodejs');
    var _ = require('lodash');
    var nodemailer = require('nodemailer');

// various api hooks for reports
    var Trello  = require('node-trello');

// load data storage models
    var models = require('./models');
    var fn = require('./models/functions')


// AUTH ROUTES ============================================
// route middleware to ensure user is logged in - ajax get
    function isLoggedInAjax(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send( 401, "unauthorized request");
        } else {
            // 
            next();
        }
    }

// route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
    }

// LOGIN ROUTES ===========================================

    // is someone logged in?
    app.get('/loggedin', function(req, res) {
            // 
            if(req.user){
                if (req.isAuthenticated()) { 
                    res.json({ 
                        _id     : req.user._id, 
                        name    : req.user.name, 
                        onboard : req.user.onboard,
                        email   : req.user.local.email, 
                        account : req.user._account, 
                        created : req.user.created || new Date(),
                        trello  : req.user.trello.id 
                    });
                }
            }
            else { res.send('0'); }
        });

    // who's logged in?
    app.get('/auth/login', isLoggedInAjax, function(req, res) {
            return res.json(req.user._id);
        });

    // process the login form
    app.post('/auth/login', function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.json({ error: 'Email and Password required' });
        }

        passport.authenticate('local-login', function(err, user) {
            if (err) { return res.json(err); }
            if (user.error) { return res.json({ error: user.error }); }

            req.logIn(user, function(err) {
                if (err) { return res.json(err); }
                
                res.json({ 'user': mongoose.Types.ObjectId(req.user._id),  'name':req.user.name, redirect: '/overview', msg:'login worked' });
            });
        })(req, res);
    });

    app.post('/auth/logout', function(req, res) {
        req.logout();
        res.json({ redirect: '/login' });
    });


    // process the signup form
    app.post('/auth/signup', function(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.send('Email and Password required');
        }

        passport.authenticate('local-signup', function(err, reply) {
            if (err) { console.error(err) }

            if(reply.user){
                req.logIn(reply.user, function(err) {
                    if (err) { return res.json(err); }
                    res.json({
                        '_id'      : reply.user._id,
                        'user'     : reply.user._id,
                        '_account' : reply.user._account,
                        'email'    : reply.user.local.email, 
                        'name'     : reply.user.name,
                        'msg'      : 'register user worked',
                        'redirect' : '/overview',
                        'onboarding' : reply.user.onboarding
                    });
                });

            } else {
                // there was probably an error somewhere in the chain, we need to find it.
                console.log(reply);
                res.json(reply);
            }
        })(req, res);
    });

// PASSWORD RESET ROUTES ==================================
    // forgotten passwords
    app.post('/auth/forgot', function(req, res, next) {
        console.log('touched forgot route');
        fn.forgotPasswordToken( req.body.email, app, function(err, tokenObject){
            console.log('Forgotten Password Token (should be a "we sent a token" message)', tokenObject);
            res.send(tokenObject);
        });
    });

    // password reset routes
    app.get('/auth/reset/:token', function(req, res) {
        // is there a user with that token?
        models.User.findOne({ 'resetPasswordToken' : req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) { res.send('0'); }
            res.send('1');
        });
    }).post('/auth/reset/:token', function(req, res) {
        // password reset route
        console.log('reset me', req.body, req.params.token);
        fn.resetPassword(req.params.token, req.body.password, app, function(err, resetUserLogin){
            if(err){ console.error(err); }
            if (resetUserLogin === 0){
                console.log('no user found #2', resetUserLogin)
                res.send('0');
            } else {
                console.log('Successful Password Reset (should be able to automatically log in)', resetUserLogin);
                res.send(resetUserLogin);
            }
        });
    });


// PUBLIC ROUTES ==========================================
    app.route('/auth/invite/:_id')
        .get(function(req,res){
            // get an existing Invite to populate the registration page
            models.Invite.findById(req.params._id)
                .select('invite_email')
                .exec(function(err,invite){
                    if(err) { return  }
                    
                    res.json(invite);
                });
        });

// Debug Routes -------------------
    // app.route('/debug/message')
    //     .put(function(req, res){
    //         var connectionOne = require('./models/app-connect');
    //         var Msg = connectionOne.model('Message');
    //         Msg.create({body: 'new message test'}, function(err, update){
    //             if(err){ console.error(err); }
    //             
    //         });
    //     });

    // app.route('/debug/test')
    // .get(function(req,res){
    //     Test.find()
    //         .exec(function(err, docs) {
    //             if(err){ console.error(err); }

    //             res.json(docs);
    //         });
    // });

    // app.route('/debug/comment')
    // .get(function(req,res){
    //     Comment.find()
    //         .exec(function(err, docs) {
    //             if(err){ console.error(err); }

    //             res.json(docs);
    //         });
    // });

    // app.route('/debug/test/:_id')
    // .get(function(req,res){
    //     Test.find({'_id': req.params._id})
    //         .populate('_tasks')
    //         .exec(function(err, docs) {
    //             if(err){ console.error(err); }

    //             res.json(docs);
    //         });
    // });    

    // app.route('/debug/task')
    // .get(function(req,res){
    //     Task.find()
    //         .exec(function(err, docs) {
    //             if(err){ console.error(err); }

    //             res.json(docs);
    //         });
    // });

    // app.route('/debug/message')
    // .get(function(req,res){
    //     Message.find()
    //         .populate('_comments')
    //         .exec(function(err, docs) {
    //             if(err){ console.error(err); }

    //             res.json(docs);
    //         });
    // });

    // app.route('/debug/tag')
    //     .get(function(req,res){
    //         Tag.find(function(err, docs) {
    //                 if(err){ console.error(err); }

    //                 res.json(docs);
    //             });
    //     });

    // app.route('/debug/user')
    //     .get(function(req,res){
    //         User.find(function(err, users) {
    //                 if(err){ console.error(err); }

    //                 res.json(users);
    //             });
    //     });

    // app.route('/debug/invite')
    //     .get(function(req,res){
    //         Invite.find(function(err, invites) {
    //                 if(err){ console.error(err); }

    //                 res.json(invites);
    //             });
    //     });

    // app.route('/debug/subject')
    //     .get(function(req,res){
    //         Subject.find()
    //             .exec(function(err, docs) {
    //                 if(err){ console.error(err); }

    //                 res.json(docs);
    //             });
    //     });

// ACCOUNT EXPORT ROUTE ===================================
// Again, this simply breaks as a Require rather than a direct route. 
//  ¯\_(ツ)_/¯

    // require('./routes/account_export')(app);
    app.route('/auth/export/account/')
        .get(function(req,res){
            fn.accountExporter(req.user._account, function(err, account) {
                if(err){ console.error(err); }
                res.json(account);
            });
        });


// PUBLIC REPORT ROUTE ==============================================
// for some reason I can't require this and still have it be public
//  ¯\_(ツ)_/¯

    app.route('/api/public/report/:_id')
    .get(function(req, res){
        fn.buildSummary(req.params._id, function(err, summary){
            if(err){ console.error(err); }
            res.json(summary);
        });
    });

// MIDDLEWARE TO BLOCK NON-AUTHORIZED USERS =============================================
// this effectively prevents unlogged users from getting data

    app.use('/api',  isLoggedInAjax, function (req, res, next) {
        // for calls that start with api, make sure shit's logged in.
        next();
    });

    // Make default tests for new users before logging them in ==========================
    app.post('/api/newtests/:_id', function(req, res){
        console.log('received newtests request', req.user._id, req.user._account);

        if(req.user){
            fn.defaultTests(req.user._account, req.user._id, function(err, tests){
                if (err) { console.error(err); }
                res.json({redirect: '/overview'});
            });
        } else {
            res.json({error: 'No user found.'})
        }
    })

// ACCOUNT ROUTES =========================================
    require('./routes/account')(app);

// ONBOARDING ROUTES ======================================
    require('./routes/user')(app, passport);

// OBJECT ROUTES ==========================================

// Test Routes
    require('./routes/test')(app);

// Task Routes 
    require('./routes/task')(app);

// Task Routes 
    require('./routes/message')(app);

// Tag Routes
    require('./routes/tag')(app);

// Subject Routes
    require('./routes/subject')(app);


// LIVE ROUTES ============================================

// Run A Test
    require('./routes/run')(app);

// Do A Summary
    require('./routes/summary')(app);

};