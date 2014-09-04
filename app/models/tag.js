'use strict';
//  tag.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
	_step:{ 
		type: Schema.Types.ObjectId, 
		ref: 'Step'
	},
	_flow:{
		type: Schema.Types.ObjectId, 
		ref: 'Flow'
	},
	_session : {
		type: Schema.Types.ObjectId, 
		ref: 'Session'
	},
	_message: {
		type: Schema.Types.ObjectId, 
		ref: 'Message'
	},
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
	}
});

module.exports = mongoose.model('Tag', TagSchema);
