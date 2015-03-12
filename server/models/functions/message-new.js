// message-new.js
// create a new message on the DB
'use strict';

module.exports = function(request, user, next){

// Module dependencies ==========================
    var async   = require('async');
    var Promise = require('bluebird');

// load data storage models =====================
    var models = require('../../models');
    var fn     = require('../../models/functions');
    
    Promise.promisifyAll(models);

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
        return models.Message.create({ 
            '_subject' : make._subject, 
            '_test' : make._test, 
            'body' : make.body, 
            'created_by' : make.user });
    }

    var findMessage = function(_id){ 
        return models.Message.findById(_id).populate('_subject')
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

       return model.findOneAndUpdate(q, u, o, function(err, obj){});

    };

    function newMessage(make, next){
        return messageMake(make).then(function(m){
            return findMessage(m._id).then(function(m){
                return async.parallel({
                    task: function(callback){
                        modelUpdate('task', make._task, m);
                    },
                    subject: function(callback){
                        modelUpdate('subject', make._subject, m);
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
                    next(err, results);
                    console.log({msg: results.msg, tags: results.waterfall.tags});
                });
            })
        })
    }
};