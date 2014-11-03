// flow.js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connect = require('../../db/db');
var db = connect.db;


var TestSchema = new Schema({
        _session : { type: Schema.Types.ObjectId, ref: 'Session' },
        _tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
        _subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],

        created_by_account : {type: Schema.Types.ObjectId},
        created_by_user : {type: Schema.Types.ObjectId},
        desc    : { type: String, trim: true },
        link    : { type: String, trim: true },
        name    : { type: String, trim: true, default: 'my new flow name' },
        platform: { type: String, trim: true, default: 'mobile' },
        type    : { type: String, trim: true },
        
        created: Date,
        updated: Date,
        runcount : Number,
        summary: String,
        index: Number
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