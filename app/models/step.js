'use strict';
// step.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Step', StepSchema);