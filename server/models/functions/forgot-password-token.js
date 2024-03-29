// forgot-password-token
// reset a user's password and send them a token for setting their account
'use strict';

module.exports = function(emailAddress, app, next){
// Module dependencies ==========================
    var async   = require('async');
    
    var Bluebird = require('bluebird');
    var generateToken = Bluebird.promisify(require("crypto").randomBytes);
    var nodemailer = require("nodemailer");
    
    var models = require('../../models');

// SEND A LOST PASSWORD TOKEN =============================
    
    var sendToken = function(user, token, done){
        var smtpTransport = nodemailer.createTransport({
                service: 'Mandrill',
                auth: {
                    user: 'mandrill@fieldguideapp.com',
                    pass: app.locals.mandrillSecret
                },
                host: "smtp.mandrillapp.com",
                port: 587
            });

        console.log('this is the local email', user.local.email);

        var mailOptions = {
                to: user.local.email,
                from: 'password_reset@fieldguideapp.com',
                subject: 'Field Guide Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your Field Guide account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://projects.fieldguideapp.com/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

        smtpTransport.sendMail(mailOptions, function(err, sent){
            console.log('this is what we sent', sent);
            done(null, "Thanks! We've sent you a reset link.");
        });
    }

    generateToken(20).then(function(token){
        console.log('we are in forgot-password', token);
        token = token.toString('hex');
        return models.User.findOneAsync({ 'local.email': emailAddress })
        .then(function(user){
            console.log(user);
            if(user !== 'undefined' && user !== null){
                user.resetPasswordToken = token;
                var tomorrow = new Date();
                user.resetPasswordExpires = tomorrow.setDate(tomorrow.getDate() + 1);

                user.save(function(err, done){
                    return sendToken(done, token, function(err, sent){
                        // TODO here's our return statement, all of this is poor style
                        console.log('this is what we sent ', sent, done);
                        next(null, sent);
                    });
                })
            } else {
                next(null, 'No user with that e-mail exists.');
            }
        })
    }).catch(function(err){
        if(err){console.error(err);}
    })
};