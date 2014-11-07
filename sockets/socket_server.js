// socket stream demo server
'use strict';

// modules ==========================================================
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');


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
io.on('connection', function(socket){
    console.log('a user connected');
});

// io.on('connection', function(client){
//     console.log('connection made');

//     client.emit('news', { hello: 'world' });

//     client.on('my other event', function (data) {
//         console.log(data);
//     });

//     client.on('message', function(err, msg){
//         // this traces the number of rooms open on the server at any given time.
//         var k = Object.keys(io.sockets.manager.roomClients[client.id]);
//         if (k[1] !== undefined) {
//             var chan = k[1].substring(1, k[1].length);
//             client.broadcast.to(chan).emit('message', err);
//         }
//     });

//     // 
//     client.on('subscribe', function(data) { 
//         var hash = crypto.createHash('md5').update(data.room).digest('hex').substring(0, 8).toLowerCase();
//         console.log('joining room', hash);
//         var k = Object.keys(io.sockets.manager.roomClients[client.id]);
//         client.join(hash);
//     });

//     // 
//     client.on('channel', function(data) { 
//         console.log('joining room', data.room.toLowerCase());
//         client.join(data.room); 
//     });

//     // TODO: Email screenshots from app to wherever - we do not do this =============
//     // Also, we are integrated with Mandrill and not Sendgrid, so this will need to be reworked.
//     client.on('pics', function(data, err){


//         if (sendgrid === undefined) {
//             console.log("received email request but could not service");
//             return;
//         }

//         console.log("pics rec'd");

//         var imgs = data.msg.img_array;
//         var email_addr = decodeURI(data.msg.email);
//         var today = new Date();
//         var email = new sendgrid.Email();
        
//         email.addTo(email_addr);
//         email.setFrom("iOStream");
//         email.setSubject('[iOStream] Screenshots from ' + today.toDateString());

//         email.setText('Hi! Attached are your screenshots with annotations from ' + today.toLocaleString());
//         email.addHeader({'X-Sent-Using': 'SendGrid-API'});
//         email.addHeader({'X-Transport': 'web'});

//         for (var ii = 0; ii < imgs.length; ii++)
//         {
//             var b64string = decodeURI(imgs[ii]);
//             b64string = b64string.substring(23);

//             var buf = new Buffer(b64string, 'base64');

//             email.addFile({content: buf, filename: 'ss'+ (ii + 1) +'.jpg'});
//         }

//         sendgrid.send(email, function(err, json) {  
//             if (err) { return console.error(err); }
//             console.log(json);
//         });


//     });
// });

// ==================================================================

http.listen(port, function(){
    console.log('listening on ', port);
});

// expose app
exports = module.exports = app;

