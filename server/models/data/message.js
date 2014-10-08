//  message.js
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var connect = require('../../db/db');
var db = connect.db;


var MessageSchema = new Schema ({
	_task: { type: Schema.Types.ObjectId, ref: 'Task' },
	_test: { type: Schema.Types.ObjectId, ref: 'Test' },
	_session : { type: Schema.Types.ObjectId, ref: 'Session' },
	_subject : { type: Schema.Types.ObjectId, ref: 'Subject' },
	_tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],

	body : { type: String, trim: true },
	created_by : { type: Schema.Types.ObjectId },
	fav : { type: Boolean, default: false },
	
	created: Date
})

MessageSchema.pre('save', function(next){
  var now = new Date();
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = db.model('Message', MessageSchema);