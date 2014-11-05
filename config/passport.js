// config/passport.js
'use strict';

// expose this function to our app using module.exports
module.exports = function(app, passport) {

        // load all the things we need
    var LocalStrategy   = require('passport-local').Strategy;
    var TrelloStrategy = require('passport-trello').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    // load up the user model
    var User = require('../server/models/auth/user');
    var Invitation = require('../server/models/auth/invitation');

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

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    {return done(err);}

                // if no user is found, return the message
                if (!user)
                    {return done(null, { error: 'No user found. ' });}

                if (!user.validPassword(password))
                    {return done(null, { error: 'Oops! Wrong password.' });}

                // all is well, return user
                else
                    {return done(null, user);}
            });
        });
    }));

// =========================================================================
// LOCAL SIGNUP =============================================================
// =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done){
        if (email) {email = email.toLowerCase();} // Use lower-case e-mails to avoid case-sensitive e-mail matching
        
        console.log('new user signup account touched', req.body._account);

        function generateHash(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }

        // asynchronous
        process.nextTick(function() {
            console.log('passport user', req.user);
            
            if (!req.user) {
                // if the user is not already logged in:
                User.findOne({ 'local.email' :  email }, function(err, first_user) {
                    // if there are any errors, return the error
                    if (err){return done(err);}

                    console.log('found a user?', first_user);
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, { error: 'That email is already taken.' });
                    }

                    else {
                        console.log('made it to signups', req.body);
                        var reply = {};
                        var promise = User.create({
                                'name' : req.body.name,
                                'local.email' : email ,
                                'local.password' : generateHash(password)
                            });

                        promise.then(function(usr){
                            reply.usr = usr; // pass along user to reply at the end.
                            // if there's an account - ie, this is by invitation
                            // find the invitation and set it to accepted
                            // then update the user _account to exist
                            console.log('inside promise user passport', usr);

                            // find some invitations
                            return Invitation.findOne({'user_email' : usr.local.email}).exec(function(err, invite){
                                if (err){throw err;}
                                console.log('inside passport invite', invite, usr);
                                if (!invite){
                                    // there are no invitations for that user
                                    console.log('no invite');
                                    // return done(null); This breaks the whole promise chain.
                                } else {
                                    // attach the appropriate account to the user and return
                                    invite.pending = false;
                                    invite.save(function(err, inv){
                                        if (err){throw err;}
                                    });
                                }
                            });
                        }).then(function(invite_data){
                            console.log('passport new user data return last promise invite data', invite_data);
                            console.log('reply.usr', reply.usr);
                            // TODO: fix this - it should update the user account with the invite data if there is any
                            // otherwise it should spit out a user account. 
                            User.findOne({'_id':reply.usr._id})
                                .exec(function(err, doc){
                                    if(invite_data){
                                        doc._account = invite_data._account;
                                    }
                                    doc.save(function(err, saved){
                                        if (err){throw err;}
                                        console.log('user within invitation find save', saved);
                                        // send the new user object back, having fixed up their invitational status.
                                        return done(null, saved);
                                    });
                                });
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.local.email ) {
                console.log(req.user);
                // ...presumably they're trying to connect a local account
                var user            = req.user;
                user.local.email    = email;
                user.local.password = user.generateHash(password);
                user.save(function(err, data) {
                    if (err) {throw err;}
                    console.log('there is a user, and we have saved them', data)
                    Invitation.findOne({'user_email' : data.local.email}).exec(function(err, docs){
                        if (!docs){
                            return done(null, data);
                        } else {
                            data._account = docs._account;
                            data.save(function(err, saved){
                                return done(null, saved);
                            });
                        }
                    });

                    
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                console.log("apparently we're not logged out.")
                return done(null, req.user);
            }

        });
    }
));

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
        
        // this is how you authorize someone, but you could do
        // service.id: profile.id and authenticate them
        // then add a new account otherwise.
        
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