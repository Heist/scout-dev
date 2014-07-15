'use strict';
// summary.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema ({
	name : {
		type : String,
		trim : true
	},
	summary : {
		type : String,
		trim : true
	},
	visible : {
		type: boolean
	}
})

var CommentSchema = new Schema ({
	content	: {
		type : String,
		trim : true
	},
	tags : {
		type : [String],
		trim : true
	},
	fav : {
		type : Boolean
	}
})

var StepSchema = new Schema ({
	name : {
		type : String,
		trim : true
	},
	comments : [CommentSchema]
})

var SummarySchema = new Schema ({
	flowsummary	: {
		type: String,
		trim: true
	},
	created	: {
		type: Date
	},
	created_by	: {
		type : String
	}
	steps 	: [StepSchema],
	tagsum	: [TagSchema]
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