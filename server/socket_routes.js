// socket_config.js
'use strict';

module.exports = function(io, app, passport) {
    var cookieParser = require('cookie-parser'),
        passportSocketIo = require("passport.socketio"),
        user = {},
        nsp = io.of('/'+ user.account),
        name = '',
        room = '';


    // Get the room name
    io.use(function(socket, next) {
        console.log(socket.request._query);
        var query = socket.request._query;
        room = query.test;

        socket.join(room);
        console.log('room joined', room);
        
        next();
    });

    // Authenticate things
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key:         'connect.sid',       // the name of the cookie where express/connect stores its session_id
        secret:      app.locals.secret,    // the session_secret to parse the cookie
        store:       app.locals.store,        // we NEED to use a sessionstore. no memorystore please
        success:     onAuthorizeSuccess,  // *optional* callback on success - read more below
        fail:        onAuthorizeFail,     // *optional* callback on fail/error - read more below
    }));

    function onAuthorizeSuccess(data, accept){
        // console.log('successful connection to socket.io', data.user);
        user = data.user;
        name = data.user.name;
        userNames.claim(name);
        // Each account has its own chat namespace.
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
        console.log('hello user', user._account);
        
        // send it to everyone but sender
        socket.broadcast.to(room).emit('announce', {data: 'announcement'});
        socket.to(room).emit('announce', {data: 'socket room'});
        
        // send it to everyone period
        io.to(room).emit('announce', {data: room});
        
        socket.emit('announce', 'control announcement');

        socket.on('disconnect', function () {
            console.log('goodbye user');
            socket.broadcast.emit('user:left', {
                name: name
            });
            userNames.free(name);
        });
    });


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
};
