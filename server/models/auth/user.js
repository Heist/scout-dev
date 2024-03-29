// server/models/auth/user.js
// controls user accounts
'use strict';

var mongoose = require('mongoose');
var connect = global.rootRequire('./config/db');
connect = connect.auth;

var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
 
// Users are the people who log in to our system to use it.
// They live on a separate DB from data.
// This DB is also where we store Invites.

var userSchema = new Schema({
    _account: {type: Schema.Types.ObjectId},
    _invite : {type: Schema.Types.ObjectId},

    created : Date,
    onboarding: {type: Boolean , default : true}, 
    name: {type:String, trim:true},
    onboard : {type: Number, default: 1},
    
    resetPasswordToken: String,
    resetPasswordExpires: Date,

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
userSchema.statics.generateHash = function(password, callback) {
    var pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    callback(null, pass);
};

userSchema.methods.genHash = function(password) {
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
        // if this user is a new user with no account.... 
        this._account = account;
    }
    var now = new Date();
    if ( !this.created ) {
        this.created = now;
    }
    next();
    next();
});

// create the model for users and expose it to our app
module.exports = connect.model('User', userSchema);