'use strict';
//  flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Schema({
		_session : { type: Schema.Types.ObjectId, ref: 'Session' },
		_tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
		_tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
		_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],

		desc	: { type: String, trim: true },
		link	: { type: String, trim: true },
		name 	: { type: String, trim: true, default: 'my new flow name' },
		platform: { type: String, trim: true, default: 'mobile' },
		
		created: Date,
		updated: Date,
		runcount : Number,
		summary: String,
		index: Number
	});

TestSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Test', TestSchema);