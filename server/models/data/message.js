//  message.js
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var connect = require('../../db/db');
var db = connect.db;


var MessageSchema = new Schema ({
    _subject : { type: Schema.Types.ObjectId, ref: 'Subject' },
    _test : { type: Schema.Types.ObjectId, ref: 'Test' },

    body : { type: String, trim: true },
    created_by : { type: Schema.Types.ObjectId },
    fav_task : { type: Boolean, default: false },
    fav_tag : { type: Boolean, default: false },
    
    created: Date
});

MessageSchema.pre('save', function(next){
  var now = new Date();
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = db.model('Message', MessageSchema);