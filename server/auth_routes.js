// auth_routes.js
'use strict';

module.exports = function(app, passport){
// load auth models 
var User = require('./models/auth/user');

// console logging
app.use(function(req, res, next) {
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});


// AUTH ROUTES ============================================
// route middleware to ensure user is logged in - ajax get
function isLoggedInAjax(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json( { redirect: '/login' } );
    } else {
        next();
    }
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/overview');
}

auth.get('/auth/login', isLoggedInAjax, function(req, res) {
        return res.json(req.user);
    });

// process the login form
auth.post('/auth/login', function(req, res, next) {
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
            return res.json({ redirect: '/overview' });
        });
    })(req, res);
});

// process the signup form
auth.post('/auth/signup', function(req, res, next) {
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
            return res.json({ redirect: '/overview' });
        });
    })(req, res);
});

auth.post('/auth/logout', function(req, res) {
   req.logout();
   res.json({ redirect: '/login' });
});


// app.route('/user/')
//  .get(function(req,res){
//    User.find({})
//      .exec(function(err, docs){
//        res.json(docs)
//      })
//  })

// PUBLIC ROUTES ==========================================
// public routes should only permit read access on the database
// specifically, the only read access supplied is for the reports view

// MIDDLEWARE TO BLOCK NON-AUTHORIZED USERS ===============

// app.use(function (req, res, next) {
  


//   next();
// })}


