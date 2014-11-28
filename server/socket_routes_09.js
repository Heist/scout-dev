// socket_routes_1.js
'use strict';

module.exports = function(io, app, passport) {
    var cookie = require('cookie'),
        cookieParser = require('cookie-parser'),
        crypto = require('crypto'),
        passportSocketIo = require('passport.socketio'),
        _ = require('underscore'),
        user = {},
        socketData = {},
        name = '',
        default_room = '';


    var Test = require('./models/data/test');

    // // our kickoff configuration for sockets 1.0 ....
    io.configure(function(){
        io.set('authorization', function (handshake, callback) {
            try {
            var data = handshake || request;
            if (! data.headers.cookie) {
                return next(new Error('Missing cookie headers'));
            }
            console.log('cookie header ( %s )', JSON.stringify(data.headers.cookie));
            var cookies = cookie.parse(data.headers.cookie);
            console.log('cookies parsed ( %s )', JSON.stringify(cookies));
            if (! cookies[COOKIE_NAME]) {
                return next(new Error('Missing cookie ' + COOKIE_NAME));
            }
            var sid = cookieParser.signedCookie(cookies[COOKIE_NAME], COOKIE_SECRET);
            if (! sid) {
                return next(new Error('Cookie signature is not valid'));
            }
            console.log('session ID ( %s )', sid);
            data.sid = sid;
            
            app.locals.store.get(sid, function(err, session) {
                if (err) {return next(err);}
                if (! session) {return next(new Error('session not found'));}
                data.session = session;
                next();
            });
        } catch (err) {
            console.error(err.stack);
            next(new Error('Internal server error'));
        }
          callback(null, true);
        });
    })


    // io.use(function(socket, next) {
    //     try {
    //         var data = handshake || request;
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

        //     io.sockets.in(data.room).emit('joined_channel', {data: data.room, name:'io.sockets.in'});
        //     socket.broadcast.to(data.room).emit('joined_channel', {data: data.room, name:'socket.broadcast.to join room'});
        //     io.sockets.emit('joined_channel', {data: data.room, name:'io.sockets.emit'});
        //     // io.emit('joined_channel', {data: data.room, name:'io.emit'});
        //     // socket.emit('joined_channel', {data: data.room, name:'socket.emit'});
        //     io.sockets.to(data.room).emit('joined_channel', {data: data.room, name:'io.sockets.to'});
        });

        // Connect to default room from querystring.
        // var master_room_collection = {};
        // var origin_room = testRoom;

        // console.log(testRoom, 'connected');

        // return clients in given room
        // console.log(testRoom, 'connected');

        // join this socket to the default chat room from the querystring
        // socket.join(testRoom);

        // var roomClients = io.of('').clients(testRoom);

        // _.each(roomClients, function(client){
        //     console.log(client.handshake.testRoom, 'is in myroom');
        // });


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