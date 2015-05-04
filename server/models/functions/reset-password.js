// reset-lost-password
// resets a lost user password via token
'use strict';


module.exports = function(token, pass, app, next){
// Module dependencies ==========================
    var async      = require('async');
    var bcrypt     = require('bcrypt-nodejs');
    var nodemailer = require('nodemailer');
    var models     = require('../../models');

// load functions ===============================
    function generateHash(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); }

// RESET A LOST PASSWORD ==================================
    
    async.waterfall([
        function(done) {
            models.User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                console.log('user', user);
                
                if (user !== null ){ console.log('no user found'); done(null, null); 
                    // TODO: Abstract this shit onto the user model
                    user.local.password = user.generateHash(pass);
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function(err) {
                        done(err, user);
                    });
                } else {
                    done(null, null);
                }
            });
        },
        function(user, done) {
            console.log('reset password user', user);
            if(user !== null){
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
                    done(err, 'The password for your account '+ user.local.email +' has been changed.');
                });
            } else {
                done (null, null);
            }
        }
    ], function(err, results) {
        if(err){ console.log(err); }
        console.log(results);
        next(null, results);
    });

};