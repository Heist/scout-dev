// flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
	flows : [FlowSchema]
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


SessionSchema.pre('save', function(next){
  now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

FlowSchema.pre('save', function(next){
  now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});


module.exports = mongoose.model('Session', SessionSchema);