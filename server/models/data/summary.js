// summary.js
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var connect = require('../../db/db');
var db = connect.db;

var SummarySchema = new Schema ({
  _session : { type: Schema.Types.ObjectId, ref: 'Session' },
  _test   : { type: Schema.Types.ObjectId, ref: 'Test' },
  _tasks  : [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  _tags    : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  created_by : {type: Schema.Types.ObjectId},
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

module.exports = db.model('Summary', SummarySchema);