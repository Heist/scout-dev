// server/models/auth/user.js
// controls user accounts
'use strict';

// var mongoose = require('mongoose');
// var connection = require('../../db/auth_db');

var connect = require('../../db/auth_db')
  , mongoose = require('mongoose')
  , async = require('async')
  , _ = require('underscore')
  , bcrypt = require('bcrypt-nodejs')
  , Schema = mongoose.Schema;
 
var UserSchema = new Schema({

    local            : {
        email        : String,
        password     : String,
    }

});

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  user.encryptPassword(user.password, function (error, hash) {
    if (hash) user.password = hash;
    next(error);
  });
});
 
UserSchema.methods.authenticate = function (password, callback) {
  bcrypt.compare(password, this.password, callback);
};
 
UserSchema.methods.encryptPassword = function (password, callback) {
  bcrypt.genSalt(10, function (error, salt) {
    bcrypt.hash(password, salt, callback);
  });
};
 
UserSchema.statics.login = function (user, callback) {
  var password = user.password
    , User = connect.model('User');
 
  async.waterfall([
    function (callback) {
      User.findOne({email: user.email}, callback);
    },
    function (returnedUser, callback) {
      if (!returnedUser) return callback(new Error('Authentication failed.'));
      user = returnedUser;
      user.authenticate(password, callback);
    },
    function (matched, callback) {
      if (!matched) return callback(new Error('Authentication failed.'));
      user.lastLoggedIn = Date.now();
      user.save(callback);
    }
  ], callback);
};
 
module.exports = connect.model('User', UserSchema);