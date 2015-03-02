// forgot-password-token
// reset a user's password and send them a token for setting their account
'use strict';

module.exports = function(emailAddress, app, next){
// Module dependencies ==========================
    var async   = require('async');
    var crypto  = require('crypto');
    var nodemailer = require('nodemailer');

// load data models =============================
    var User    = global.rootRequire('./server/models/auth/user');

// load functions ===============================

// SEND A LOST PASSWORD TOKEN =============================
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ 'local.email': emailAddress }, function(err, user) {
                if (!user) {
                    done(err, token, '0');
                } else {
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                }
            });
        },
        function(token, user, done) {
            console.log('waterfall', user, token);
            if(user !== '0'){
                var smtpTransport = nodemailer.createTransport({
                    service: 'Mandrill',
                    auth: {
                        user: 'mandrill@fieldguideapp.com',
                        pass: app.locals.mandrillSecret
                    },
                    host: "smtp.mandrillapp.com",
                    port: 587
                });

                var mailOptions = {
                    to: user.local.email,
                    from: 'password_reset@fieldguideapp.com',
                    subject: 'Field Guide Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your Field Guide account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://projects.fieldguideapp.com/forgot/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };

                smtpTransport.sendMail(mailOptions, function(err) {
                    done(err, 'An e-mail has been sent to ' + user.local.email + ' with further instructions.');
                });
            } else {
                done(null, null);
            }
        } 
    ], function(err, results) {
        if (err){ return next(err); }
        console.log('waterfall results email', results);
        next(null, results);
    });  
};