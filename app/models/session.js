'use strict';
//  session.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
		_flows  : [{ type: Schema.Types.ObjectId, ref: 'Flow'}],
		name 	: {
			type: String, 
			trim: true, 
			default: 'New Session'
		},
		runcount : Number
})

module.exports = mongoose.model('Session', SessionSchema);