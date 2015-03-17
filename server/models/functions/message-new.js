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

    // console.log('message request');

    var tags = fn.tagPuller(request.body);
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
        // console.log('find message', _id)
        return models.Message.findById(_id).populate('_subject').exec(function(err, next){
            if(err){console.log('findMessageError', err)}
        });
    }

    var newMessage = function (make) {
        // console.log('make', make);
        return messageMake(make)
        .then(function(message) {
            return findMessage(message._id, function(err, obj){ if(err){console.log(err);} return obj;})
            .then(function (m) {
                return Bluebird.all([
                    models.Task.findOneAndUpdate({'_id': m._task}, { $push: { _messages: m._id } },{upsert : false }, function(err, obj){if(err){console.log('task update', err)} if(!obj){console.log('no task found')} return obj;}),
                    models.Subject.findOneAndUpdate({'_id': m._subject}, { $push: { _messages: m._id } },{upsert : false }, function(err, obj){if(err){console.log('task update', err)} if(!obj){console.log('no subject found')} return obj;}),
                    Bluebird.map(make.tags, function(tag){ 
                        return models.Tag.findOneAndUpdate({ 'name' : tag }, { $push: { '_messages': m.id }, 'name': tag }, {upsert : true }, function(err,obj){if(err){console.log('task update', err)} if(!obj){console.log('no tag found')} return obj;})
                    })
                ])
            }).then(function(parts){
                console.log('parts');
                var reply = { body: make.msg, tags : make.tags, created : parts[0].updated }
                return reply;
            }).catch(function (error) {
                if(error){console.log('there was an error', error);}
            })
        });
    };

    return newMessage(update);
};