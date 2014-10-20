// socket_config.js
'use strict';

module.exports = function(io){
    io.total = 0;
    io.on('connection', function(socket){
        var updateCount = ++io.total;
        socket.on('disconnect', function(){
                --io.total;
            });

        console.log('a user connected', io.total);
        var req = socket.request;

        // var ip = forwarded(req, req.headers);
        // debug('client ip %s', ip);

        // keep track of connected clients
        
    });
    
    // io.sockets.on('connection', function(client){

    //     client.on('message', function(err, msg){
    //         var k = Object.keys(io.sockets.manager.roomClients[client.id]);
    //         if (k[1] !== undefined) {
    //             var chan = k[1].substring(1, k[1].length);
    //             client.broadcast.to(chan).emit('message', err);
    //         }
    //     });

    //     // client.on('subscribe', function(data) { 
    //     //     var hash = crypto.createHash('md5').update(data.room).digest('hex').substring(0, 8).toLowerCase();
    //     //     console.log('joining room', hash);
    //     //     var k = Object.keys(io.sockets.manager.roomClients[client.id]);
    //     //     client.join(hash); 
    //     // });

    //     client.on('channel', function(data) { 
    //         console.log('joining room', data.room.toLowerCase());
    //         client.join(data.room); 
    //     });
    // });
};