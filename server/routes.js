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

// console logging
app.use(function(req, res, next) {
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});


// AUTH ROUTES ============================================
// route middleware to ensure user is logged in - ajax get
function isLoggedInAjax(req, res, next) {
    if (!req.isAuthenticated()) {
		return res.send( 401, "unauthorized request");
	} else {
		console.log('login good');
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
            console.log('user _id login', req.user._id);
            var user = req.user._id;
            // mongoose.Types.ObjectId();
            return res.json({ user: mongoose.Types.ObjectId(user), redirect: '/overview' });
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
            console.log('user _id register', req.user._id);
            var user = req.user._id;
            return res.json({ user: user, redirect: '/overview' });
        });
    })(req, res);
});

app.post('/auth/logout', function(req, res) {
	console.log('logout request', req);
   req.logout();
   res.json({ redirect: '/login' });
});


// PUBLIC ROUTES ==========================================

// Debug Route -------------------
app.route('/debug/test')
	.get(function(req,res){
		Test.find()
			.exec(function(err, docs) {
				if(err) res.send(err);

				res.json(docs);
			});
	});

app.route('/debug/task')
	.get(function(req,res){
		Task.find()
			.exec(function(err, docs) {
				if(err) res.send(err);

				res.json(docs);
			});
	});

app.route('/debug/tag/')
		.get(function(req,res){
			Tag.find(function(err, tags) {
					if(err) res.send(err);

					res.json(tags);
				})
			});

// Report Route ------------------
// for some reason I can't require this and still have it be public
//  ¯\_(ツ)_/¯

app.route('/api/report/:_id')
	.get(function(req, res){
		console.log('touched report get');

		var reply = {};
		var promise =
			Test.findOne({'_id' : req.params._id}).populate('_subjects _tags').exec(function(err, test){
				if(err) res.send(err);

				// Tag.populate(test._tags, {'path': '_messages', match: { fav : true }});

			});

		promise.then(function(test){
			reply.test = test;
			// a promise-then pair: Then must RETURN something to the promise. Backwards chaining.
			return Task.find({'_test':req.params._id})
						.populate({'path': '_messages', match: { fav : true }})
						.select('_id summary name pass_fail desc _messages')
						.exec(function(err, tasks){
							if(err) res.send(err);
							// console.log('tasks', tasks);
						});
			// in here, this has to have all the messages for this task that are also fav'd
		})
		.then(function(tasks){
			reply.tasks = tasks;
			// console.log(tasks)
			
				// for each task, populate the _messages._subject name
				// Subject.find({'_tests': { $in: [req.params._id] }})
			return	Message.find({'_test':req.params._id, 'fav' : true})
						.populate({path: '_subject', 'select': 'name -_id'})
						.select('_subject body created_by _id')
						.exec(function(err, message){
							// console.log(message)
						});
						
			
		}).then(function(messages){
			// console.log('hello', reply.tasks.length)
			// console.log('messages', messages)

			// TODO: NONE OF THIS SCALES AT ALL.
			// replace tag messages with messages that are populated
			for (var i = 0; i < reply.test._tags.length; i++ ){
				var baseTag = reply.test._tags[i];
				// console.log('baseTag', baseTag._id);
				if(baseTag._messages.length > 0){
					// console.log('there are messages', baseTag._messages.length)

					for(var j = 0; j < baseTag._messages.length; j++){
						console.log('baseTag message _id', baseTag._messages[j]);
						// console.log('messages array', messages.length)
						for(var k = 0; k < messages.length; k++){
							// console.log(messages[k]._id)

							msg_id = messages[k]._id.toString();
							rply_id = baseTag._messages[j].toString();
							
							// console.log('msg_id', msg_id)
							// console.log('rply_id', rply_id)
							
							if( msg_id == rply_id){
								console.log('ping');
								baseTag._messages[j] = messages[k];
							}
						}
					}

				}

				// console.log('new messages', baseTag._messages);
			}

			// console.log('reply tags', reply.test._tags )
			// tear out whatever tasks think are their messages
			// replace with their actual messages
			for(var i =0; i<reply.tasks.length; i++){
				if(reply.tasks[i]._messages){
					for(var j = 0; j<reply.tasks[i]._messages.length; j++){
					// console.log('reply task message id', reply.tasks[i]._messages[j]._id)
						for(var k = 0; k < messages.length; k++){
							msg_id = messages[k]._id.toString();
							rply_id = reply.tasks[i]._messages[j]._id.toString();

							// console.log('msg_id', msg_id)
							// console.log('rply_id', rply_id)

							if( msg_id == rply_id){
								// console.log('ping')
								reply.tasks[i]._messages[j] = messages[k];
							}
						}
					}
				}
				// console.log(reply.tasks[i]._messages)	
			}
			
			res.json(reply);
		})
		.then(null, function(err){
			if(err) return res.send (err);
			
		});
	});

// MIDDLEWARE TO BLOCK NON-AUTHORIZED USERS ===============
// this effectively prevents unlogged users from getting data

app.use('/api',  isLoggedInAjax, function (req, res, next) {
	// for calls that start with api....
	console.log('touched the api tag');

	next();
});

// app.use('/api', function (req, res, next) {
// // for calls that start with api....
// console.log('touched the api tag');

//	next();
// });

// OBJECT ROUTES =========================================

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