//  subject.js
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var connect = require('../../db/db');
var db = connect.db;

var SubjectSchema = new Schema ({
    _tests : [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  _messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    
  name: {type:String, trim:true},
  testroom : {type:String, trim:true},

  created : Date,
  updated : Date
})

SubjectSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = db.model('Subject', SubjectSchema);