// socket_routes_1.js
'use strict';

module.exports = function(io, app, passport, debug) {

    // SOCKET ROUTES - 1.0 Client ==============================================
    // var socket = io('/?test='+$stateParams._id);

    // socket.on('disconnect', function(data)
    // {
    //     console.log('disconnect');
    // });

    // socket.disconnect();

    var cookie = require('cookie'),
        cookieParser = require('cookie-parser'),
        crypto = require('crypto'),
        passportSocketIo = require('passport.socketio'),
        user = {},
        nsp = io.of('/'+ user.account),
        socketData = {},
        name = '',
        room = '',
        COOKIE_NAME = app.locals.cookie_name,
        COOKIE_SECRET = app.locals.secret;

    // our kickoff configuration for sockets 1.0 ....
    io.use(function(socket, next) {
        try {
            var data = socket.handshake || socket.request;
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
    });


    // ROOM REGISTRATION BASED ON CONNECTION QUERYSTRING ============
    // http://blog.seafuj.com/migrating-to-socketio-1-0
    // this is only good on Socket 1.0+ - we are presently using Socket 0.9

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

// This needs to not be a global, AND YET. 

// The roomList should store an object per session that has the test key
// Then a list of things that live with that test key. 
// (It may need to live in Mongo or another session storage system)
// roomlist[test].[channel]; is the ideal object structure
// When a test is deleted, it removes itself from the roomList.

function testSession(main, channel){
    /*

    pseudocode: if main, then join a main room
    on new room channel, add channels to channel object
    on new client, add client to testSession object
    on disconnect, pop open this object, find client and channel
    destroy client and channel

    */
}

    var roomList = [];

    io.on('connection', function (socket) {
        console.log('hello user', user._account);
        console.log('someone connected from somewhere');
        // All of these variables die with the connection.
        // This probably works to kill old rooms and things?

        var origin_room = socketData[socket.id].room;
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
// CANVAS ROUTES ======================================================
        socket.emit('connected', {socket: socket});

        var k = '';

        socket.on('message', function(err, msg){
                k = Object.keys(io.sockets.manager.roomClients[socket.id]);
                if (k[1] !== undefined) {
                    var chan = k[1].substring(1, k[1].length);
                    socket.broadcast.to(chan).emit('message', err);
                }
            });
        
        socket.on('pics', function(data, err){
            // if (sendgrid == undefined) {
            //     console.log("received email request but could not service");
            //     return;
            // }
            // console.log("pics rec'd");

            // imgs = data.msg.img_array;
            // email_addr = unescape(data.msg.email);

            // today = new Date();

            // var email = new sendgrid.Email();
            
            // email.addTo(email_addr);
            // email.setFrom("iOStream");
            // email.setSubject('[iOStream] Screenshots from ' + today.toDateString());

            // email.setText('Hi! Attached are your screenshots with annotations from ' + today.toLocaleString());
            // email.addHeader({'X-Sent-Using': 'SendGrid-API'});
            // email.addHeader({'X-Transport': 'web'});

            // for (ii = 0; ii < imgs.length; ii++)
            // {
            // var b64string = unescape(imgs[ii]);
            // b64string = b64string.substring(23);

            // var buf = new Buffer(b64string, 'base64');

            // email.addFile({content: buf, filename: 'ss'+ (ii + 1) +'.jpg'});
            // }


            // sendgrid.send(email, function(err, json) {  
            // if (err) { return console.error(err); }
            //   console.log(json);
            // });


        });

        socket.on('subscribe', function(data) { 
            var hash = crypto.createHash('md5').update(data.room).digest('hex').substring(0, 8).toLowerCase();
            console.log('joining room', hash);
            k = Object.keys(io.sockets.manager.roomClients[socket.id]);
            socket.join(hash); 
        });

        socket.on('channel', function(data) { 
            console.log('joining room', data.room.toLowerCase());
            socket.join(data.room); 
        });

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
            socket.emit('room_list', {rooms: roomList});
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
            roomList.push({subject: data.subject, room: data.subject._id}); 

            console.log('subject add roomlist', roomList);

            // Tell anyone in the origin room we have a new subject somewhere
            socket.to(origin_room).emit('room_list_update', {rooms: roomList});
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
