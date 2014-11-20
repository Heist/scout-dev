// socket_routes_1.js
'use strict';

module.exports = function(io, app, passport) {
    var cookie = require('cookie'),
        cookieParser = require('cookie-parser'),
        crypto = require('crypto'),
        passportSocketIo = require('passport.socketio'),
        _ = require('underscore'),
        user = {},
        nsp = io.of('/'+ user.account),
        socketData = {},
        name = '',
        room = '',
        COOKIE_NAME = app.locals.cookie_name,
        COOKIE_SECRET = app.locals.secret;





    // // our kickoff configuration for sockets 1.0 ....
    // io.use(function(socket, next) {
    //     try {
    //         var data = socket.handshake || socket.request;
    //         if (! data.headers.cookie) {
    //             return next(new Error('Missing cookie headers'));
    //         }
    //         console.log('cookie header ( %s )', JSON.stringify(data.headers.cookie));
    //         var cookies = cookie.parse(data.headers.cookie);
    //         console.log('cookies parsed ( %s )', JSON.stringify(cookies));
    //         if (! cookies[COOKIE_NAME]) {
    //             return next(new Error('Missing cookie ' + COOKIE_NAME));
    //         }
    //         var sid = cookieParser.signedCookie(cookies[COOKIE_NAME], COOKIE_SECRET);
    //         if (! sid) {
    //             return next(new Error('Cookie signature is not valid'));
    //         }
    //         console.log('session ID ( %s )', sid);
    //         data.sid = sid;
            
    //         app.locals.store.get(sid, function(err, session) {
    //             if (err) {return next(err);}
    //             if (! session) {return next(new Error('session not found'));}
    //             data.session = session;
    //             next();
    //         });
    //     } catch (err) {
    //         console.error(err.stack);
    //         next(new Error('Internal server error'));
    //     }
    // });

    // AUTHENTICATION MIDDLEWARE ====================================
    io.configure(function () {
        io.set('authorization', passportSocketIo.authorize({
            cookieParser: cookieParser,
            key:         'connect.sid',       // the name of the cookie where express/connect stores its session_id
            secret:      'session_secret',    // the session_secret to parse the cookie
            store:       app.locals.store,        // we NEED to use a sessionstore. no memorystore please
            success:     onAuthorizeSuccess,  // *optional* callback on success - read more below
            fail:        onAuthorizeFail,     // *optional* callback on fail/error - read more below
        }));
    });

    function onAuthorizeSuccess(data, accept){
        // Passport has heard of them ===========
        
        user = data.user;
        name = data.user.name;
        userNames.claim(name);
        
        accept();
    }

    function onAuthorizeFail(data, message, error, accept){
        // Assumed to be a guest user ===========

        if(error){ console.log(error);}
        
        console.log('failed connection to socket.io:', message);
        name = userNames.getGuestName();
        accept();
        
        // If they are not a guest user =========
        // accept(new Error(message));
        // this error will be sent to the user as a special error-package
        // see: http://socket.io/docs/client-api/#socket > error-object
    }

// CONNECT TO THE SOCKETS ===========================================

// ROOM REGISTRATION BASED ON CONNECTION QUERYSTRING ============
    // http://blog.seafuj.com/migrating-to-socketio-1-0
    // SOCKET 0.9 VARIANT
    
    io.set('authorization', function(data, accept)
    {
        console.log('socket auth data', data);
        var query = data.query;
        data.testRoom = query.testroom;

        accept(null, true);
    });

    var roomList = [];

// FIRE IT UP =======================================================
    io.sockets.on('connection', function (socket) {
        console.log('hello user', user._account);
        console.log('someone connected from somewhere');
        
    });
};