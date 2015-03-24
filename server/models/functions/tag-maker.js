// tag-maker.js
'use strict';

// Takes a string, test, and optionally a message._id

// converts them to lowercase, 
// checks them against the existing test-indexed tag database
// upsert=== true if the database does not have a variant of tag inserts the non-lowercase version as name 
// lowercase.true inserts the lowercase version as indexed name
// if optional property message_id exists,
// pushes message_id to the tag
// returns the 
module.exports = function(tag){
	var Bluebird = require('bluebird');
    var models = Bluebird.promisifyAll(require('../../models'));
    
    console.log('tagmaker');
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
		return models.Test.findOneAndUpdate(
					{'_id'  : tag._test }, 
					{$push  : {'_tags': tag._id } },
				 	{upsert : false},
				 	function(err, obj){})
	})
	.then(function(test){
		return data;
	});

};
