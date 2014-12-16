//  comment.js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connect = require('../../db/db');
var db = connect.db;


var CommentSchema = new Schema ({
    body : { type: String, trim: true },
    created_by : { type: Schema.Types.ObjectId },
    created_name : { type: String, trim: true },
    created: Date
});

CommentSchema.pre('save', function(next){
    var now = new Date();
    if ( !this.created ) {
        this.created = now;
    }
    next();
});

module.exports = db.model('Comment', CommentSchema);