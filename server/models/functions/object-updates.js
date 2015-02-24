// object-updates.js
'use strict';

// Takes an array of objects, finds each object in array on server
// posts an update and saves.
// expects each object to have property _id at minimum.

module.exports = function(object_array, next){

// Module dependencies ==========================
    var mongoose = require('mongoose');  // can't set an ObjectID without this.
    var _ = require('lodash');
    var async = require('async');
    var Promise = require('bluebird');

// load data storage models ==========================
    var Message = global.rootRequire('./server/models/data/message');
    var Task    = global.rootRequire('./server/models/data/task');
    var Test    = global.rootRequire('./server/models/data/test');
    var Tag     = global.rootRequire('./server/models/data/tag');
    var Subject = global.rootRequire('./server/models/data/subject');


// UPDATE OBJECTS FROM NAVIGATION LIST ====================
// Did we get a properly formed object array?
    console.log('update object array', object_array);

    async.map(object_array, 
        function(obj, callback){
            console.log('object from array', obj);

            var Model;
            if(obj.doctype === 'tag') { Model = Tag;  }
            if(obj.doctype === 'task'){ Model = Task; }
            if(obj.doctype === 'test'){ Model = Test; }

            Model.findOne({'_id' : obj._id})
                 .exec(function(err, model){
                    // todo: if there's a new subject, pass a subject in and update the subjects list.
                    if(err){ console.log(err); }
                    if(!model){ callback(null, null); }

                    model.report        = true;

                    model.visible       = obj.visible || model.visible;
                    model.pass_fail     = obj.pass_fail || model.pass_fail;
                    model.summarized    = obj.summarized || model.summarized;

                    model.embed         = obj.embed || model.embed || '';
                    model.summary       = obj.summary || model.summarized || '';
                    
                    if (model.hasOwnProperty('report_index')){
                        model.report_index  = obj.report_index || model.report_index;
                    }
                    
                    // if there's a subject
                    // and the subject doesn't exist in the model already
                    if(obj._subject && model._subjects.indexOf(obj._subject) === -1){
                        model._subjects.push(obj._subject);
                    }

                    model.save(function(err, mdl){
                        if(err){console.log(err); }
                        callback(null, mdl);
                    });
                });
        },
        function(err, results){
            if(err){console.log(err);}
            console.log('results', results);
            next(null, results);
        });
};