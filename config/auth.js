// config/auth.js

// expose our config directly to our application using module.exports
module.exports = function(app){
    var authObj = {
        'trelloAuth' : {
                'clientID'  : '3db0f3dee26d4be56033d04b47c53e7b',
                'clientSecret' : 'dcc5e3171042186dc7ff33a947acae806d73ab2993a7c8be2701fb48157b96bc',
                'callbackURL'  : 'http://'+app.locals.real_url+'/connect/trello/callback'
            }
        };

    return authObj;

};