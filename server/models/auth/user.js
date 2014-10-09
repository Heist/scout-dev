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

    local            : {
        email        : String,
        password     : String,
        name         : String
    },
    trello           : {
        
    },
    github           : {
        
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

// create the model for users and expose it to our app
module.exports = connect.model('User', userSchema);