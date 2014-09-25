'use strict';
//  session.js
var db = require('./server/db/db');
var Schema = db.Schema;

var SessionSchema = new Schema({
		_tests  : [{ type: Schema.Types.ObjectId, ref: 'Test'}],

		name 	: { type: String, trim: true, default: 'New Session'},
		
		runcount : Number
})

module.exports = db.model('Session', SessionSchema);