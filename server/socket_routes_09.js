// socket_routes_1.js
'use strict';

module.exports = function(io, app, passport) {
    // MODULES ============================================
    var cookie = require('cookie'),
        cookieParser = require('cookie-parser'),
        crypto = require('crypto'),
        passportSocketIo = require('passport.socketio'),
        _ = require('underscore');

    // LOCAL GLOBALS ======================================
    var user = {},
        socketData = {},
        name = '',
        default_room = '';

    // MODELS =============================================
    var Test = require('./models/data/test');



    // AUTHENTICATION VIA PASSPORT ========================
    io.configure(function () {
        io.set('authorization', passportSocketIo.authorize({
            cookieParser: cookieParser,
            key:         'connect.sid',       // the name of the cookie where express/connect stores its session_id
            secret:      app.locals.secret,    // the session_secret to parse the cookie
            store:       app.locals.store,        // we NEED to use a sessionstore. no memorystore please
            success:     onAuthorizeSuccess,  // *optional* callback on success - read more below
            fail:        onAuthorizeFail,     // *optional* callback on fail/error - read more below
        }));
    });

    function onAuthorizeSuccess(data, accept){
        // Passport has heard of them ===========
        
        console.log('authwin socket connection info', data.query.test);

        user = data.user;
        name = data.user.name;
        userNames.claim(name);
        
        default_room = data.query.test;

        accept(null, true);

    }

    function onAuthorizeFail(data, message, error, accept){
        // Assumed to be a guest user ===========

        if(error){ console.log(error);}
        
        console.log('failed connection to socket.io:', message);
        console.log('authfail socket connection info', data.query.test, default_room);
        name = userNames.getGuestName();
        default_room = data.query.test;

        accept(null, true);
        
        // accept();

        // If they are not a guest user =========
        // accept(new Error(message));
        // this error will be sent to the user as a special error-package
        // see: http://socket.io/docs/client-api/#socket > error-object
    }

// CONNECT TO THE SOCKETS ===========================================

// ROOM REGISTRATION BASED ON CONNECTION QUERYSTRING ============
    // http://blog.seafuj.com/migrating-to-socketio-1-0
    // SOCKET 0.9 VARIANT


    var roomList = [];

// FIRE IT UP =======================================================
    io.sockets.on('connection', function (socket) {
        console.log('hello user', user._account);
        console.log('someone connected from somewhere');
        // console.log('do we have a test room?', default_room);

        // socket.emit('connected', {socket: socket});

        var k = '';

        socket.on('message', function(msg, err){
            // if there's no channel, emit the message that there's no channel? IDK.
            // console.log('message arrived!', msg, err);
            k = Object.keys(io.sockets.manager.roomClients[socket.id]);
            if (k[1] !== undefined) {
                var chan = k[1].substring(1, k[1].length);
                socket.broadcast.to(chan).emit('message', msg);
            }
        });

        // subscription is used in the iOS app
        socket.on('subscribe', function(data) { 
            console.log('subscription arrived', data);

            var hash = crypto.createHash('md5').update(data.room).digest('hex').substring(0, 8).toLowerCase();
            console.log('joining room hash', hash);
            k = Object.keys(io.sockets.manager.roomClients[socket.id]);
            socket.join(hash); 

        });

        // channel or join_room are used by the web app
        socket.on('channel', function(data) { 
            console.log('joining channel', data.room, data.test, data);

            var promise = Test.findOne({'_id': data.test}).select("name link").exec();
            promise.then(function(test){
                // joins the test to the socket from remote device
                console.log('Test found', test);
                socket.join(data.room);

                // passes the phone the route for getting the appropriate test from the socket
                io.sockets.in(data.room).emit('joinedChannel', {data: {body: test.link, title:test.name}});
            });
        });

        socket.on('join_room', function(data) { 
            console.log('joining room', data.room.toLowerCase());
            socket.join(data.room);
        });


        socket.on('testComplete', function(data){
            console.log('testComplete', data);
            io.sockets.in(data.room).emit('endTest', data);
        });

    });

// Guest name management ============================================
    // Keep track of which names are used so that there are no duplicates

    var userNames = (function () {
            var names = {};

            var claim = function (name) {
                if (!name || names[name]) {
                    return false;
                } else {
                    names[name] = true;
                    return true;
                }
            };

            // find the lowest unused "guest" name and claim it
            var getGuestName = function () {
                var name,
                    nextUserId = 1;

                do {
                    name = 'Guest ' + nextUserId;
                    nextUserId += 1;
                } while (!claim(name));

                return name;
            };

            // serialize claimed names as an array
            var get = function () {
                var res = [];
                for (var user in names) {
                    res.push(user);
                }

                return res;
            };

            var free = function (name) {
                if (names[name]) {
                    delete names[name];
                }
            };

            return {
                claim: claim,
                free: free,
                get: get,
                getGuestName: getGuestName
            };
        }());

};