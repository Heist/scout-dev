// message-new.js
// create a new message on the DB
'use strict';

module.exports = function(request, user, next){

// Module dependencies ==========================
    var async   = require('async');
    var Bluebird = require('bluebird');

// load data storage models =====================
    var fn     = require('../../models/functions');
    var models = require('../../models');
    Bluebird.promisifyAll(require("mongoose"));
    
// CREATE A NEW MESSAGE ===================================
// set message variables from request object.

    console.log('message request');

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
            function(err, obj){ 
                if(err){console.log('make err', err);} 
                return obj;
            });
    }

    var findMessage = function(_id){ 
        return models.Message.findById(_id).populate('_subject').execAsync(function(err, next){
            if(err){console.log('findMessageError', err)}
            return next;
        });
    }

    var newMessage = function (make, next) {
        return messageMake(make)
        .then(function (message) {
            return findMessage(message._id) })
        .then(function (m) {
            console.log(m)
            return Bluebird.all([
                models.Task.findOneAndUpdate({'_id': m._task}, { $push: { _messages: m._id } },{upsert : false }, function(err, obj){}),
                models.Subject.findOneAndUpdate({'_id': m._subject}, { $push: { _messages: m._id } },{upsert : false }, function(err, obj){}),
                Bluebird.map(make.tags, function(tag){ 
                    return models.Tag.findOneAndUpdate({ 'name' : tag }, { $push: { '_messages': m.id }, 'name': tag }, {upsert : true }, function(err,item){})
                })
            ])
        }).then(function(parts){
            return next(null, { body: update.msg, tags : update.tags, created : parts[0].updated });
        }).catch(function (error) {
            if(error){console.log('there was an error', error);}
            })
    };

    return newMessage(update, next);
};