'use strict';
//  flow.js
var db = require('./server/db/db');
var Schema = db.Schema;

var TestSchema = new Schema({
		_session : { type: Schema.Types.ObjectId, ref: 'Session' },
		_tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
		_tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
		_subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],

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

module.exports = db.model('Test', TestSchema);