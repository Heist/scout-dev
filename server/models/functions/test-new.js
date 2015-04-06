// test-new.js
// a short function to create a test, requiring the current logged-in user.
'use strict';

module.exports = function(req, next){
	var models = require('../../models');

	var make = {
			name : req.body.name,
			kind : req.body.kind,
			link : req.body.link || '',
			desc : req.body.desc,
            created_by_account : req.user._account,
            created_by_user : req.user._id
	}

	models.Test.create(
		make,
		function(err, test){
            if(err){console.log(err);}
            next(null, test);
        });
};