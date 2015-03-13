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
            '_task' : make._task,
            'body' : make.msg,
            'created_by' : make.user });
    }

    var findMessage = function(_id){ 
        return models.Message.findById(_id).populate('_subject').execAsync({});
    }

    var tagUpdate = function(name, _test, msg_id, next){
        // test the object - if it's an ObjectId, use it raw, otherwise, use the name
        var q = {'name': name, '_test': _test};
        var u = { $push: { '_messages': msg_id }, 'name': name, '_test': _test };
        // var o = {upsert : true };
       return models.Tag.findOneAndUpdate(q, u, o, function(err, obj){});
    };

    var newMessage = function (make, next) {
      return messageMake(make).then(function (message) {
        return findMessage(message._id)
      }).then(function (m) {
        return Bluebird.all([
          models.Task.findOneAndUpdate({'_id': m._task}, { $push: { _messages: m._id } },{upsert : false }, function(err, obj){}),
          models.Subject.findOneAndUpdate({'_id': m._subject}, { $push: { _messages: m._id } },{upsert : false }, function(err, obj){})
        ])
      }).then(function(tags){
            // this works for the first two models...
      }).catch(function (error) {
        // error
      })
    }

    var mapTags = function(tags){
        console.log('tags', update.tags, tags[0]._id,tags[1]._id);
        var testTags = [ 'blue', 'note', 'purple' ];
        Bluebird.all(
            testTags.map(function(thing){
            // return promise of thing mapped
            console.log(thing);
            models.Tag.findOneAndUpdate(
                {'name': thing, '_test': m._test},
                { $push: { '_messages': m._id }, 'name': tag, '_test': m._test },
                {upsert : true }, 
                function(err, obj){})
            })
        ).then(function(things){
            console.log('mapped', things);
        });
    }

    return newMessage(update, next);
};