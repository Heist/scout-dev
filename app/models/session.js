'use strict';
//  session.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
		_tests  : [{ type: Schema.Types.ObjectId, ref: 'Test'}],

		name 	: { type: String, trim: true, default: 'New Session'},
		
		runcount : Number
})

module.exports = mongoose.model('Session', SessionSchema);