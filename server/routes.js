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
    if (req.isAuthenticated())
        return next();
}

// LOGIN ROUTES ===========================================

// is someone logged in?
app.get('/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user._id : '0');
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
				})
			});

app.route('/debug/user/')
		.get(function(req,res){
			User.find(function(err, users) {
					if(err){res.send(err);}

					res.json(users);
				})
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
						.populate({'path': '_messages', match: { fav_task : true }})
						.select('_id summary name pass_fail desc _messages')
						.exec(function(err, tasks){
							if(err){res.send(err);}
							// // console.log('tasks', tasks);
						});
		}).then(function(tasks){
			reply.tasks = tasks;

			return	Message.find({'_test':req.params._id, 'fav_task' : true})
						.populate({path: '_subject', 'select': 'name -_id'})
						.select('_subject body created_by _id _test _task')
						.exec(function(err, message){
							// // console.log(message)
						});
			
		}).then(function(messages){
		

			reply.messages = messages;


			return Tag.find({'_test' : reply.test._id})
						.exists('summary')
						.exec();
		
		}).then(function(tags){

			reply.tags = tags;
			// console.log('reply', reply.tags);
			res.json(reply);
		
		}).then(null, function(err){
			if(err) return res.send (err);
			
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
  passport.authorize('trello-authz', { failureRedirect: '/account' }, function(req,res){
  	// console.log('touched connect-trello')
  	res.send({trello : true});
  })
 );

app.get('/connect/trello/callback',
  passport.authorize('trello-authz', { failureRedirect: '/account' }),
  function(req, res) {
	// this sends things to the popup window.
	res.send("Thanks for attaching your account. You can close this window now.");
  });

app.delete('/connect/trello', function(req, res){
	// console.log(req.body);

	req.user.trello.id = '';
	req.user.trello.token = '';
	req.user.trello.tokenSecret = '';
	req.user.save();

	res.json({trello : false})
});

// ACCOUNT ROUTES =========================================
app.route('/api/account/:_user')
	.get(function(req,res){
		var getUser =  mongoose.Types.ObjectId(req.params._user);

		var promise = 
		 User.findById(getUser).exec();

		promise.then(function(user){
			// console.log('touched user', user)
			
			var reply = {}
			reply.id = user._id;
			reply.trello = false;

			if (user.trello.id){ reply.trello = true}

			// console.log(reply);
			res.json(reply);

		}).then(null, function(err){
			if(err) return res.send (err);
		});
		
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