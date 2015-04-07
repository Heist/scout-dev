// message-remove.js
// remove a message and all of its pointers
'use strict';

module.exports = function(msg) {
	// body...
// Module dependencies ==========================
    var Bluebird = require('bluebird');
    var _ = require('lodash');

    var fn     = require('../../models/functions');
    var models = Bluebird.promisifyAll(require('../../models'));

// REMOVE A MESSAGE ? ===================================
	// retrieve message _id
	console.log('remove this', msg._id);

	return models.Message.removeAsync({'_id': msg._id})
				 .catch(function(err){console.log(err)});

	// Bluebird.all([
	// 	models.Subject.findAsync( { _messages: { $in: [ msg._id ] } } ).then(function(data){
	// 		// for each subject where the message exists,
	// 		// splice the message out of the messages array.
	// 		// save the subject.
	// 	})
	// ]);

	// remove pointer from Subject
	// remove pointer from Task
	// remove pointer from Tags
	// remove Message from DB


}