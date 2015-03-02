// routes.js
module.exports = function(app, passport, debug) {
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
    var Comment = require('./models/data/comment');
    var Message = require('./models/data/message');
    var Task    = require('./models/data/task');
    var Test    = require('./models/data/test');
    var Tag     = require('./models/data/tag');
    var Subject = require('./models/data/subject');
    var User    = require('./models/auth/user');
    var Invitation = require('./models/auth/invitation');

    // console logging
    app.use(function(req, res, next) {
        // console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

// AUTH ROUTES ============================================
// route middleware to ensure user is logged in - ajax get
    function isLoggedInAjax(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send( 401, "unauthorized request");
        } else {
            // console.log('login good');
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

            // console.log('check me for things', req.user);
            if(req.user){
                if (req.isAuthenticated()) { 
                    res.json({ 
                        _id : req.user._id, 
                        name: req.user.name, 
                        onboard : req.user.onboard,
                        email: req.user.local.email, 
                        account:req.user._account, 
                        trello : req.user.trello.id 
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
        // make sure that you're logged out before trying to log anyone else in
        // req.logout();

        if (!req.body.email || !req.body.password) {
            return res.json({ error: 'Email and Password required' });
        }
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return res.json(err);
            }
            if (user.error) {
                return res.json({ error: user.error });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }

                return res.json({ 'user': mongoose.Types.ObjectId(req.user._id),  'name':req.user.name, redirect: '/overview', msg:'login worked' });
            });
        })(req, res);
    });

    // process the signup form
    app.post('/auth/signup', function(req, res, next) {
        console.log(req.body);
        if (!req.body.email || !req.body.password) {
            return res.json({ error: 'Email and Password required' });
        }
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return res.json(err); }
            
            if (user.error) {
                return res.json({ error: user.error });
            }
            if (info){
                // console.log('auth signup info', info);
            }

            if (user){
                // console.log('auth signup user', user);
            }
            
            req.logIn(user, function(err) {
                if (err) { return res.json(err); }
                // console.log('auth/signup authenticated user', req.user);
                res.json({ 'user': req.user._id, 'onboarding': req.user.onboarding, 'name':req.user.name, redirect: '/overview', msg:'register user worked' });
            });
        })(req, res);
    });

    app.post('/auth/logout', function(req, res) {
        // console.log('logout request', req);

        req.logout();
        res.json({ redirect: '/login' });
    });

// PASSWORD RESET ROUTES ==================================
    // forgotten passwords
    app.post('/auth/forgot', function(req, res, next) {
        var forgotPassword = global.rootRequire('./server/models/functions/forgot-password-token');

        forgotPassword( req.body.email, app, function(err, password){
            res.send(passport);
        });
    });

    // password reset route
    app.get('/reset/:token', function(req, res) {
        console.log('check reset');
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) { res.send('0'); }
            res.send('1');
        });
    });


    app.post('/reset/:token', function(req, res) {
        console.log('password reset queued');
        var resetPassword = global.rootRequire('./server/models/functions/reset-lost-password');

        resetPassword(req.params.token, req.body.password, app, function(err, pass){
            if(err){console.log(err);}
            res.send(pass);
        });
    });


// PUBLIC ROUTES ==========================================
app.route('/auth/invite/:_id')
        .get(function(req,res){
            // get an existing invitation to populate the registration page
            Invitation.findById(req.params._id)
                .select('invite_email')
                .exec(function(err,invite){
                    if(err) { return console.log(err); }
                    
                    res.json(invite);
                });
        })

