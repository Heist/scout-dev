// db.js
'use strict';

var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://104.236.16.159:27017/field_guide_app');

var auth_db = db.useDb('field_guide_users');

module.exports = {auth: auth_db, db: db};

// this segment does not work right now.
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
             // yay!
    });