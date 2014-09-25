'use strict';
//  step.js
var db = require('./server/db/db');
var Schema = db.Schema;

var TaskSchema = new Schema ({
	
	_messages:[{ type: Schema.Types.ObjectId, ref: 'Message' }],
	_tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	_subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
	_test : { type: Schema.Types.ObjectId, ref: 'Test' },
	_session : { type: Schema.Types.ObjectId, ref: 'Session' },

	name: { type : String, trim : true },
	desc : { type : String, trim : true },
	summary: { type : String, trim : true },
	pass_fail: { type: Boolean, default: false },
	
	index: Number,
	created: Date,
	updated: Date,
})

TaskSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = db.model('Task', TaskSchema);