'use strict';
//  tag.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
	_steps	 : [{ type: Schema.Types.ObjectId, ref: 'Step'}],
	_messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}],
	
	_flow 	 : {  type: Schema.Types.ObjectId, ref: 'Flow'},
	_session : {  type: Schema.Types.ObjectId, ref: 'Session' },

	body: {
		type: String,
		trim: true
	},
	visible: {
		type:Boolean,
		default: true
	},
	summary: {
		type:String,
		trim:true
	},
	summarized : {
		type:Boolean,
		default:false
	}
});

TagSchema.pre('save', function(next){
  if(this.summary){
  	this.summarized = true
  }
  next();
});

module.exports = mongoose.model('Tag', TagSchema);
