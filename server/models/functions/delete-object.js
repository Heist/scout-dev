// delete task or tag - removes misc. objects from tests.
// delete-object.js

'use strict';
module.exports = function(objectKey, type, next){

// Module dependencies ==========================
    var Promise = require('bluebird');
    var models  = Promise.promisifyAll(require('../../models'));
    var fn      = require('../../models/functions')

// delete an object
    // find an object
    // remove it from its test
    // NO LONGER: remove all related messages and tags 
    
    var Model = (type === 'tag') ? models.Tag : 
                (type === 'task') ? models.Task : 
                models.Test;

    Model.findById(objectKey, function(err, doc){
        if(err){ console.error(err) }

        models.Test.findOne({'_id': doc._test})
            .exec(function(err, test){
                if(err){ console.error(err) }
                
                var plural = (type === 'tag') ? test._tags : test._tasks;
                    plural.remove(doc._id);

                test.save(function(err, doc){
                    if(err){ console.error(err); }
                });
            });
    })
    .remove(function(err){
        if(err){ console.error(err); }
        next(null, 'task');
    });
};