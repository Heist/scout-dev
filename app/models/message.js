'use strict';
// message.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
	body : {
			type: String, 
			trim: true
		},
	created: {
			type: Date
		},
	created_by: {
		type: String,
		trim: true
	},
	fav : Boolean,
	tags : {
		type: [String], 
		trim:true
	}
})

MessageSchema.pre('save', function(next){
  var now = new Date();
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Message', MessageSchema);