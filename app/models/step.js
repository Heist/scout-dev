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
	_session : {
		type: Schema.Types.ObjectId, 
		ref: 'Session'
	},
	messages:[{ type: Schema.Types.ObjectId, ref: 'Message'}],
	users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag'}],
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
	pass_fail: {
		type: Boolean,
		default: false
	},
	index: Number
})

StepSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Step', StepSchema);