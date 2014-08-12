'use strict';
//  message.js
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
	user:{
		type: String,
		trim:true
	},
	flow:{ 
		type: Schema.Types.ObjectId,
		ref: 'Flow'
	},
	step:{ 
		type: Schema.Types.ObjectId, 
		ref: 'Step'
	},
	fav : {type: Boolean,
		default: false
	},
	tags : {
		type: [String], 
		trim:true
	}
})

mongoose.model('Message', MessageSchema);

MessageSchema.pre('save', function(next){
  var now = new Date();
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

module.exports = mongoose.model('Message', MessageSchema);