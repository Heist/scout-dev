// server/models/auth/account.js
// controls accounts, which contain users and select for tests

'use strict';

// var mongoose = require('mongoose');
// var connection = require('../../db/auth_db');

var mongoose = require('mongoose');
var connect = require('../../db/db');
connect = connect.auth;

var Schema = mongoose.Schema;

// define the schema for our user model
var accountSchema = new Schema({

    team_name : { type : String},
    created : {type : Date }

});

accountSchema.pre('save', function(next){
    var now = new Date();
    if ( !this.created ) {
        this.created = now;
    }
    next();
});

// create the model for users and expose it to our app
module.exports = connect.model('Account', accountSchema);