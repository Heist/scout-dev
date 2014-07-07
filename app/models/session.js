// flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StepSchema = new Schema ({
	title: {
			type : String,
			trim : true
		},
	desc : {
			type : String,
			trim : true
		}
	// messages: [MessageSchema]
})

var FlowSchema = new Schema({
		_id		: {
			type: Schema.Types.ObjectId, 
			turnOn: true
		},
		title 	: {
			type: String, 
			trim: true, 
			default: 'my new flow name'
		},
		link	: {
			type: String, 
			trim: true, 
			default: ''
		},
		desc	: {
			type: String, 
			trim: true, 
			default: ''
		},
		platform: {
			type: String, 
			trim: true, 
			default: 'mobile'
		},
		created: {
			type: Date
		},
		updated: {
			type: Date
		},
		steps: [StepSchema]
	});


var SessionSchema = new Schema ({
	name : {
			type: String, 
			trim: true, 
			default: 'my new session name'
		},
	created: {
			type: Date
		},
	updated: {
		type: Date
	},
	flows : [FlowSchema]
})


// var MessageSchema = new Schema({
// 		content 	: {
// 			type: String, 
// 			trim: true
// 		},
// 		user	: {
// 			type: String, 
// 			trim: true, 
// 			default: 'Moderator'
// 		},
// 		created: {
// 			type: Date
// 		},
// 		updated: {
// 			type: Date
// 		},
// 		fav: {
// 		    type: Boolean,
// 		    default:  false
// 		  }
// 		tags:[TagSchema]
// 	});

// var TagSchema = new Schema ({
// 		content 	: {
// 			type: String, 
// 			trim: true
// 		}
// })


FlowSchema.pre('save', function(next){
  now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

SessionSchema.pre('save', function(next){
  now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});


// MessageSchema.pre('save', function(next){
//   now = new Date();
//   this.updated = now;
//   if ( !this.created ) {
//     this.created = now;
//   }
//   next();
// });


module.exports = mongoose.model('Session', SessionSchema);