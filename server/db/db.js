// db.js
'use strict';

var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/field_guide_app');

module.exports = db;