'use strict';
// summary.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SummarySchema = new Schema ({
  _session : { type: Schema.Types.ObjectId, ref: 'Session' },
  _test   : { type: Schema.Types.ObjectId, ref: 'Test' },
  _tasks  : [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  _tags    : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],

  title   : {type: String, trim: true},
	summary : {type: String, trim: true},
  
  created : Date,
	updated : Date
})

SummarySchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Summary', SummarySchema);