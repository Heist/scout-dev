// tag-maker.js
'use strict';

// Takes a string, test, and optionally a message._id

// converts them to lowercase, 
// checks them against the existing test-indexed tag database
// if the database does not have a variant of tag
// inserts the non-lowercase version as name
// inserts the lowercase version as indexed name
// if optional property message_id exists,
// pushes message_id to the tag
// returns the 
module.exports = function(string, test, message){
	var _ = require('lodash');
	var Bluebird = require('bluebird');

	var fn     = require('../../models/functions');
    var models = Bluebird.promisifyAll(require('../../models'));

// Check tags against the DB of existing tagnames
	var testStr = string.toLowerCase();

	var obj = models.Tag.findOne('')


};
