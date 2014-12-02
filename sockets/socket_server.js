// socket stream demo server
'use strict';

// modules ==========================================================
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var crypto = require('crypto');

// express modules
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


var port = Number(process.env.FIELD_GUIDE_PORT || 8080);

// EXPRESS 4.0 CONFIG ===============================================
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.get('/', function(req, res) {
            res.sendfile(__dirname + '/index.html');
        });

// SOCKET CONFIG ====================================================
// usernames which are currently connected to the chat
require('./server/socket_config.js')(io);


// ==================================================================

http.listen(port, function(){
    console.log('listening on ', port);
});

// expose app
exports = module.exports = app;

