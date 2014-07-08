// flow.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema ({
	name : {
			type: String, 
			trim: true, 
			default: 'userName'
		},
	created: {
			type: Date
		},
	updated: {
		type: Date
	},
	flows :  [{ type: Schema.Types.ObjectId, ref: 'Flow' }]
})


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


SessionSchema.pre('save', function(next){
  now = new Date();
  this.updated = now;
  if ( !this.created ) {
    this.created = now;
  }
  next();
});

FlowSchema.pre('save', function(next){
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