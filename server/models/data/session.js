//  session.js
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var connect = rootRequire('./config/db');
var db = connect.db;

var SessionSchema = new Schema({
        _tests  : [{ type: Schema.Types.ObjectId, ref: 'Test'}],

        name     : { type: String, trim: true, default: 'New Session'},
        
        runcount : Number
})

module.exports = db.model('Session', SessionSchema);