// step.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StepSchema = new Schema({
		name 	: {
			type: String, 
			trim: true, 
			default: 'new step'
		},
		flow 	:
	});

module.exports = mongoose.model('Flow', FlowSchema);