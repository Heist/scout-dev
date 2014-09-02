'use strict';
//  step.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StepSchema = new Schema ({
	name: {
			type : String,
			trim : true
		},
	_flow : { 
		type: Schema.Types.ObjectId, 
		ref: 'Flow'
	},
	desc : {
			type : String,
			trim : true
		},
	created: {
			type: Date
		},
	updated: {
			type: Date
		},
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

mongoose.model('Step', StepSchema);

StepSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Step', StepSchema);