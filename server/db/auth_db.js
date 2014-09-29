// auth_db.js
'use strict';

var mongoose = require('mongoose');

var auth_db = mongoose.createConnection('mongodb://127.0.0.1:27017/field_guide_users');

module.exports = auth_db;