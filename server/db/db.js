// db.js
'use strict';

var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost/field_guide_app');

module.exports = db;