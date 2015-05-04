// reset-lost-password
// resets a lost user password via token
'use strict';


module.exports = function(token, pass, app, next){
// Module dependencies ==========================
    // var async      = require('async');
    var bcrypt     = require('bcrypt-nodejs');
    var nodemailer = require('nodemailer');
    var Bluebird   = require('bluebird');
    var models     = Bluebird.promisifyAll(require('../../models'));

// load functions ===============================
    function generateHash(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); }

// RESET A LOST PASSWORD ==================================

    var resetPasswordMail = function(user){
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
            subject: 'Your Field Guide password has been changed',
            text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
        };

        smtpTransport.sendMail(mailOptions, function(err) {
            next(null, 'The password for your account '+ user.local.email +' has been changed.')
        });
    }

    models.User.findOneAsync({name : 'login'}).then(function(user2){
        models.User.findOneAsync({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
            .then(function(user){
                if (user === null ){ 
                    console.log('no user found'); 
                    return next(null, 0);
                }

                // TODO: Abstract this shit onto the user model
                user.local.password = generateHash(pass);
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err, usr){
                    console.log('saved user', usr);
                    if(usr === 0){ return next(null, usr); }

                    resetPasswordMail(usr);
                });
            })
    })
    .catch(function(err){
        if(err){console.log(err)}
    })
};