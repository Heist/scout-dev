'use strict';
// watch.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls')
.controller('watch', 
           ['$scope','$http','$location','$stateParams','$state','$sanitize','socket', 
    function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize,  socket){


$scope.roomList = [];

// SOCKET ROUTES ================================================
    
    var client = io('http://104.236.16.159:8080/');

    // socket.emit('get_room_list', { test: $stateParams._id });

    // socket.on('announce', function(data){
    //     console.log('announce', data);
    // });

    // // socket.on('add_subject', function(data){    
    // //     // $scope.subject = data.subject;
    // //     // $scope.live = true
    // //     // $scope.select(0,0);
    // //     $scope.$apply();
    // // });

    // socket.on('note', function(data){
    //     console.log('note', data);
    //     $scope.timeline.push(data.note.msg);
    //     $scope.$apply();
    // });

    // socket.on('room_list', function(data){
    //     console.log('room_list', data);
    //     $scope.roomList = data.rooms;

    //     console.log('current roomList on channel load', $scope.roomList);
    //     $scope.$apply();
    // });

    // socket.on('room_list_update', function(data){
    //     console.log('room_list_update', data);

    //     // this receives the entire list of active rooms back from the server.
    //     $scope.roomList = data.rooms;
    //     console.log('roomList after push', $scope.roomList);
    //     $scope.$apply();
    // });

// EMIT SCREENCAPS TO THE SOCKET ====================================
    var canvas = document.getElementById('channel'),
        image = document.getElementById('ia'),
        context = canvas.getContext('2d');

    // socket.on('message',function(data) {
    //     // console.log('message landed', data);

    //     image.src = "data:image/jpg;base64,"+data;
    //     canvas.width = 358;
    //     canvas.height = 358 * image.height / image.width;
    //     context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
    // });

    $scope.connect = {};
    $scope.connect.text = '71b';

    $scope.subscription = function(chan){
        console.log('touched a channel', chan);
        socket.emit('subscribe', chan);
        socket.emit('channel', { room: chan });
    }

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