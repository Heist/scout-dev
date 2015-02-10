// onboarding and user models
// user.js
'user strict';

module.exports = function(app, passport) {
var User = global.rootRequire('./models/auth/user');


app.route('/api/user/:_id')
    .get(function(req,res){

    })
    .put(function(req,res){
        console.log('update user onboarding', req.body);
        User.findOne('_id':req.body.user._id)
            .exec(function(err, user){
                user.onboard = req.body.onboard;
                user.save(function(err, data){
                    if(err){console.log(err);}
                    res.send('saved');
                });
            });
    })

};
