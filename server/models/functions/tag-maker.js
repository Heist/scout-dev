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
    var data = [];
    var _ = require('lodash');

    console.log('touched tagMaker', tag);

    var oneTag = function(singleTag){
    	console.log('single new tag', singleTag);

    	singleTag.name = singleTag.name.replace(/#/gi,'');

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
    	// okay let's make this a findOneAndUpdate...
    	var promise = models.Tag.findOneAndUpdate(q, u, o, function(err, obj){
    		console.log('obj', obj);
    	});

    	return promise;
    }

    console.log('is tag an array?', _.isArray(tag));

    var promise = (_.isArray(tag)) ? 
    	Bluebird.map(tag, function(t){ console.log(t); return oneTag(t); }) :
    	oneTag(tag);
    	
	return promise.then(function(tag){
		console.log('promise returned', tag);
		console.log(data);

		if(_.isArray(tag)){
			data = tag;
		} else {
			data.push(tag); // Data is now an array. If it's a multiple array, one should work
		}

		console.log('data', data);
		return models.Test.findOne({'_id'  : data[0]._test }).exec();
	})
	.then(function(test){
		console.log('returned test', test); 
		// check if that tag already exists on the test
		// if so, just pass to next
		// otherwise, add the tag to the test.
		return Bluebird.map(data, function(tag){
				if (test._tags.indexOf(tag._id) === -1){
					return test._tags.push(tag._id);

				} else {
					return;
				}
			}).then(function(t){
				console.log('bluebird t', t, test, test._tags);
				return test.saveAsync();
			});
	})
	.then(function(test){
		console.log('did adding tag arrays break everything', test);
		return data;
	});

};
