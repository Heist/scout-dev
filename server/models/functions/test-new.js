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
              .then(function(sum,usr,iss,com,eff,quo){
                console.log(sum._id,usr._id,iss._id,com._id,eff._id,quo._id, test);
                test._tags = [sum._id,usr._id,iss._id,com._id,eff._id,quo._id]
                return test.save(function(err, n){
                    console.log('this is the test with the id', n);
                    // console.log('found newtest', n);
                    next(null, n);
                })
            });
            
        });
};