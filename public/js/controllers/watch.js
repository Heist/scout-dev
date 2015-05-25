// watch.js
(function() {
    'use strict';
    
    // WATCH CONTROLLER FOR GROUP INTERVIEWS ==================================
        
    angular.module('field_guide_controls')
    .controller('watch', 
               ['$scope','$http','$location','$stateParams','$state','$sanitize',
        function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize){


        // $scope.roomList = [];

    // SOCKET ROUTES ================================================

        // 1.0 -----------
        // var client = io('http://104.236.16.159:8080/');

        // 0.9 -----------
        // // TODO ALL OF THIS NEEDS TO BE AN ENVIRONMENT VARIABLE
        // var socket = io.connect('//104.236.16.159:8080/?test='+$stateParams._id, {
        //         'force new connection': true
        //     });
        
        // socket.on('message',function(data) {
        //     image.src = "data:image/jpg;base64,"+data;
        //     canvas.width = 358;
        //     canvas.height = 358 * image.height / image.width;

        //     context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
        // });

        // socket.on('connect_failed', function(data)
        // {
            
        // });
        // socket.on('connecting', function(data)
        // {
            
        // });
        // socket.on('disconnect', function(data)
        // {
            
        //     image.src = "/layout/assets/avatar-binocs.jpg";
        //     canvas.width = 358;
        //     canvas.height = 358 * image.height / image.width;

        //     context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
        //     socket.socket.disconnect();
        // });
        // socket.on('error', function(reason)
        // {
            
        // });
        // socket.on('reconnect_failed', function(data)
        // {
            
        // });
        // socket.on('reconnect', function(data)
        // {
            
        // });
        // socket.on('reconnecting', function(data)
        // {
            
        // });

        // socket.on('announce', function(data){
            
        // });

        // socket.on('note', function(data){
            
        //     $scope.timeline.push(data.note.msg);
        //     $scope.$apply();
        // });

        // socket.on('subject', function(data){
        //     socket.emit('join_subject_test', data);
        // });

       

    // EMIT SCREENCAPS TO THE SOCKET ====================================
        // var canvas = document.getElementById('channel'),
        //     image = document.getElementById('ia'),
        //     context = canvas.getContext('2d');

        // $scope.connect = {};
        // $scope.connect.text = '71b';

        // $scope.subscription = function(chan){
        //     socket.emit('subscribe', { room: chan });
        //     socket.emit('channel', { room: chan });
        // };

    // ANGULAR ROUTES ===================================================
        // $scope.session = $stateParams._session; 

        // $scope.joinRoom = function(room){
        //     // socket.emit('join_room', $scope.selectedRoom.room);
        //     $scope.live = true;
        // };

    }]);
})();
