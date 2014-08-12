'use strict';
//  flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
	body : {
			type: String, 
			trim: true
		},
	created: {
			type: Date
		},
	created_by: {
		type: String,
		trim: true
	},
	user:{
		type: String,
		trim:true
	},
	flow:{ 
		type: Schema.Types.ObjectId,
		ref: 'Flow'
	},
	step:{ 
		type: Schema.Types.ObjectId, 
		ref: 'Step'
	},
	fav : {type: Boolean,
		default: false
	},
	tags : {
		type: [String], 
		trim:true
	}
})

mongoose.model('Message', MessageSchema);

var StepSchema = new Schema ({
	name: {
			type : String,
			trim : true
		},
	flow : { 
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
	messages: [MessageSchema]
})

mongoose.model('Step', StepSchema);

var FlowSchema = new Schema({
		session : {
			type: Schema.Types.ObjectId, 
			ref: 'Session'
		},
		name 	: {
			type: String, 
			trim: true, 
			default: 'my new flow name'
		},
		prototype	: {
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
		tags : {
			type: [String], 
			trim:true
		},
		steps: [StepSchema]
	});

mongoose.model('Flow', FlowSchema);

var SessionSchema = new Schema({
		name 	: {
			type: String, 
			trim: true, 
			default: 'New Session'
		}
})

mongoose.model('Session', SessionSchema);

StepSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

MessageSchema.pre('save', function(next){
  var now = new Date();
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

FlowSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Message', MessageSchema);
module.exports = mongoose.model('Step', StepSchema);
module.exports = mongoose.model('Flow', FlowSchema);
module.exports = mongoose.model('Session', SessionSchema);