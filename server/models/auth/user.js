// server/models/auth/user.js
// controls user accounts
'use strict';

// var mongoose = require('mongoose');
// var connection = require('../../db/auth_db');

var mongoose = require('mongoose');
var connect = require('../../db/db');
connect = connect.auth;

var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
 
// define the schema for our user model
var userSchema = new Schema({
    _account: {type: Schema.Types.ObjectId},
    name: {type:String, trim:true},
    local            : {
        email        : String,
        password     : String,
        name         : String
    },
    trello           : {
        id           : String,
        token        : String,
        tokenSecret  : String
    },
    github           : {
        id           : String,
        token        : String,
        tokenSecret  : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// if a user's shared account key does not exist, create an account key.
userSchema.pre('save', function(next){
    var account = mongoose.Types.ObjectId();
    if ( !this._account ) {
        this._account = account;
    }
    // console.log('account inside new user model', this._account);
    next();
});

// create the model for users and expose it to our app
module.exports = connect.model('User', userSchema);