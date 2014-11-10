// socket stream demo server
'use strict';

// modules ==========================================================
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var crypto = require('crypto');


// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });


// var mongoose = require('mongoose');
// var passport = require('passport');
// var cors = require('cors');

// express modules
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


var port = Number(process.env.FIELD_GUIDE_PORT || 8080);

// for later use with Redis if it becomes important
// process.title = 'field_guide_app';
// var throttle = process.env.FIELD_GUIDE_THROTTLE || 100;

// var database = require('./server/db/db');
// var db = database.db;
// var auth_db = database.auth_db;

// Global application variables =====================================
// app.locals.real_url = '127.0.0.1:8080';

// configuration ====================================================
// app.use(cors()); // permit cross-site requests, ie: passport.

// global.rootRequire = function(name) {
//     return require(__dirname + '/' + name);
// };

// EXPRESS 4.0 CONFIG ===============================================
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.get('/', function(req, res) {
            res.sendfile(__dirname + '/index.html');
        });


// app.get('/', function(req, res){
//   res.sendfile('index.html');
// });

// SOCKET CONFIG ====================================================
// usernames which are currently connected to the chat
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

io.on('connection', function(socket){
    console.log('connection made');

    socket.emit('news', { hello: 'world' });

    socket.on('my other event', function (data) {
        console.log(data);
    });

    // A MESSAGE IS WHAT GETS SENT FROM THE APP TO THE FRONT END
    //  SINCE IT CAN BE LITERALLY ANYTHING, IT IS PROBABLY AN IMAGE
    socket.on('message', function(err, msg){
        // this traces the number of rooms open on the server at any given time.
        var k = Object.keys(io.sockets.manager.roomClients[socket.id]);
        if (k[1] !== undefined) {
            var chan = k[1].substring(1, k[1].length);
            socket.broadcast.to(chan).emit('message', err);
        }
    });

    // JOIN A CHANNEL IN PROGRESS
    socket.on('subscribe', function(data) { 
        var hash = crypto.createHash('md5').update(data.room).digest('hex').substring(0, 8).toLowerCase();
        console.log('joining room', hash);
        var k = Object.keys(io.sockets.manager.roomClients[socket.id]);
        socket.join(hash);
    });

    // This handles rooms?
    socket.on('channel', function(data) { 
        console.log('joining room', data.room.toLowerCase());
        socket.join(data.room); 
    });

    // TODO: Email screenshots from app to wherever - we do not do this =============
    // Also, we are integrated with Mandrill and not Sendgrid, so this will need to be reworked.
});

// ==================================================================

http.listen(port, function(){
    console.log('listening on ', port);
});

// expose app
exports = module.exports = app;

