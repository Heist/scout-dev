'use strict';
// flow.js
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
	// messages: [MessageSchema]
})

var FlowSchema = new Schema({
		title 	: {
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
		created: {
			type: Date
		},
		updated: {
			type: Date
		},
		steps: [StepSchema]
	});


var SessionSchema = new Schema ({
	name : {
			type: String, 
			trim: true, 
			default: 'my new session name'
		},
	created: {
			type: Date
		},
	updated: {
		type: Date
	},
	testKey: {
		type: Number
	},
	flows : [FlowSchema]	
})

FlowSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

SessionSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Session', SessionSchema);
// module.exports = mongoose.model('Flow', FlowSchema);