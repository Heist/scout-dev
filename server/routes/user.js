// onboarding and user models
// user.js
(function(){
'use strict';

module.exports = function(app, passport) {
// load data storage models =====================
    var models  = require('../models');


app.route('/api/user/:_id')
    .get(function(req,res){

    })
    .put(function(req,res){
        models.User.findOne({'_id' : req.user._id})
            .exec(function(err, user){
                if(err){console.log(err);}
                if(user){
                    // console.log('req.body.onboard', user.onboard, req.body);
                    user.onboard = req.body.onboard;
                    user.save(function(err, data){
                        if(err){console.log(err);}
                        // console.log('user onboard', user.onboard);
                        res.send('saved');
                    });
                }
                else {
                    console.log('user not found');
                    res.send('user not found');
                }
            });
    });

};
})();