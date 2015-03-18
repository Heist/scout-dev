// message-new.js
// create a new message on the DB
'use strict';

module.exports = function(request, user){

// Module dependencies ==========================
    var async   = require('async');
    var Bluebird = require('bluebird');

// load data storage models =====================
    var fn     = require('../../models/functions');
    var models = require('../../models');
    Bluebird.promisifyAll(require("mongoose"));
    
// CREATE A NEW MESSAGE ===================================
// set message variables from request object.

    // console.log('message request', request);

    var tags = fn.tagPuller(request.body);
    // console.log('tags', tags);

    var update = {
        body : request.body,
        msg  : tags.msg,
        tags : tags.tags || null,
        _subject : request._subject,
        _test : request._test,
        _task : request._task,
        user : user
    };

    var messageMake = function( make ){
        return models.Message.create({ 
            '_subject' : make._subject, 
            '_test' : make._test,
            '_task' : make._task,
            'body' : make.msg,
            'created_by_user' : make.user },
            function(err, obj){ if(err){console.log('make err', err);} });
    }

    var findMessage = function(_id, callback){ 
        
    }

    var newMessage = function(make) {
        // console.log('make');
        var note = {};
        return messageMake(make)
          .then(function(found){
            note._id = found._id;
            return Bluebird.all([
                    models.Task.findOneAndUpdate({'_id': found._task}, { $push: { _messages: found._id } },{upsert : false }, function(err, obj){if(err){console.log('task update', err)} if(!obj){console.log('no task found')} return obj;}),
                    models.Subject.findOneAndUpdate({'_id': found._subject}, { $push: { _messages: found._id } },{upsert : false }, function(err, obj){if(err){console.log('task update', err)} if(!obj){console.log('no subject found')} return obj;}),
                    Bluebird.map(make.tags, function(tag){ 
                        return models.Tag.findOneAndUpdate({ 'name' : tag , '_test' : make._test }, { $push: { '_messages': found.id }, 'name': tag }, {upsert : true }, function(err,obj){if(err){console.log('task update', err)} if(!obj){console.log('no tag found')} return obj._id;})
                    })
                ])
        }).then(function(arr){
            console.log('arr for salting tags back to messages', arr.length);
            console.log('salt tags', arr[2]);
            if(arr[2] > 0){
                console.log('arr 3', arr[2]);
                var tags = arr[2];
                return models.Message.findOneAndUpdate({'_id': note._id }, {$push : {_tags: arr[3] } }, function(err, obj){});
            } else {
                return arr;
            }
        }).then(function(arr){
            return models.Message.findById(note._id).populate('_subject').exec(function(err, next){
                if(err){console.log('findMessageError', err)}
            });
        }).then(function(message){
            return message;
        });
    };

    return newMessage(update);
};