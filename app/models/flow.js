'use strict';
//  flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

<<<<<<< HEAD
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
	user_id:{
		type: String,
		trim:true
	},
	session_id:{
		type: String,
		trim:true
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
	title: {
			type : String,
			trim : true
		},
	flow : { 
		type: Schema.Types.Number, 
		ref: 'Flow'
	},
	key: {
		type: Number,
		trim: true
	},
	desc : {
			type : String,
			trim : true
		},
	messages: [MessageSchema]
})
mongoose.model('Step', StepSchema);

var FlowSchema = new Schema({
		testKey : {
			type : Number,
			trim : true
		},
		flowKey : {
			type : Number,
			trim : true
		},
		user_id:{
			type: String,
			trim:true
		},
		title 	: {
=======
var FlowSchema = new Schema({
		_session : { type: Schema.Types.ObjectId, ref: 'Session' },
		name 	: {
>>>>>>> dev
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
		tags : {
			type: [String], 
			trim:true
		},
<<<<<<< HEAD
		ismodel :{
			type: Boolean,
			default: false
		},
		steps: [StepSchema]
=======
		runcount : Number,
		steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }]
>>>>>>> dev
	});

mongoose.model('Flow', FlowSchema);

<<<<<<< HEAD
MessageSchema.pre('save', function(next){
  var now = new Date();
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

=======
>>>>>>> dev
FlowSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

<<<<<<< HEAD
module.exports = mongoose.model('Flow', FlowSchema);
module.exports = mongoose.model('Step', StepSchema);
=======
module.exports = mongoose.model('Flow', FlowSchema);
>>>>>>> dev
