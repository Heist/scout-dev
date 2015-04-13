// message-new.js
// create a new message on the DB
'use strict';

module.exports = function(request, user){

// Module dependencies ==========================
    var Bluebird = require('bluebird');
    var _ = require('lodash');

    var fn     = require('../../models/functions');
    var models = Bluebird.promisifyAll(require('../../models'));

// CREATE A NEW MESSAGE ===================================
    var t = fn.tagPuller(request.body);
    var tags = t.tags || null;

    var msg = {
            '_subject' : request._subject,
            '_test' : request._test,
            '_task' : request._task,
            'body'  : t.msg,
            'created_by_user' : user
        };

    // THIS IS RETURNING ALL TAGS FROM THE TEST WHEN A NEW MESSAGE IS CREATED
    // TODO: SHOULD RETURN ONLY THE TAGS RELEVANT TO THAT MESSAGE ?

    return new models.Message(msg).saveAsync().get(0)
        .then(function(note){
            // post the message to the relevant Task and Subjects, add or update its tags.
            return Bluebird.all([
                    models.Task.findOneAndUpdate({'_id': note._task}, { $push: { _messages: note._id } },{upsert : false }, function(err, obj){if(err){console.log('task update', err)} if(!obj){console.log('no task found')} return obj;}),
                    models.Subject.findOneAndUpdate({'_id': note._subject}, { $push: { _messages: note._id } },{upsert : false }, function(err, obj){if(err){console.log('task update', err)} if(!obj){console.log('no subject found')} return obj;}),
                    Bluebird.map(tags, function(tag){ 
                        return fn.tagMaker({ 'name' : tag , '_test' : msg._test, msg: note._id})
                    })
            ]).then(function(arr){
                // create the dual-pointer on the message for tag population
                // console.log('check the array', arr.length);
                return Bluebird.map(arr[2], function(tag){
                    return models.Message.findOneAndUpdate({'_id': note._id }, {$push : {'_tags': tag } }, function(err, obj){});
                })
            }).then(function(arr){
                // return the populated message so you can insert it into the timeline
                return models.Message.findById(note._id).populate('_subject _tags').exec(function(err, next){});
            });
        }).catch(function(err){
            if(err.errors){
                var r = null; 
                for (var k in err.errors){ 
                    if (r !== null) {
                    } else {
                        r = err.errors[k];
                    }

                    return r.message;
                } 
             }
        });
};