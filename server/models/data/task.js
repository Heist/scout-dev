// task.js
'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var connect = rootRequire('./config/db');
var db = connect.db;

// TODO: Tasks are actually just discussion guidelines
// They store no messages and are not used to associate data?

var TaskSchema = new Schema ({
    
    _messages:[{ type: Schema.Types.ObjectId, ref: 'Message' }],
    _tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    _subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    _test : { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    
    doctype : { type: String, trim: true, default: 'task' },

    name: { type : String, trim : true },
    desc : { type : String, trim : true },
    summary: { type : String, trim : true },
    pass_fail: { type: Boolean, default: true },
    visible: { type:Boolean, default: true },
    embed   : { type: String, default: '' },

    index: Number,
    report_index: Number,
    created: Date,
    updated: Date,
});

TaskSchema.pre('save', function(next){
    var now = new Date();
    this.updated = now;
    if ( !this.created ) {
        this.created = now;
    }
    next();
});

module.exports = db.model('Task', TaskSchema);