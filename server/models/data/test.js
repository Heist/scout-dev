// test.js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connect = rootRequire('./config/db');
var db = connect.db;


var TestSchema = new Schema({
        _session : { type: Schema.Types.ObjectId, ref: 'Session' },
        _tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
        _subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
        doctype : { type: String, trim: true, default: 'test' },

        created_by_account : {type: Schema.Types.ObjectId},
        created_by_user : {type: Schema.Types.ObjectId},
        desc    : { type: String, trim: true, default: '' },
        link    : { type: String, trim: true, default: '' },
        name    : { type: String, trim: true, default: 'my new flow name' },
        platform: { type: String, trim: true, default: 'mobile' },
        kind    : { type: String, trim: true, default: '' },
        embed   : { type: String, default: '' },

        index: { type: Number, default: 0 },
        report_index : { type: Number, default: 0 },
        visible: { type:Boolean, default: true },
        report : { type:Boolean, default: false },
        
        created: Date,
        updated: Date,
        runcount : Number,
        summary: String
        
    });

TestSchema.pre('save', function(next){
    var now = new Date();
    this.updated = now;
    if ( !this.created ) {
        this.created = now;
    }
    next();
});

module.exports = db.model('Test', TestSchema);