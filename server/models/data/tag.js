//  tag.js
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var connect = require('../../db/db');
var db = connect.db;

var TagSchema = new Schema({
    _tasks     : [{ type: Schema.Types.ObjectId, ref: 'Task'}],
    _messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}],
    
    _test      : {  type: Schema.Types.ObjectId, ref: 'Test'},
    _session : {  type: Schema.Types.ObjectId, ref: 'Session' },

    body: { type : String, trim : true },
    summary: { type : String, trim : true },

    visible: { type:Boolean, default: true },
    summarized : { type:Boolean, default:false }
});

TagSchema.pre('save', function(next){
  if(this.summary){
      this.summarized = true
  }
  next();
});

module.exports = db.model('Tag', TagSchema);
