// test-new.js
// a short function to create a test, requiring the current logged-in user.
'use strict';

module.exports = function(req, next){
	var models = require('../../models');
    var fn = require('../../models/functions');

	var make = {
			name : req.body.name,
			kind : req.body.kind,
			link : req.body.link || '',
			desc : req.body.desc,
            created_by_account : req.user._account,
            created_by_user : req.user._id
	}

    var summaryTag = {
        name : 'summary',
    }

	models.Test.create(
		make,
		function(err, test){
            if(err){ console.error(err); }

            console.log('test made', test._id);
            // An obscure conflict in Mongo prevents us using tagMaker here
            // #userneed #issue #comprehension #effort #quote
            var createTheseTags = [
                {name:'summary', nameCheck:'summary', _test:test._id},
                {name:'userneed', nameCheck:'userneed', _test:test._id},
                {name:'issue', nameCheck:'issue', _test:test._id},
                {name:'comprehension', nameCheck:'comprehension', _test:test._id},
                {name:'effort', nameCheck:'effort', _test:test._id},
                {name:'quote', nameCheck:'quote', _test:test._id}
            ]

            models.Tag.create(createTheseTags, function(err, next){})
              .then(function(tag){
                console.log('new test', tag, test);
                    next(null, test);
                });
            
        });
};