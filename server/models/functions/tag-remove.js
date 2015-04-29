// tag-remove.js
// used in message remove to pull dead tags on message removal
'use strict';

module.exports = function( id ){
	// Module dependencies ==========================
    var Bluebird = require('bluebird');
    var _ = require('lodash');

    var fn     = require('../../models/functions');
    var models = Bluebird.promisifyAll(require('../../models'));

    return models.Tag.findAsync()
    		.then(function(tags){
    			
    			
    			return models.Tag.findAsync({ '_messages' : {$in: [id]}})
	    	})
	    	.catch(function(err){
	    		
	    	})

}
