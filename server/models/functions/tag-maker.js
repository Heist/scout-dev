// tag-maker.js
'use strict';

// Takes an object containing 
// a string for name, test._id, and optionally a single message._id

// converts them to lowercase, 
// checks them against the existing test-indexed tag database
// upsert=== true if the database does not have a variant of tag inserts the non-lowercase version as name 
// lowercase.true inserts the lowercase version as indexed name
// if optional property message_id exists,
// pushes message_id to the tag

module.exports = function(tag){
	var Bluebird = require('bluebird');
    var models = Bluebird.promisifyAll(require('../../models'));
    var data;

    var oneTag = function(singleTag){
    	var testStr = singleTag.name.toLowerCase();
    	var u = {
    		  name: singleTag.name,
    		  _test: singleTag._test,
    		};
    
    	// messages are optional when setting up tags
    	if (singleTag.msg) {
    	  u.$push = {
    	    _messages: singleTag.msg
    	  };
    	}
    
    	var q = {'nameCheck': testStr, '_test' : singleTag._test };
    	var o = {upsert : true};
    	var data;
    	// okay let's make this a findOneAndUpdate...
    	var promise = models.Tag.findOneAndUpdate(q, u, o, function(err, obj){});

    	return promise;
    }

    var promise = (tag.isArray) ? 
    	Bluebird.map(tag, function(t){ oneTag(t); }) :
    	oneTag(tag);
    	
	return promise.then(function(tag){
		console.log(tag);
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
