// run.js
(function() {
    'use strict';
    // RUN CONTROLLER ===========================================================

    angular.module('field_guide_controls').controller('socketFunctions', 
    [ '$scope', 'socket', 
    function($scope, socket){
    // SOCKET ROUTES - 0.9 ============================================== 
    // for 1.0 check socket_routes_1.js in /server/
        
    // RECIEVE SCREENCAPS FROM THE SOCKET ===============================
        console.log('sockets should launch');
            var canvas = document.getElementById('feed'),
                image = document.getElementById('ia'),
                context = canvas.getContext('2d');

            $scope.connect = {};
            $scope.connect.text = '71b';

            socket.on('connect_failed', function(data)
            {
                // console.log('connect_failed');
            });

            socket.on('connecting', function(data)
            {
                // console.log('connecting');
            });
            socket.on('disconnect', function(data)
            {
                // console.log('disconnect');
            });

            socket.on('error', function(reason)
            {
                // console.log('error', reason);
            });
            socket.on('reconnect_failed', function(data)
            {
                // console.log('reconnect_failed');
            });
            socket.on('reconnect', function(data)
            {
                // console.log('reconnect');
                // socket.emit('channel', {room : $scope.subject.testroom, test: $stateParams._id});
            });
            socket.on('reconnecting', function(data)
            {
                // console.log('reconnecting');
            });

            socket.on('announce', function(data){
                // console.log('announce', data);
            });

            socket.on('joined_channel', function(data){ 
                console.log('joined_channel', data.body);

            });

            socket.on('note', function(data){
                // console.log('note', data);
                $scope.timeline.push(data.note.msg);
                $scope.$apply();
            });

            socket.on('subject', function(data){
                socket.emit('join_subject_test', data);
            });

            socket.on('message',function(data) {
                console.log('message received', context, canvas);
                image.src = "data:image/jpg;base64,"+data;
                canvas.width = 358;
                canvas.height = 358 * image.height / image.width;

                context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
                // context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
            });
    }]);
})();