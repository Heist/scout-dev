// socket_config.js
'use strict';


module.exports = function(io, app, passport) {
// Guest name management 
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

// SOCKET MANAGEMENT  ===============================================

// Modules ================================================
    var cookieParser = require('cookie-parser'),
        passportSocketIo = require("passport.socketio"),
        user = {},
        // connectedUsers = [],
        nsp = '';

// CONFIG =================================================
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key:         'connect.sid',       // the name of the cookie where express/connect stores its session_id
        secret:      app.locals.secret,    // the session_secret to parse the cookie
        store:       app.locals.store,        // we NEED to use a sessionstore. no memorystore please
        success:     onAuthorizeSuccess,  // *optional* callback on success - read more below
        fail:        onAuthorizeFail,     // *optional* callback on fail/error - read more below
    }));

// CONNECT ================================================
// // '' and '/' are equal
// io.of('').on('connection', function(){
//   // Connecting to '/' will do the trick
// });
// // 'abc' and '/abc' are equal
// io.of('abc').on('connection', function(){
//   // Connecting to '/abc' will do the trick
// });

    
    function onAuthorizeSuccess(data, accept){
        // console.log('successful connection to socket.io', data.user);
        userNames.claim(data.user.name);
        user = data.user;
        // nsp = io.of('/'+user._account); // Each account has its own chat namespace.
        accept();
    }

    function onAuthorizeFail(data, message, error, accept){
        if(error){
            accept(new Error(message));
            console.log('failed connection to socket.io:', message);
        }
      // this error will be sent to the user as a special error-package
      // see: http://socket.io/docs/client-api/#socket > error-object
    }
    
    io.of('/'+user._account).on('connection', function (socket) {
        console.log(
        'Hello ' + 
         user.name + 
        ' connected!');



// ROOM SETUP - MODERATOR SIDE ======================================

// Run test - add a subject to open a room for observers to join
// Add the current user to that room.

        socket.on('send:newRoom', function(room_id){
            console.log('room name', room_id);
            
            // store the room name in the socket session for this client
            socket.room = room_id;
            
            // join the room yourself
            socket.join(room_id);
        });

        socket.on('send:joinRoom', function(room_id){
            socket.join(room_id);
        });

// Moderator joins the channel and gets assigned their name goes down below


// OBSERVER ROUTES ==================================================
// - an observer joins a channel and gets a name
// check to see if the username already exists
// if it doesn't already exist, get a guest name and register it

        // var name = userNames.getGuestName();

        // socket.emit('hello', {greeting: 'hello '+name});

        // send the new user their name and a list of users
        socket.emit('init', {
            name: user.name,
            users: userNames.get()
        });

        console.log('userlist', userNames.get());

        // notify other clients that a new user has joined
        socket.broadcast.emit('user:join', {
            name: user.name
        });

        // broadcast a user's message to other users
        socket.on('send:message', function (data) {
            socket.broadcast.to().emit('send:message', {
                user: user.name,
                text: data.message
            });
        });

        // validate a user's name change, and broadcast it on success
        socket.on('change:name', function (data, fn) {
            console.log('touched namechange', data);

            if (userNames.claim(data.name)) {

                var oldName = user.name;
                userNames.free(oldName);

                user.name = data.name;

                socket.broadcast.emit('change:name', {
                    oldName: oldName,
                    newName: user.name
                });
                
                console.log('userlist new', userNames.get());
                fn(true);
            } else {
                console.log('userlist old', userNames.get());
                fn(false);
            }
        });

        // clean up when a user leaves, and broadcast it to other users
        socket.on('disconnect', function () {
            console.log('goodbye user');
            socket.broadcast.emit('user:left', {
                name: name
            });
            userNames.free(name);
        });
    });
};