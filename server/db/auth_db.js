// auth_db.js
'use strict';

var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/field_guide_users');

module.exports = mongoose;
