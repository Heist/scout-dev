// routes.js
module.exports = function(app, passport) {
// CONFIGURATION =====================================================

// Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.

    // load data storage models
    var Message = require('./models/data/message');
    var Task    = require('./models/data/task');
    var Test    = require('./models/data/test');
    var Tag     = require('./models/data/tag');
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
			res.send(req.isAuthenticated() ? {_id : req.user._id, name: req.user.local.email, account:req.user._account, trello : req.user.trello.id } : '0');
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

                // console.log('user _id login', req.user._id);

                return res.json({ user: mongoose.Types.ObjectId(req.user._id), redirect: '/overview' });
            });
		})(req, res);
	});

	// process the signup form
	app.post('/auth/signup', function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.json({ error: 'Email and Password required' });
        }
        passport.authenticate('local-signup', function(err, user, info) {
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
                // console.log('user _id register', req.user._id);
                var user = req.user._id;
                return res.json({ user: user, redirect: '/overview' });
            });
        })(req, res);
	});

	app.post('/auth/logout', function(req, res) {
		// console.log('logout request', req);
        req.logout();
        res.json({ redirect: '/login' });
	});


// PUBLIC ROUTES ==========================================

// Debug Route -------------------
app.route('/debug/test')
	.get(function(req,res){
		Test.find()
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
			.exec(function(err, docs) {
				if(err){res.send(err);}

				res.json(docs);
			});
	});

app.route('/debug/tag/')
		.get(function(req,res){
			Tag.find(function(err, docs) {
					if(err){res.send(err);}

					res.json(docs);
				});
		});

app.route('/debug/user/')
		.get(function(req,res){
			User.find(function(err, users) {
					if(err){res.send(err);}

					res.json(users);
				});
		});

app.route('/debug/invite/')
        .get(function(req,res){
            Invitation.find(function(err, invites) {
                    if(err){res.send(err);}

                    res.json(invites);
                });
        });

// Report Route ------------------
// for some reason I can't require this and still have it be public
//  ¯\_(ツ)_/¯

app.route('/api/report/:_id')
	.get(function(req, res){
		// console.log('touched report get', req.params._id);

		var test_id = mongoose.Types.ObjectId(req.params._id);
		var reply = {};
		var promise =
			Test.findOne({'_id' : test_id}).populate('_subjects').exec(function(err, test){
				if(err){res.send(err);}

			});

		promise.then(function(test){
			reply.test = test;

			return Task.find({'_test':req.params._id})
						.select('_id summary name pass_fail desc _messages')
						.exec();

		}).then(function(tasks){
			reply.tasks = tasks;

			return Tag.find({'_test' : req.params._id})
						.exists('summary')
						.exec();
		
		}).then(function(tags){
			reply.tags = tags;
			
			return	Message.find({'_test':req.params._id, $or: [{ fav_task : true }, { fav_tag : true }]})
						.populate({path: '_subject', 'select': 'name -_id'})
						.select('_subject body created_by _id _test _task fav_tag fav_task')
						.exec();
			
		}).then(function(messages){
			
			reply.messages = messages;

			res.json(reply);
		
		}).then(null, function(err){
			if(err) {return res.send (err);}
		});
	});

// MIDDLEWARE TO BLOCK NON-AUTHORIZED USERS ===============
// this effectively prevents unlogged users from getting data

app.use('/api',  isLoggedInAjax, function (req, res, next) {
	// for calls that start with api....
	// console.log('touched the api tag');

	next();
});

// app.use('/api', function (req, res, next) {
// // for calls that start with api....
// // console.log('touched the api tag');

//	next();
// });

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
        res.send('<html><head><script>window.opener.inviteCallback(); window.close();</script></head><body><h1>Thanks for attaching your account.</h1></body></html>');
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
            } else {
                console.log('no user with that e-mail');
                var invite = new Invitation();
    
                invite._account = req.user._account;
                invite.created_by = req.user._id;
                invite.user_email = req.body.address;

                invite.save(function(err,data){
                    if(err) {return res.send (err);}
                    
                    res.json(data);
                });
            }

            
        });

        res.send('user invite sent');
    })
    .delete(function(req,res){
        console.log('touched delete user');
        User.remove({'_id' : req.params._user}, function(err, doc){
            if(err) {return res.send (err);}

            res.json('User removed');
        });
    });


app.route('/api/invite/:_id')
    .delete(function(req,res){

        Invitation.remove({'_id': req.params._id}, function(err, invite){
            if(err) {return res.send (err);}

            res.json('Invitation recalled');
        })

    });
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

};