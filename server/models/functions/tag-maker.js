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
    var _ = require('lodash');

    if(tag.length === 0){ return; }

    var tagArray = (_.isArray(tag)) ? tag : [tag];

    var oneTag = function(singleTag){
    	// console.log('make a single tag', singleTag);
    	singleTag.name = singleTag.name.replace(/#/gi,'');
        // TODO: if a tag is called "summary", match it and toLowerCase it for storage
        var sumCatch = singleTag.name.match(/\#[sS][uU][mM][mM][aA][rR][yY]/gi);
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
    	return models.Tag.findOneAndUpdate(q, u, o, function(err, obj){
    	});
    }
       	
	return Bluebird.map(tagArray, function(t){ return oneTag(t) }).then(function(returnedTags){
	   // console.log('did we make a new tag/set?', returnedTags);

		return models.Test.findOne({'_id'  : returnedTags[0]._test }).exec()
        .then(function(test){
            // console.log('tagMaker: did we find a test?', test._id)
            // console.log('tagMaker: did we return tags', returnedTags);
            // check if that tag already exists on the test
            // if so, just pass to next
            // otherwise, add the tag to the test.
            return Bluebird.map(returnedTags, function(tag){
                    if (test._tags.indexOf(tag._id) === -1){
                        return test._tags.push(tag._id);

                    } else {
                        return;
                    }
                }).then(function(t){
                    return test.saveAsync();
                });
        })
        .then(function(test){
            // console.log('this is returned', returnedTags);
            return returnedTags;
        });
	}).catch(function(err){
        if(err){console.log('error in tagmaker', err)}
    });

};
