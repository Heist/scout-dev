'use strict';
// summary.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SummarySchema = new Schema ({
	title : {type: String, trim: true},
	steps  : Object,
	created : Date,
	updated : Date,
  tags    : Object,
	testKey : Number,
  session_name : String,
  summary: String
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