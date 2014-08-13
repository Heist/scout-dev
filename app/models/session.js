'use strict';
//  session.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
		name 	: {
			type: String, 
			trim: true, 
			default: 'New Session'
		},
		flows	: {
			[FlowSchema]
		}
})

mongoose.model('Session', SessionSchema);

module.exports = mongoose.model('Session', SessionSchema);