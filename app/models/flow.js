// flow.js
var mongoose = require('mongoose');

module.exports = mongoose.model('Flow', {
		name		: String,
		link		: String,
		platform	: String,
		desc		: String
	});