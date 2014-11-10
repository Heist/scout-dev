'use strict';
// remote.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('remote', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', 'socket', function($scope, $http, $location,$stateParams,$state, $sanitize, socket){

    $scope.messages = [];

    var socket = io.connect('http://127.0.0.1:8080/');
    // pure chatroom model, do what one likes with it.

    // Socket listeners
    // ================

    socket.on('hello', function(data){
        console.log('hello received', data);
    });

    socket.on('init', function (data) {
        $scope.name = data.name;
        $scope.users = data.users;
        console.log('init received', data);
    });

    socket.on('send:message', function (message) {
        $scope.messages.push(message);
    });

    socket.on('change:name', function (data) {
        changeName(data.oldName, data.newName);
    });

    socket.on('user:join', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has joined.'
        });
        $scope.users.push(data.name);
    });

    // add a message to the conversation when a user disconnects or leaves the room
    socket.on('user:left', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has left.'
        });
        var i, user;
        for (i = 0; i < $scope.users.length; i++) {
            user = $scope.users[i];
            if (user === data.name) {
                $scope.users.splice(i, 1);
                break;
            }
        }
    });

    // Private helpers
    // ===============

    var changeName = function (oldName, newName) {
    // rename user in list of users
        var i;
        for (i = 0; i < $scope.users.length; i++) {
            if ($scope.users[i] === oldName) {
                $scope.users[i] = newName;
            }
        }

        $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + oldName + ' is now known as ' + newName + '.'
            });
    };

    // Methods published to the scope
    // ==============================

    $scope.registerGuest = function (name) {
        console.log('registered', name);
        socket.emit('change:name', {
            name: name
        }, function (result) {
            if (!result) {
                console.log('There was an error changing your name');
            } else {

                changeName(name, $scope.newName);

                $scope.observer.name = $scope.newName;
                $scope.newName = '';
            }
        });
    };

    $scope.sendMessage = function () {
        socket.emit('send:message', {
            message: $scope.message
        });

    // add the message to our model locally
        $scope.messages.push({
            user: $scope.name,
            text: $scope.message
        });

    // clear message box
        $scope.message = '';
    };

    // ==============================================================
    // Methods from Run.js 
    // ==============================================================

    // set up controller-wide variables
    $scope.update = {};
    $scope.update.tests = [];
    $scope.update.tasks = [];

    $scope.timeline = []; // holds all messages currently in test
    $scope.glued = true;

    $http
        .get('/api/run/'+$stateParams._id)
        .success(function(data){
            $scope.tests = data;
            // console.log('how is data built', data);

            // reset variables to clear cache from state changes.
            $scope.task = {};
            var message = {};

        });


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

            $http.post(url, data_out)
                .success(function(data){
                    // console.log('Message pushed: ', data);
                })
                .error(function(data){
                    // console.log('Error: ' + data);
                })

            $scope.message='';
        }
}]);