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
		},
		steps : [StepSchema]
	});

var StepSchema = new Schema ({
	title: {
			type : String,
			trim : true
		},
	desc : {
			type : String,
			trim : true
		}
})


var Flow = mongoose.model('Flow', FlowSchema);
var Step = mongoose.model('Step', StepSchema);

module.exports = {
	Flow : Flow,
	Step : Step
}