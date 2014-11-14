'use strict';
// watch.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls')
.controller('watch', 
           ['$scope','$http','$location','$stateParams','$state','$sanitize','socket', 
    function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize,  socket){


$scope.roomList = [];
// SOCKET ROUTES ================================================
    var socket = io('http://127.0.0.1:8080/?test='+$stateParams._id);

    socket.on('announce', function(data){
        console.log('announce', data);
    });

    // socket.on('add_subject', function(data){
    //     console.log('current subject', data);
    //     $scope.roomList.push(data);
    //     // $scope.subject = data.subject;
    //     // $scope.live = true;
    //     // $scope.select(0,0);
    //     $scope.$apply();
    // });

    socket.on('note', function(data){
        console.log('note', data);
        $scope.timeline.push(data.note.msg);
        $scope.$apply();
    });

    socket.on('subject', function(data){
        $scope.roomList.push(data);
        console.log($scope.roomList);
        // $scope.subject = data.subject;
        // $scope.live = true;
        // $scope.select(0,0);
        $scope.$apply();
        // socket.emit('join_subject_test', data);
    });

// ANGULAR ROUTES ===================================================
    $scope.joinRoom = function(room){
        console.log('I want to join this room', $scope.selectedRoom);
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
                socket.emit('send:note', { note: data });
            })
            .error(function(data){
                // console.log('Error: ' + data);
            });

        $scope.message='';
    };

}]);