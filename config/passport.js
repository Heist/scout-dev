// config/passport.js
'use strict';

// expose this function to our app using module.exports
module.exports = function(app, passport) {

    // load all the things we need
    var LocalStrategy   = require('passport-local').Strategy;
    var TrelloStrategy = require('passport-trello').Strategy;
    var bcrypt = require('bcrypt-nodejs');
    var async = require('async');
    var mongoose = require('mongoose');

    // load up the user model
    var User = require('../server/models/auth/user');
    var Invitation = require('../server/models/auth/invitation');
    var passportNewUser = require('../config/passport-new-user');

    // load the auth variables
    var configAuth = require('./auth')(app);

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            // console.log('serialized user?', user);
            done(err, user);
        });
    });

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function(req, email, password, done) {
        if (email) {email = email.toLowerCase();} // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // console.log('touched local login');
        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err) {return done(err);}

                // if no user is found, return the message
                if (!user) { return done(null, { error: 'No user found. ' }); }

                if (!user.validPassword(password))
                    {   return done(null, { error: 'Oops! Wrong password.' });}

                // all is well, return user
                if(user)
                    {  return done(null, user); }
            });
        });
    }));

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
    function generateHash(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); }

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, email, password, done){
            if (req.user){ return done(null, 2); } 
            
            var user = {
                name : req.body.name,
                email : email ? email.toLowerCase() : '' , // Use lower-case e-mails to avoid case-sensitive e-mail matching
                password : password,
                invite: req.body.invite || ''
            };

            passportNewUser(user, function(err, next){
                if(err){console.log(err);}
                done(null, next);
            });
        })
    );

// =========================================================================
// TRELLO AUTHORIZATION ====================================================
// =========================================================================

    passport.use('trello-authz', new TrelloStrategy({
        consumerKey: configAuth.trelloAuth.clientID,
        consumerSecret: configAuth.trelloAuth.clientSecret,
        callbackURL: configAuth.trelloAuth.callbackURL,
        passReqToCallback: true, // we are not using trello to log in to our app.
        trelloParams: {
                scope: "read,write",
                name: "Field Guide",
                expiration: "never"
            }
        }, 
    function(req, token, tokenSecret, profile, done) {
            console.log('touched passport trello');
            
            if (!req.user) {
                console.log('nope! the user is not logged in');
                var reply = 'Sorry, that user is not logged in to Field Guide.';
                return done(null, reply);
            } else {
        
                console.log('yep, looks like someone is logged in', req.user.id);
                
                User.findById(req.user.id)
                .exec(function(err, user) {
                    if (err) { return done(err); }
                    console.log('gotcha,', user._id);

                    user.trello.id = profile.id;
                    user.trello.token = token;
                    user.trello.tokenSecret = tokenSecret;

                    user.save(function(err,data){
                    // pass the user back to routes.js
                        console.log('user saved');
                        return done(null, data);
                    });
                });
            }
        }));
};