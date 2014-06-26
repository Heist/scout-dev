// flow.js
var mongoose = require('mongoose');

module.exports = mongoose.model('Flow', {
		flow_name		: String,
		prototype_link	: String,
		platform		: String,
		desc			: String
	});