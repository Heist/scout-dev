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

        console.log('userlist', userNames.get());
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
            console.log('touched namechange', data);

            if (userNames.claim(data.name)) {

                var oldName = name;
                userNames.free(oldName);

                name = data.name;

                socket.broadcast.emit('change:name', {
                    oldName: oldName,
                    newName: name
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