// message-remove.js
// remove a message and all of its pointers
'use strict';

module.exports = function(msg_id){
// Module dependencies ==========================
    var Bluebird = require('bluebird');
    var _ = require('lodash');

    var fn     = require('../../models/functions');
    var models = Bluebird.promisifyAll(require('../../models'));

// REMOVE A MESSAGE ? ===================================
	// retrieve message _id
		
	// first, remove the message
	return models.Message.removeAsync({'_id': msg_id})
				.then(function(done){
                // remove dual pointer on tasks
            	
            	return models.Tag.findAsync({ '_messages' : {$in: [msg_id]}})
            		.then(function(tags){
        			
                        
	                    return Bluebird.map(tags, function(tag){
                            var arr = tag._messages;
                            // if a tag has been removed, then remove the message from that tag
                            arr.splice(arr.indexOf(msg_id), 1);

                            if (arr.length === 0){
                                // if the tag is empty, remove the tag from the db.
                                models.Tag.remove({'_id':tag._id}, function(err, next){
                                    return tag.save();
                                }); 
                            } else {
                                // otherwise, return the tag itself
                                return tag.save();
                            }
                        })
            		})
	            	.then(function(tags){
	            		return models.Task.findAsync({ '_messages' : {$in: [msg_id]}})	
	            	})
	                .then(function(tasks){
                    // remove dual pointer on subjects
                    
	                    return Bluebird.map(tasks, function(task){
	                     var arr = task._messages;
	                        // if a tag has been removed, then remove the message from that tag
	                        arr.splice(arr.indexOf(msg_id), 1);
	                        return task.save();
	                    })
	                }).then(function(tasks){
                    // remove dual pointer on tasks
                    	
	                    return models.Subject.findAsync({ '_messages' : {$in: [msg_id]}})
	                })
	                .then(function(subjects){
                    // remove dual pointer on subjects
                    
	                    return Bluebird.map(subjects, function(subj){
	                     var arr = subj._messages;
	                        // if a tag has been removed, then remove the message from that tag
	                        arr.splice(arr.indexOf(msg_id), 1);
	                        return subj.save();
	                    })
	                }).then(function(next){
	                	return 1;
	                })
		        })
				.catch(function(err){
                    if(err){console.log(err);}
                });
}