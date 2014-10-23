// server/models/data/invitation.js
'use strict';

// Lives in the auth database
// ID of invitation and _account get passed with the invitation
// When a user clicks on an invite link, and goes to register, if they are already registered,
// Pending is set to false and we offer a password reset link

var mongoose = require('mongoose');
var connect = require('../../db/db');
connect = connect.auth;

var Schema = mongoose.Schema;

// define the schema for our user model
var inviteSchema = new Schema({

    _account : { type: Schema.Types.ObjectId },
    user_email: { type: String, trim: true },
    created : { type : Date },
    created_by : { type: Schema.Types.ObjectId, ref: 'User' },
    pending : {type: Boolean, default: true}

});

inviteSchema.pre('save', function(next){
    var now = new Date();
    if ( !this.created ) {
        this.created = now;
    }
    next();
});

module.exports = connect.model('Invitation', inviteSchema);