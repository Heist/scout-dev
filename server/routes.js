// routes.js
module.exports = function(app, passport) {
// CONFIGURATION =====================================================

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var async = require('async');
    var _ = require('underscore');

    // various api hooks for reports
    var Trello  = require('node-trello');

    // load data storage models
    var Message = require('./models/data/message');
    var Task    = require('./models/data/task');
    var Test    = require('./models/data/test');
    var Tag     = require('./models/data/tag');
    var Subject    = require('./models/data/subject');
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
            res.send(req.isAuthenticated() ? {
                    _id : req.user._id, 
                    name: req.user.name, 
                    email: req.user.local.email, 
                    account:req.user._account, 
                    trello : req.user.trello.id 
                } : '0');
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

                return res.json({ user: mongoose.Types.ObjectId(req.user._id), redirect: '/overview', msg:'login worked' });
            });
        })(req, res);
    });

    // process the signup form
    app.post('/auth/signup', function(req, res, next) {
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
                res.json({ 'user': req.user._id, 'name':req.user.name, redirect: '/overview', msg:'register user worked' });
            });
        })(req, res);
    });

    app.post('/auth/logout', function(req, res) {
        // console.log('logout request', req);
        req.logout();
        res.json({ redirect: '/login' });
    });


// PUBLIC ROUTES ==========================================
app.route('/auth/invite/:_id')
        .get(function(req,res){
            // get an existing invitation to populate the registration page
            Invitation.findById(req.params._id)
                      .select('user_email')
                      .exec(function(err,invite){
                            if(err) { return console.log(err); }
                            
                            res.json(invite);
                        });
        })


// Debug Routes -------------------
    app.route('/debug/test')
    .get(function(req,res){
        Test.find()
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });

    app.route('/debug/test/:_id')
    .get(function(req,res){
        Test.find({'_id': req.params._id})
            .populate('_tasks')
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });    

    app.route('/debug/task')
    .get(function(req,res){
        Task.find()
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });

    app.route('/debug/message')
    .get(function(req,res){
        Message.find()
            .populate('_comments')
            .exec(function(err, docs) {
                if(err){res.send(err);}

                res.json(docs);
            });
    });

    app.route('/debug/tag')
        .get(function(req,res){
            Tag.find(function(err, docs) {
                    if(err){res.send(err);}

                    res.json(docs);
                });
        });

    app.route('/debug/user')
        .get(function(req,res){
            User.find(function(err, users) {
                    if(err){res.send(err);}

                    res.json(users);
                });
        });

    app.route('/debug/invite')
        .get(function(req,res){
            Invitation.find(function(err, invites) {
                    if(err){res.send(err);}

                    res.json(invites);
                });
        });

    app.route('/debug/subject')
        .get(function(req,res){
            Subject.find()
                .exec(function(err, docs) {
                    if(err){res.send(err);}

                    res.json(docs);
                });
        });

// PUBLIC REPORT ROUTE ==============================================
// for some reason I can't require this and still have it be public
//  ¯\_(ツ)_/¯

    app.route('/api/public/report/:_id')
    .get(function(req, res){
        console.log('touched report get', req.params._id);

        // var t = new Trello ();

        var test_id = mongoose.Types.ObjectId(req.params._id);
        var reply = {};

        async.parallel({
                    tags: function(callback){
                        Tag.find({'_test' : req.params._id })
                            .populate('_messages')
                            .sort({name: 1})
                            .exec(function(err, docs){
                                if (err) {console.log(err);}
                                callback(null, docs);
                            });
                    },
                    tasks: function(callback){
                        Task.find({'_test': req.params._id})
                            .sort({ index: 'asc'})
                            .populate('_messages')
                            .exec(function(err, docs){
                                if (err) {console.log(err);}
                                callback(null, docs);
                            });
                    },
                    test: function(callback){
                        Test.find({'_id' : req.params._id})
                            .limit(1)
                            .exec(function(err, docs){
                                if(err){console.log(err);}
                                callback(null, docs);
                            });
                    },
                    messages: function(callback){
                        Message.find({ '_test':{$in: [req.params._id]}})
                               .populate({path:'_subject', select: 'name' })
                               .exec(function(err, docs){
                                    if(err){console.log(err);}
                                    callback(null, docs);
                                });
                    }
                },
                function(err, results) {
                    // results is now equals to: {one: 1, two: 2}
                    console.log('get results', results);
                    var return_array = [];
                    _.each(results.test, function(test){
                        return_array.push(test);
                    });
                    _.each(results.tasks, function(task){
                        return_array.push(task);
                    });
                    _.each(results.tags, function(tag){
                        return_array.push(tag);
                    });
                    // callback(null, );

                    res.json({navlist: return_array, messages: results.messages});
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
    require('./routes/account')(app);

// OBJECT ROUTES ==========================================

// Session Routes
    require('./routes/session')(app);

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

// Reporting and Comments 
    require('./routes/reportPrivate')(app);

};