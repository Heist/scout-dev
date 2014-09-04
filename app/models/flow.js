'use strict';
//  flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlowSchema = new Schema({
		_session : { type: Schema.Types.ObjectId, ref: 'Session' },
		tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
		steps: [{ type: Schema.Types.ObjectId, ref: 'Step'}],
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
		created: {
			type: Date
		},
		updated: {
			type: Date
		},
		runcount : Number,
		summary: String
	});

mongoose.model('Flow', FlowSchema);

FlowSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Flow', FlowSchema);