// socket_config.js
'use strict';


module.exports = function(io, app, passport) {
// Guest name management 
// Keep track of which names are used so that there are no duplicates
    // var userNames = (function () {
    //     var names = {};

    //     var claim = function (name) {
    //         if (!name || names[name]) {
    //             return false;
    //         } else {
    //             names[name] = true;
    //             return true;
    //         }
    //     };

    //     // find the lowest unused "guest" name and claim it
    //     var getGuestName = function () {
    //         var name,
    //             nextUserId = 1;

    //         do {
    //             name = 'Guest ' + nextUserId;
    //             nextUserId += 1;
    //         } while (!claim(name));

    //         return name;
    //     };

    //     // serialize claimed names as an array
    //     var get = function () {
    //         var res = [];
    //         for (var user in names) {
    //             res.push(user);
    //         }

    //         return res;
    //     };

    //     var free = function (name) {
    //         if (names[name]) {
    //             delete names[name];
    //         }
    //     };

    //     return {
    //         claim: claim,
    //         free: free,
    //         get: get,
    //         getGuestName: getGuestName
    //     };
    // }());

// SOCKET MANAGEMENT  ===============================================

// Modules ================================================
    var cookieParser = require('cookie-parser'),
        passportSocketIo = require("passport.socketio"),
        user = {},
        name = '';
        // connectedUsers = [],
        // nsp = '',

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

// on connect, it tried to connect to the default, gets authorized, and if not authorized cannot connect.
// it is then passed to the namespace for that socket, which is _account.
// TODO: Unauthorized users should be able to connect to watch a test in progress.
    
    function onAuthorizeSuccess(data, accept){
        // console.log('successful connection to socket.io', data.user);
        user = data.user;
        name = data.user.name;

        // userNames.claim(name);
        // nsp = io.of('/'+user._account); // Each account has its own chat namespace.
        accept();
    }

    function onAuthorizeFail(data, message, error, accept){

        if(error){ console.log(error);}
            // accept(new Error(message));
            console.log('failed connection to socket.io:', message);
            // name = userNames.getGuestName();

            accept();
        // }
      // this error will be sent to the user as a special error-package
      // see: http://socket.io/docs/client-api/#socket > error-object
    }
     

io.on('connection', function (socket) {
        
        socket.emit('handshake', { hello: 'world' });
        
        // socket.on('my other event', function (data) {
        //     console.log(data);
        // });

        socket.on('send:join_room', function(data){
            console.log('room name', data);
            socket.emit('announce', 'hello world');
            // store the room name in the socket session for this client
            // socket.room = test_id;
            
            // join the room yourself
            // socket.join(test_id);
        });

        // var users = userNames.get();
        // var room = ''; // room isn't set yet.
        // console.log( 'Hello ' +  name +  ' connected!');

        // socket.on('message', function (data) {
        //     // we tell the client to execute 'updatechat' with 2 parameters
        //     console.log('message hit', data);
        //     socket.emit('announce', 'hello world');
        //     io.sockets.in(socket.room).emit('announce', data);
        // });

        // join the room for the test, if you are a moderator
        






// ROOM SETUP - MODERATOR SIDE ======================================

// Run test - add a subject to open a room for observers to join
// Add the current user to that room.

//             socket.join();

//             socket.emit('init', {
//                 name: name,
//                 users: userNames.get()
//             });


// // SOCKET.ON EVENTS =================================================

        
//         socket.on('send:joinRoom', function(test_id){
//             if(socket.room === test_id){
//                 console.log('room acquired by remote', test_id);
//                 socket.join(test_id);
//             } else {
//                 console.log('no test running by that name');
//                 // do something if that room doesn't exist
//             }
//         });

//         // when the client emits 'sendchat', this listens and executes
//         socket.on('send:note', function (data) {
//         // we tell the client to execute 'updatechat' with 2 parameters
//             io.sockets.in(socket.room).emit('updatechat', data);
//         });


        // console.log('userlist', userNames.get());

        // // notify other clients that a new user has joined
        // socket.broadcast.emit('user:join', {
        //     name: name
        // });

        // // broadcast a user's message to other users
        // socket.on('send:message', function (data) {
        //     socket.broadcast.to().emit('send:message', {
        //         user: name,
        //         text: data.message
        //     });
        // });

        // // validate a user's name change, and broadcast it on success
        // socket.on('change:name', function (data, fn) {
        //     console.log('touched namechange', data);

        //     if (userNames.claim(data.name)) {

        //         var oldName = name;
        //         userNames.free(oldName);

        //         name = data.name;

        //         socket.broadcast.emit('change:name', {
        //             oldName: oldName,
        //             newName: name
        //         });
                
        //         console.log('userlist new', userNames.get());
        //         fn(true);
        //     } else {
        //         console.log('userlist old', userNames.get());
        //         fn(false);
        //     }
        // });

        // // clean up when a user leaves, and broadcast it to other users
        socket.on('disconnect', function () {
            console.log('goodbye user');
            socket.broadcast.emit('user:left', {
                name: name
            });
            // userNames.free(name);
        });
    });
};