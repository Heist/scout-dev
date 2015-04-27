// tag-maker.js
'use strict';

// Takes an object containing 
// a string for name, test._is, and optionally a single message._id

// converts them to lowercase, 
// checks them against the existing test-indexed tag database
// upsert=== true if the database does not have a variant of tag inserts the non-lowercase version as name 
// lowercase.true inserts the lowercase version as indexed name
// if optional property message_id exists,
// pushes message_id to the tag

module.exports = function(tag){
	var Bluebird = require('bluebird');
    var models = Bluebird.promisifyAll(require('../../models'));
    
// Check tags against the DB of existing tagnames
	var testStr = tag.name.toLowerCase();
	var u = {
		  name: tag.name,
		  _test: tag._test,
		};

// messages are optional when setting up tags
	if (tag.msg) {
	  u.$push = {
	    _messages: tag.msg
	  };
	}

	var q = {'nameCheck': testStr, '_test' : tag._test };
	var o = {upsert : true};
	var data;
// okay let's make this a findOneAndUpdate...
	var promise = models.Tag.findOneAndUpdate(q, u, o, function(err, obj){});

	return promise.then(function(tag){
		data = tag;

		return models.Test.findOne({'_id'  : tag._test }).exec();
	})
	.then(function(test){
		// check if that tag already exists on the test
		// if so, just pass to next
		// otherwise, add the tag to the test.
		// console.log(test._tags.length);

		if (test._tags.indexOf(data._id) === -1){
			// console.log('not found')
			test._tags.push(data._id);
			return test.save();
		} else {
			// console.log('found')
			return;
		}

	})
	.then(function(test){
		return data;
	});

};
