// forgot.js
'use strict';

module.exports = function(app, passport, debug) {

    // Module dependencies
    var mongoose = require('mongoose');  // THIS MAKES MESSAGE AGGREGATION WORK IN TEST RETURNS FOR SUMMARIES.
    var _ = require('lodash');
    var async = require('async');
    var crypto = require('crypto');
    var nodemailer = require('nodemailer');

    // Models
    var User = require('../models/auth/user');

    app.post('/auth/forgot', function(req, res, next) {
        console.log('touched forgotten password route');
        
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                User.findOne({ email: req.body.email }, function(err, user) {
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
                        to: user.email,
                        from: 'passwordreset@demo.com',
                        subject: 'Node.js Password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };

                    smtpTransport.sendMail(mailOptions, function(err) {
                        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                        done(err, 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                    });
                } else {
                    done(null, null);
                }
            } 
        ], function(err, results) {
            if (err){ return next(err); }
            console.log('waterfall results email', results);
            res.send(results);
        });
    });
};