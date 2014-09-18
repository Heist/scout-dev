'use strict';
//  user.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	_tests : [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  _messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
	
  name: {type:String, trim:true},
  
  created : Date,
	updated : Date
})

UserSchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);