
'use strict';
//  message.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
	_task: { type: Schema.Types.ObjectId, ref: 'Task' },
	_test: { type: Schema.Types.ObjectId, ref: 'Test' },
	_session : { type: Schema.Types.ObjectId, ref: 'Session'},

	body : { type: String, trim: true },
	created_by : { type: String, trim: true },
	subject : { type: String, trim: true },
	fav : { type: Boolean, default: false },
	
	key : Number,
	created: Date
})

MessageSchema.pre('save', function(next){
  var now = new Date();
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Message', MessageSchema);