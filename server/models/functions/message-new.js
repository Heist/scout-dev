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
    var update = {
        body : request,
        tags : fn.tagPuller(request) || null,
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

    var modelUpdate = function(type, _id, msg){
        var title = fn.toTitleCase(type);
        var model = 'models.'.concat(title);

        // test the object - if it's an ObjectId, use it raw, otherwise, use the name
        var q = (type === 'tag') ? {name: _id, _test: msg._test} : {'_id': _id};

        var u = (type === 'tag') ? 
                { $push: { _messages: msg._id }, name: _id, _test: msg._test } : 
                { $push: { _messages: msg._id } };

        var o = (type === 'tag') ? {upsert : true }  : {upsert : false } ;

       return model.findOneAndUpdateAsync(q, u, o, function(err, obj){}).execAsync({});

    };

    var newMessage = function(make, next){
        return messageMake(make).then(function(m){
            return findMessage(m._id).then(function(m){
                return async.parallel({
                    task: function(callback){
                        models.Task.findOneAndUpdateAsync({'_id': make._task}, { $push: { _messages: m._id } },{upsert : false }, function(err, next){});
                    },
                    subject: function(callback){
                        models.Subject.findOneAndUpdateAsync({'_id': make._subject}, { $push: { _messages: m._id } },{upsert : false }, function(err, next){});
                    },
                    tags: function(callback){
                        async.map(make.tags, 
                            function(tag, callback){
                                modelUpdate('tag', tag, m);
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