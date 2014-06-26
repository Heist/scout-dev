// flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlowSchema = new Schema({
		name		: String,
	});

module.exports = mongoose.model('Flow', FlowSchema);