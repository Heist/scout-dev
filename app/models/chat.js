// chat.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
		content 	: {
			type: String, 
			trim: true, 
			default: 'my new flow name'
		},
		user	: {
			type: String, 
			trim: true, 
			default: ''
		},
		created: {
			type: Date
		},
		updated: {
			type: Date
		},
		fav: {
		    type: Boolean,
		    default:  false
		  }
		tags:[TagSchema]
	});

var TagSchema = new Schema ({
	
})

ChatSchema.pre('save', function(next){
  now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});


module.exports = mongoose.model('Flow', FlowSchema);