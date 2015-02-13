//  subject.js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connect = rootRequire('./config/db');
var db = connect.db;


// Subjects are the basic unit of a Test.
// A Subject has a bunch of messages associated with them
// Along with what test/tests they've taken.

// Subjects are not expected to be unique within the system as of yet.

var SubjectSchema = new Schema ({
    _tests : [{ type: Schema.Types.ObjectId, ref: 'Test' }],
    _messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],

    name: {type:String, trim:true},
    test: { type: Schema.Types.ObjectId, ref: 'Test' },
    testroom : {type:String, trim:true},

    created : Date,
    updated : Date
});

SubjectSchema.pre('save', function(next){
    var now = new Date();
    this.updated = now;
    if ( !this.created ) {
        this.created = now;
    }
    next();
});

module.exports = db.model('Subject', SubjectSchema);