'use strict';
// flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FlowSchema = new Schema({
		_id		: {
			type: Schema.Types.ObjectId,
			turnOn : true

		},
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
		steps:  [{ type: Schema.Types.ObjectId, ref: 'Step' }]
	});


FlowSchema.pre('save', function(next){
  now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Flow', FlowSchema);