var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/observer', function(req, res){
  var id = Math.round((Math.random() * 1000000));
  res.redirect('/observer/'+id);
});

app.get('/tester/:id', function(req, res){
  res.sendfile('tester.html');
});

app.get('/observer/:id', function(req, res){
  res.sendfile('observer.html');
});

io.on('connection', function(socket){
  // console.log('a user connected');
  socket.on('joinRoom', function(room) {
    socket.join(room);
    socket.on('scrollEvent', function(msg){
      socket.in(room).broadcast.emit('scrollEvent', msg);
    });
  });
});

var port = Number(process.env.PORT || 5000);

http.listen(port, function(){
  console.log('listening on ' + port);
});