//  tag.js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connect = rootRequire('./config/db');
var db = connect.db;


// TODO: Tags are eventually themes, which store all our messages.

var TagSchema = new Schema({
    _tasks       : [{ type: Schema.Types.ObjectId, ref: 'Task'}],
    _messages    : [{ type: Schema.Types.ObjectId, ref: 'Message'}],
    _test        : {  type: Schema.Types.ObjectId, ref: 'Test', required: true},
    
    doctype      : { type: String, trim: true, default: 'tag' },

    nameCheck    : { type : String, lowercase: true, trim : true },
    name         : { type : String, trim : true },
    summary      : { type : String, trim : true },
    embed        : { type : String, default: '' },

    index        :   Number,
    report_index :   Number,
    visible      : { type:Boolean, default: false },
    summarized   : { type:Boolean, default:false }
});

TagSchema.pre('save', function(next){
    if(this.summary){
        this.summarized = true;
    }
    if(this.name){
        this.nameCheck = this.name;
    }
    next();
});

module.exports = db.model('Tag', TagSchema);
