// auth_db.js
'use strict';

var mongoose = require('mongoose');

var auth_db = mongoose.createConnection('mongodb://localhost/field_guide_users');

module.exports = auth_db;