// test-new.js
// a short function to create a test, requiring the current logged-in user.
'use strict';

module.exports = function(req, next){
	var models = require('../../models');

	models.Test.create({
            created_by_account : req.user._account,
            created_by_user : req.user._id
        }, function(err, test){
            if(err){console.log(err);}
            next(null, test);
        });
};