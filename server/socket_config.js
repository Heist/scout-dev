// socket_config.js
'use strict';

module.exports = function (io) {
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

    io.on('connection', function (socket) {
        console.log('connected a user');

        var name = userNames.getGuestName();
        socket.emit('hello', {greeting: 'hello '+name});

        // send the new user their name and a list of users
        socket.emit('init', {
            name: name,
            users: userNames.get()
        });

        // notify other clients that a new user has joined
        socket.broadcast.emit('user:join', {
            name: name
        });

        // broadcast a user's message to other users
        socket.on('send:message', function (data) {
            socket.broadcast.emit('send:message', {
                user: name,
                text: data.message
            });
        });

        // validate a user's name change, and broadcast it on success
        socket.on('change:name', function (data, fn) {
            if (userNames.claim(data.name)) {
                var oldName = name;
                userNames.free(oldName);

                name = data.name;

                socket.broadcast.emit('change:name', {
                    oldName: oldName,
                    newName: name
                });

                fn(true);
            } else {
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

// WORKING ROOM DEMO CODE, SERVER-SIDE ==============================
// var usernames = {};

// // rooms which are currently available in chat
// var rooms = ['room1','room2','room3'];

// io.sockets.on('connection', function (socket) {

//     // when the client emits 'adduser', this listens and executes
//     socket.on('adduser', function(username){
//         // store the username in the socket session for this client
//         socket.username = username;
//         // store the room name in the socket session for this client
//         socket.room = 'room1';
//         // add the client's username to the global list
//         usernames[username] = username;
//         // send client to room 1
//         socket.join('room1');
//         // echo to client they've connected
//         socket.emit('updatechat', 'SERVER', 'you have connected to room1');
//         // echo to room 1 that a person has connected to their room
//         socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
//         socket.emit('updaterooms', rooms, 'room1');
//     });

//     // when the client emits 'sendchat', this listens and executes
//     socket.on('sendchat', function (data) {
//         // we tell the client to execute 'updatechat' with 2 parameters
//         io.sockets.in(socket.room).emit('updatechat', socket.username, data);
//     });

//     socket.on('switchRoom', function(newroom){
//         // leave the current room (stored in session)
//         socket.leave(socket.room);
//         // join new room, received as function parameter
//         socket.join(newroom);
//         socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
//         // sent message to OLD room
//         socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
//         // update socket session room title
//         socket.room = newroom;
//         socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
//         socket.emit('updaterooms', rooms, newroom);
//     });

//     // when the user disconnects.. perform this
//     socket.on('disconnect', function(){
//         // remove the username from global usernames list
//         delete usernames[socket.username];
//         // update list of users in chat, client-side
//         io.sockets.emit('updateusers', usernames);
//         // echo globally that this client has left
//         socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
//         socket.leave(socket.room);
//     });
// });
};