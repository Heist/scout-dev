// flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlowSchema = new Schema({
		name 	: {
			type: String, 
			trim: true, 
			default: 'my new flow name'
		},
		link	: {
			type: String, 
			trim: true, 
			default: ''
		},
		desc	: {
			type: String, 
			trim: true, 
			default: ''
		},
		platform: {
			type: String, 
			trim: true, 
			default: 'mobile'
		}
	});

module.exports = mongoose.model('Flow', FlowSchema);