// socket_config.js
'use strict';

module.exports = function(io, app, passport) {
    var cookieParser = require('cookie-parser'),
        passportSocketIo = require('passport.socketio'),
        user = {},
        nsp = io.of('/'+ user.account),
        socketData = {},
        name = '',
        room = '';


    // ROOM REGISTRATION BASED ON CONNECTION QUERYSTRING ============
    // http://blog.seafuj.com/migrating-to-socketio-1-0

    io.use(function(socket, next) {
        console.log('socket query', socket.request._query, socket.id);
        var query = socket.request._query;
        room = query.test;

        socketData[socket.id] = {
            room: room
        };

        socket.join(room);
        console.log('room joined', room);
        next();
    });

    // AUTHENTICATION MIDDLEWARE ====================================
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key:         'connect.sid',       // the name of the cookie where express/connect stores its session_id
        secret:      app.locals.secret,    // the session_secret to parse the cookie
        store:       app.locals.store,        // we NEED to use a sessionstore. no memorystore please
        success:     onAuthorizeSuccess,  // *optional* callback on success - read more below
        fail:        onAuthorizeFail,     // *optional* callback on fail/error - read more below
    }));

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

/*

TODO: 
On Watch, we need to know what rooms are presently available for a given test.
A useful room is a test that has a subject set. 
On connection, a user gets passed to a default room, with the test name.
When that room gets a subject added to it, that subject should get sent to all people in the room
The Subject becomes a new room.
All Watchers then get the chance to join that room, which is added to a list on Client.

TODO 2:

On connect watch, join default room - done

Get client list of default room - Not Done
Get list of rooms all other clients are in within default room? (IE: list of available rooms still open)x


TODO 3: Namespace this to /test, and Namespace /stream separately with the same identifiers.

*/


    io.on('connection', function (socket) {
        console.log('hello user', user._account);
        
        // All of these variables die with the connection.
        // This probably works to kill old rooms and things?

        var origin_room = socketData[socket.id].room;
        var roomList = [];
        var testRoom = {};

        // console.log(myNumber, 'connected');

        // return clients in given room
        var roomClients = io.of('').adapter.rooms[room];
        
        for(var socketId in roomClients){
            if(roomClients.hasOwnProperty(socketId)){
                console.log(io.of('').connected[socketId].id, 'is in myroom');
            }
        }

        // send it to everyone but sender
        // socket.broadcast.to(room).emit('announce', {data: 'announcement'});
        // socket.to(room).emit('announce', {data: 'socket room'});
        
        // // send it to everyone in the room
        // io.to(room).emit('announce', {data: room});

// CONNECTION ROUTES ================================================
    // Note to self: all sockets receive their default room from
    // the URL /:test_id as $stateParams._id
    // After they're logged
    // The moderator can open _another_ room, 
    // which becomes a pool of IDs available for connection
    // {name: name, room: _id}
    // 
    // On connection of a Watch socket, that room list
    // is output to the newly connected user, who then
    // selects their room from the list
    // and joins that channel as well as the previous channel.

        socket.on('get_room_list', function(data){
            console.log('get room list', roomList);
        });


// MESSAGING ROUTES =================================================

        socket.on('send:note', function(data){
            console.log('note sent', data);
            socket.to(origin_room).emit('note', data);
        });

        socket.on('send:subject_added', function(data){
            console.log('subject added socket', data.subject);
            
            // Join the subject test
            socket.join(data.subject._id);
            
            // store the subject test on an accessible variable
            testRoom = data.subject._id;

            // add the available rooms to the room list
            // TODO: Garbage collection: roomList will need to self-destruct on disconnection?
            // How will this clean up, since it lives on Server forever? HMM.
            roomList.push({name: data.subject.name, room: data.subject._id}); 

            console.log('subject add roomlist', roomList);

            // Tell anyone in the origin room we have a new subject somewhere
            socket.to(origin_room).emit('room_list_update', roomList);
        });

        socket.on('join_subject_test', function(data){
            console.log('join test touched', data);
            socket.join(data.subject);
            socket.to(origin_room).emit('add_subject', data);
        });

        socket.emit('announce', 'control announcement');

        socket.on('disconnect', function () {
            console.log('goodbye user');
            socket.broadcast.emit('user:left', {
                name: name
            });
            userNames.free(name);
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
