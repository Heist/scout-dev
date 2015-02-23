// navlist-object-updates.js
// Updates any discrete object from a summary
'use strict';

module.exports = function(object_array, message_array, next){

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
    async.parallel([
        function(callback){
            async.map(object_array, 
                function(obj, callback){
                    var Model;
                    if(obj.doctype === 'tag'){Model = Tag;}
                    if(obj.doctype === 'task'){Model = Task;}
                    if(obj.doctype === 'test'){Model = Test;}

                    Model.findById(obj._id)
                         .exec(function(err, model){

                            model.pass_fail     = obj.pass_fail;
                            model.report_index  = obj.report_index;
                            model.summary       = obj.summary;
                            model.summarized    = obj.summarized;
                            model.embed         = obj.embed;
                            model.report        = true;

                            model.save(function(err, data){
                                console.log('update', data.name, data.report_index);
                                callback(null, data);
                            });
                        });

                },
                function(err, results){
                    if(err){console.log(err);}
                    callback(null, results);
                });
        },
        function(callback){
            async.map(message_array,
                function(msg, callback){
                    Message.findByIdAndUpdate(
                        msg._id, 
                        { 
                            'fav_task' : msg.fav_task,
                            'fav_tag'  : msg.fav_tag,
                            'body'  : msg.body,
                        }, 
                        function(err, data){
                            if(err){console.log(err);}
                            callback(null, data);
                        });
                }, 
                function(err, results){
                    if(err){console.log(err);}
                    callback(null, results);
                });
        }
    ],
    function(err, results){
        if(err){console.log(err);}
        next(null, results);
    });
    
};