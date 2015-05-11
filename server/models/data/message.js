//  message.js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connect = rootRequire('./config/db');
var db = connect.db;

// Messages are the basic unit of information in Field Guide.
// They are currently associated to Tasks and Tags (themes)
// But are soon to be associated to only Themes. 

// Messages are made by Users in association with Subjects.
// They are not a sub-document of Subjects because they are sometimes 
// independent of that Subject.

var MessageSchema = new Schema ({
    _subject : { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    _test : { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    _task : { type: Schema.Types.ObjectId, ref: 'Task' },
    _comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    _tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],

    body : { type: String, trim: true, required: true },
    created_by_user : { type: Schema.Types.ObjectId, required: true },
    fav_task : { type: Boolean, default: true },
    fav_tag : { type: Boolean, default: true },
    
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