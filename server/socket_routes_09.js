// socket_routes_09.js
'use strict';

module.exports = function(app, passport, io) {
    // MODULES ============================================
    var cookie = require('cookie'),
        cookieParser = require('cookie-parser'),
        crypto = require('crypto'),
        passportSocketIo = require('passport.socketio'),
        _ = require('lodash');

    // LOCAL GLOBALS ======================================
    var user = {},
        socketData = {},
        name = '',
        default_room = '';

    // MODELS =============================================
    var Test = require('./models/data/test');
    
    // var secrets = require(path.join(__dirname,'secrets'));

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
        
        console.log('socket authorization success')

        user = data.user;
        name = data.user.name;
        userNames.claim(name);
        
        default_room = data.query.test;

        accept(null, true);

    }

    function onAuthorizeFail(data, message, error, accept){
        // Assumed to be a guest user ===========

        if(error){ console.log(error); }
        console.log('socket authorization failure') 

        name = userNames.getGuestName();
        default_room = data.query.test;

        accept(null, true);

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
        console.log('connection from web app or iOS')

        var k = '';

        socket.on('message', function(msg, err){
            // if there's no channel, emit the message that there's no channel? IDK.
            // On message received from iOS App, send that message to the room
            // room is identified by the device ID

            console.log('Received message');
            k = Object.keys(io.sockets.manager.roomClients[socket.id]);
            if (k[1] !== undefined) {
                var chan = k[1].substring(1, k[1].length);
                socket.broadcast.to(chan).emit('message', msg);                
            }
        });

        // subscription is used in the iOS app
        socket.on('subscribe', function(data) { 
            // get the app GUID and convert it to a short room key
            // emit that room key to the server and the client
            // join that channel oneself

            var hash = crypto.createHash('md5').update(data.room).digest('hex').substring(0, 8).toLowerCase();
            k = Object.keys(io.sockets.manager.roomClients[socket.id]);
            console.log('channel subscription received', data.room, hash);
            socket.join(hash);
        });

        // channel or join_room are used by the web client
        socket.on('channel', function(data) { 
            // when someone enters a channel on the web client
            // The web client passes back the name of the test to the channel as data
            // That data is then sent to the app

            console.log('someone chose a channel', data.test)

            var promise = Test.findOne({'_id': data.test})
                              .select("name link")
                              .exec();
                              
            promise.then(function(test){
                // joins the test to the socket from remote device
                console.log('join this test', test, 'room', data.room);
                socket.join(data.room);

                // joins the socket to the test, which lets us communicate to watch regardless of testroom
                socket.join(data.test);
                // passes the phone the route for getting the appropriate test from the socket
                // MUST be an event named joinedChannel for iOS to work
                io.sockets.in(data.room).emit('joinedChannel', {data: {body: test.link, title:test.name}});

                // this is for the test room.
                io.sockets.in(data.test).emit('joinedTest', {data: {body: test.link, title:test.name}});
            });
        });

        socket.on('join_room', function(data) { 
            console.log('socket joining room', data.room);
            socket.join(data.room);
        });


        socket.on('testComplete', function(data){
            console.log('test ending', data.data.body);
            io.sockets.in(data.data.room).emit('endTest', data.data.body);
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