// db.js
'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var environment = require('../config/environment-test');
// reminder: this is local because it's local to _the server_
// server's always gon' be local to the code




 // var ip = _.chain(require('os')
 // 			.networkInterfaces())
 // 			.flatten()
 // 			.filter(function(val){ return (val.family == 'IPv4' && val.internal == false) })
 // 			.pluck('address')
 // 			.first()
 // 			.value(); 
 // console.log('IP Address', ip);


console.log(environment());


var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/field_guide_app';
var db = mongoose.createConnection(mongoUrl);
var auth_db = db.useDb('field_guide_users');

module.exports = {auth: auth_db, db: db};

// this segment does not work right now.
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
             // yay!
    });