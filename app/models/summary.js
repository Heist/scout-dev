'use strict';
// summary.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var TagSchema = new Schema ({
// 	body: String,
// 	visible: Boolean,
// 	summary: {type: String, trim: true},
// 	count: {type: Number, trim: true}
// })

// var MessageSchema = new Schema ({
// 	body: {type : String, trim: true},
// 	created: Date,
// 	tags: [String],
// 	fav : Boolean
// })

// var SessionByUserSchema = new Schema ({
// 	user : String,
// 	messages : [MessageSchema]
// })

// var StepSchema = new Schema ({
// 	name : String,
// 	pass_fail : Boolean,
// 	session_by_user : [SessionByUserSchema],
// 	tags_single : [TagSchema]
// })

var SummarySchema = new Schema ({
	title : {type: String, trim: true},
	steps  : Object,
	created : Date,
	updated : Date,
  tags    : Object,
	testKey : Number
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