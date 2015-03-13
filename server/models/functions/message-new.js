// message-new.js
// create a new message on the DB
'use strict';

module.exports = function(request, user, next){

// Module dependencies ==========================
    var async   = require('async');
    var Promise = require('bluebird');

// load data storage models =====================
    var fn     = require('../../models/functions');
    var models = Promise.promisifyAll(require('../../models'));
    Promise.promisifyAll(require("mongoose"));
// CREATE A NEW MESSAGE ===================================

// set message variables from request object.
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
        return models.Message.createAsync({ 
            '_subject' : make._subject, 
            '_test' : make._test, 
            'body' : make.body, 
            'created_by' : make.user });
    }

    var findMessage = function(_id){ 
        return models.Message.findById(_id).populate('_subject').execAsync({});
    }

    var tagUpdate = function(name, _test, msg_id, next){
        // test the object - if it's an ObjectId, use it raw, otherwise, use the name
        var q = {'name': name, '_test': _test};
        var u = { $push: { '_messages': msg_id }, 'name': name, '_test': _test };
        var o = {upsert : true };

       return models.Tag.findOneAndUpdateAsync(q, u, o, function(err, obj){
                return next(null, obj);
            });
    };

    var newMessage = function(make, next){
        return messageMake(make).then(function(m){
            return findMessage(m._id).then(function(m){
                return async.parallel({
                    task: function(callback){
                        models.Task.findOneAndUpdateAsync({'_id': m._task}, { $push: { _messages: m._id } },{upsert : false }, function(err, next){});
                    },
                    subject: function(callback){
                        models.Subject.findOneAndUpdateAsync({'_id': m._subject}, { $push: { _messages: m._id } },{upsert : false }, function(err, next){});
                    },
                    tags: function(callback){
                        console.log('tags', make.tags);
                        async.map(make.tags,
                            function(tag, callback){
                                console.log(tag);
                                tagUpdate(tag, m._test, m._id);
                            }, callback );
                    }
                },
                function(err, results){
                    if(err){console.log(err);}
                    console.log({msg: results.msg, tags: results.waterfall.tags});
                    next(err, results);
                    
                });
            })
        })
    }

    return newMessage(update, fn);
};