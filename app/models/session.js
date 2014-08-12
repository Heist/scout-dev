'use strict';
// session.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema ({
	name : {
			type: String, 
			trim: true
	},
	user :{
		type: String, 
		trim: true
	},
	ismodel :{
		type: Boolean,
		default: false
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

SessionSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Session', SessionSchema);