'use strict';
// watch.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls')
.controller('watch', 
           ['$scope','$http','$location','$stateParams','$state','$sanitize','socket', 
    function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize,  socket){


$scope.roomList = [];

// SOCKET ROUTES ================================================

    // 1.0 -----------
    // var client = io('http://104.131.98.19:8080/');

    // 0.9 -----------
    var socket = io.connect('//104.131.98.19:8080/?test='+$stateParams._id, {
            'force new connection': true});
    
    socket.on('message',function(data) {
      image.src = "data:image/jpg;base64,"+data;
      canvas.width = 358;
      canvas.height = 358 * image.height / image.width;

      context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
    });

    socket.on('connect_failed', function(data)
    {
        console.log('connect_failed');
    });
    socket.on('connecting', function(data)
    {
        console.log('connecting');
    });
    socket.on('disconnect', function(data)
    {
        console.log('disconnect');
        image.src = "/layout/assets/avatar-binocs.jpg";
        canvas.width = 358;
        canvas.height = 358 * image.height / image.width;

        context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
        socket.socket.disconnect();
    });
    socket.on('error', function(reason)
    {
        console.log('error');
    });
    socket.on('reconnect_failed', function(data)
    {
        console.log('reconnect_failed');
    });
    socket.on('reconnect', function(data)
    {
        console.log('reconnect');
    });
    socket.on('reconnecting', function(data)
    {
        console.log('reconnecting');
    });

    socket.on('announce', function(data){
        console.log('announce', data);
    });

    socket.on('note', function(data){
        console.log('note', data);
        $scope.timeline.push(data.note.msg);
        $scope.$apply();
    });

    socket.on('subject', function(data){
        socket.emit('join_subject_test', data);
    });

   

// EMIT SCREENCAPS TO THE SOCKET ====================================
    var canvas = document.getElementById('channel'),
        image = document.getElementById('ia'),
        context = canvas.getContext('2d');

    $scope.connect = {};
    $scope.connect.text = '71b';

    $scope.subscription = function(chan){
        console.log('touched a channel', chan);
        socket.emit('subscribe', { room: chan });
        socket.emit('channel', { room: chan });
    };

// ANGULAR ROUTES ===================================================
    $scope.testName = $stateParams._id; 

    $scope.joinRoom = function(room){
        console.log('I want to join this room', $scope.selectedRoom);
        // socket.emit('join_room', $scope.selectedRoom.room);
        $scope.live = true;
    };


    $scope.postMessage = function(message){
        // here we create a note object
        var note = {};

        note.body = message;
        note.tags = [];
        note.created = new Date();
         
        note._task = $scope.selected._id;
        note._test = $scope.selected._test;
        // note._session = $stateParams._id;
        note._subject = $scope.subject._id;

        $scope.timeline.push(note);
        // console.log('message pushing to', $scope.selected._id);

        // TODO: this will catch things on both sides of the hash. 
        // if message has # with no space, post that to message.tags

        var hashCatch = new RegExp(/\S*#\S+/gi);
        var hashPull = new RegExp(/#/gi);
        var tagIt = message.match(hashCatch);          
        
        if (tagIt){
            for (var i=0; i < tagIt.length; ++i) {
                var msg = tagIt[i].replace(hashPull,'');
                // console.log('tag being pushed', msg)
                note.tags.push(msg);
            }
        }
        
        // console.log('note tags', note.tags);

        var url = '/api/message/';
        var data_out = note;

        $http
            .post(url, data_out)
            .success(function(data){
                // socket.emit('send:note', { note: data });
            })
            .error(function(data){
                // console.log('Error: ' + data);
            });

        $scope.message='';
    };

}]);