'use strict';
//  message.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
	_step:{ 
		type: Schema.Types.ObjectId, 
		ref: 'Step'
	},
	key:{
		type: Number
	},
	created: {
			type: Date
		},
	created_by: {
		type: String,
		trim: true
	},
	body : {
			type: String, 
			trim: true
		},
	user:{
		type: String,
		trim:true
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