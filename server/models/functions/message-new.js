// message-new.js
// create a new message on the DB
'use strict';

module.exports = function(request, user){

// Module dependencies ==========================
    var Bluebird = require('bluebird');

// load data storage models =====================
    var fn     = require('../../models/functions');
    var models = Bluebird.promisifyAll(require('../../models'));
    Bluebird.promisifyAll(require("mongoose"));

    
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

    // console.log('after return');
    var newMessage = function(make) {
        // console.log('make');
        var note = {};
        var msg = { '_subject' : make._subject, 
                    '_test' : make._test,
                    '_task' : make._task,
                    'body' : make.msg,
                    'created_by_user' : make.user };

        return new models.Message(msg).saveAsync()
        .get(0)
        .then(function(note){
            // console.log('found', note._id, note._task, note._subject, make._test );
            return Bluebird.all([
                    models.Task.findOneAndUpdate({'_id': note._task}, { $push: { _messages: note._id } },{upsert : false }, function(err, obj){if(err){console.log('task update', err)} if(!obj){console.log('no task found')} return obj;}),
                    models.Subject.findOneAndUpdate({'_id': note._subject}, { $push: { _messages: note._id } },{upsert : false }, function(err, obj){if(err){console.log('task update', err)} if(!obj){console.log('no subject found')} return obj;}),
                    Bluebird.map(make.tags, function(tag){ 
                        return fn.tagMaker({ 'name' : tag , '_test' : make._test, msg: note._id})
                    })
                ])
            .then(function(arr){
                return Bluebird.map(arr[2], function(tag){
                        // console.log('salt', tag.name);
                        return models.Message.findOneAndUpdate({'_id': note._id }, {$push : {'_tags': tag } }, function(err, obj){});
                    })
            }).then(function(arr){
                // console.log('find by id and return array length', arr.length);
                return models.Message.findById(note._id).populate('_subject _tags').exec(function(err, next){
                    if(err){console.log('findMessageError', err)}
                });
            }).then(function(message){
                // console.log('return message', message.body);
                return message;
            });
        }).catch(function(err){
            // if(err){console.log('something went wrong', err);}
            if(err.message){ return err.errors.body.message ;}
            return err;
        })
    };

    return newMessage(update);
};