// Debug Routes -------------------
    // app.route('/debug/test')
    // .get(function(req,res){
    //     Test.find()
    //         .exec(function(err, docs) {
    //             if(err){console.log(err);}

    //             res.json(docs);
    //         });
    // });

    // app.route('/debug/comment')
    // .get(function(req,res){
    //     Comment.find()
    //         .exec(function(err, docs) {
    //             if(err){console.log(err);}

    //             res.json(docs);
    //         });
    // });

    // app.route('/debug/test/:_id')
    // .get(function(req,res){
    //     Test.find({'_id': req.params._id})
    //         .populate('_tasks')
    //         .exec(function(err, docs) {
    //             if(err){console.log(err);}

    //             res.json(docs);
    //         });
    // });    

    // app.route('/debug/task')
    // .get(function(req,res){
    //     Task.find()
    //         .exec(function(err, docs) {
    //             if(err){console.log(err);}

    //             res.json(docs);
    //         });
    // });

    // app.route('/debug/message')
    // .get(function(req,res){
    //     Message.find()
    //         .populate('_comments')
    //         .exec(function(err, docs) {
    //             if(err){console.log(err);}

    //             res.json(docs);
    //         });
    // });

    // app.route('/debug/tag')
    //     .get(function(req,res){
    //         Tag.find(function(err, docs) {
    //                 if(err){console.log(err);}

    //                 res.json(docs);
    //             });
    //     });

    // app.route('/debug/user')
    //     .get(function(req,res){
    //         User.find(function(err, users) {
    //                 if(err){console.log(err);}

    //                 res.json(users);
    //             });
    //     });

    // app.route('/debug/invite')
    //     .get(function(req,res){
    //         Invitation.find(function(err, invites) {
    //                 if(err){console.log(err);}

    //                 res.json(invites);
    //             });
    //     });

    // app.route('/debug/subject')
    //     .get(function(req,res){
    //         Subject.find()
    //             .exec(function(err, docs) {
    //                 if(err){console.log(err);}

    //                 res.json(docs);
    //             });
    //     });

// ACCOUNT EXPORT ROUTE ===================================
// Again, this simply breaks as a Require rather than a direct route. 
//  ¯\_(ツ)_/¯

    // require('./routes/account_export')(app);
    app.route('/auth/export/account/')
        .get(function(req,res){
            var accountExporter = require('./models/functions/account_export');
            accountExporter(req.user._account, function(err, account) {
                if(err){console.log(err);}
                res.json(account);
            });
        });


// PUBLIC REPORT ROUTE ==============================================
// for some reason I can't require this and still have it be public
//  ¯\_(ツ)_/¯

    app.route('/api/public/report/:_id')
    .get(function(req, res){
        var buildSummary = global.rootRequire('./server/models/functions/build-summary');
        buildSummary(req.params._id, function(err, summary){
            if(err){console.log(err);}
            res.json(summary);
        });
    });

// MIDDLEWARE TO BLOCK NON-AUTHORIZED USERS ===============
// this effectively prevents unlogged users from getting data

    app.use('/api',  isLoggedInAjax, function (req, res, next) {
        // for calls that start with api....
        // console.log('touched the api tag');
        next();
    });


// CONNECT ROUTES =========================================

    app.get('/connect/trello',
        passport.authorize('trello-authz', { failureRedirect: '/account' })
        // ,function(req, res) {
        //     res.send({trello : true});
        // }
        );


    app.get('/connect/trello/callback',
      passport.authorize('trello-authz', { failureRedirect: '/account' }),
      function(req, res) {
        // this sends things to the popup window.
        // var script = '$scope.parentWindow = window.opener.$windowScope;
        //              console.log($scope.connector);';
        res.send('<html><head><script>window.opener.inviteCallback(); window.close();</script>'+
                '</head><body><h1>Thanks for attaching your account.</h1></body></html>');
    });

    app.delete('/connect/trello', function(req, res){
        // console.log(req.body);

        req.user.trello.id = '';
        req.user.trello.token = '';
        req.user.trello.tokenSecret = '';
        req.user.save();

        res.json({trello : false});
    });

// ACCOUNT ROUTES =========================================
    require('./routes/account')(app, debug);

// ONBOARDING ROUTES ======================================
    require('./routes/user')(app, passport);

// OBJECT ROUTES ==========================================

// Session Routes
    // require('./routes/session')(app, debug);

// Test Routes
    require('./routes/test')(app, debug);

// Task Routes 
    require('./routes/task')(app, debug);

// Task Routes 
    require('./routes/message')(app, debug);

// Tag Routes
    require('./routes/tag')(app, debug);

// Subject Routes
    require('./routes/subject')(app, debug);


// LIVE ROUTES ============================================

// Run A Test
    require('./routes/run')(app, debug);

// Do A Summary
    require('./routes/summary')(app, debug);

};