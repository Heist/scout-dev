//  message.js
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var db = require('../../db/db');


var MessageSchema = new Schema ({
	_task: { type: Schema.Types.ObjectId, ref: 'Task' },
	_test: { type: Schema.Types.ObjectId, ref: 'Test' },
	_session : { type: Schema.Types.ObjectId, ref: 'Session' },
	_subject : { type: Schema.Types.ObjectId, ref: 'Subject' },

	body : { type: String, trim: true },
	created_by : { type: String, trim: true },
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