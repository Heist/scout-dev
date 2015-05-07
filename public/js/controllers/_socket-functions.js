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
        

            $scope.connect = {};
            $scope.connect.text = '71b';

            socket.on('connect_failed', function(data)
            {
                
            });

            socket.on('connecting', function(data)
            {
                
            });
            socket.on('disconnect', function(data)
            {
                
            });

            socket.on('error', function(reason)
            {
                
            });
            socket.on('reconnect_failed', function(data)
            {
                
            });
            socket.on('reconnect', function(data)
            {
                
                // socket.emit('channel', {room : $scope.subject.testroom, test: $stateParams._id});
            });
            socket.on('reconnecting', function(data)
            {
                
            });

            socket.on('announce', function(data){
                
            });

            socket.on('joined_channel', function(data){ 
                

            });

            socket.on('note', function(data){
                
                $scope.timeline.push(data.note.msg);
                $scope.$apply();
            });

            socket.on('subject', function(data){
                socket.emit('join_subject_test', data);
            });

            socket.on('message',function(data) {
                var canvas = document.getElementById('feed');
                var image = document.getElementById('ia');
                var context = canvas.getContext('2d');
                var h = 358 * image.height / image.width;

                image.src = "data:image/jpg;base64,"+data;
                canvas.setAttribute("width", 358);
                canvas.setAttribute("height", h);
                

                context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
                
                // context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
            });
    }]);
})();