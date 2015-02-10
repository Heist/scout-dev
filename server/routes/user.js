// onboarding and user models
// user.js
'user strict';

module.exports = function(app, passport) {
var User = global.rootRequire('./server/models/auth/user');

app.route('/api/user/:_id')
    .get(function(req,res){

    })
    .put(function(req,res){
        User.findOne({'_id' : req.user._id})
            .exec(function(err, user){
                if(err){console.log(err);}
                if(user){
                    console.log('req.body.onboard', user.onboard, req.body);
                    user.onboard = req.body.onboard;
                    user.save(function(err, data){
                        if(err){console.log(err);}
                        console.log('user onboard', user.onboard);
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
