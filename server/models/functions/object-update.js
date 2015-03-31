// object-update.js
'use strict';

// Takes an array of objects, finds each object in array on server
// posts an update and saves.
// expects each object to have property _id at minimum.

module.exports = function(object_array, next){

// Module dependencies ==========================
    var async    = require('async');
    var models = require('../../models');

// UPDATE OBJECTS FROM NAVIGATION LIST ====================
// Did we get a properly formed object array?
    async.map(object_array, 
        function(obj, callback){

            var Model;
            if(obj.doctype === 'tag') { Model = models.Tag;  }
            if(obj.doctype === 'task'){ Model = models.Task; }
            if(obj.doctype === 'test'){ Model = models.Test; }

            Model.findOne({'_id' : obj._id})
                 .exec(function(err, model){
                    // todo: if there's a new subject, pass a subject in and update the subjects list.
                    if(err){ console.log(err); }
                    if(!model){ callback(null, null); }

                    model.report     = true;

                    model.visible    = (obj.visible === false) ? obj.visible : true;
                    model.pass_fail  = (obj.pass_fail === false) ? obj.pass_fail : true;
                    model.summarized = (obj.summarized === false) ? obj.summarized : true;

                    model.name       = obj.name || model.name;
                    model.desc       = obj.desc || model.desc;
                    model.embed      = obj.embed || model.embed || '';
                    model.summary    = obj.summary || model.summarized || '';
                
                    model.report_index  = obj.report_index || model.report_index;
                    
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
            next(null, results);
        });
};