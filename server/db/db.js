// db.js
'use strict';

var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/field_guide_app');

var auth_db = db.useDb('field_guide_users');

module.exports = {auth: auth_db, db: db};


// // create a connection to a database
// var db = mongoose.createConnection(uri);

// // use another database without creating additional connections
// var db2 = db.useDb('someDbName');

// // proceed as you would normally
// var Model1 = db.model('Model1', m1Schema);
// var Model2 = db2.model('Model2', m2Schema);