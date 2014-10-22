// server/models/data/account.js
// controls accounts, which contain users and select for tests

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connect = require('../../db/db');
var db = connect.db;

var Schema = mongoose.Schema;

// define the schema for our user model
var accountSchema = new Schema({

    team_name : { type : String},
    _users: [{ type: Schema.Types.ObjectId }],
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