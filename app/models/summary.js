'use strict';
// summary.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tagSchema = new Schema ({
	content : {
		type : String,
		trim : true
	},
	summary : {
		type : String,
		trim : true
	}
})

var commentSchema = new Schema ({
	content	: {
		type : String,
		trim : true
	}
})


var SummarySchema = new Schema ({
	content		: {
		type: String,
		trim: true
	},
	comments 	: [commentSchema]
	steps 		: [stepSchema]
	tags		: [tagSchema]
})


SummarySchema.pre('save', function(next){
  var now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Session', SessionSchema);