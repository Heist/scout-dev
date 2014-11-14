'use strict';
// run.js

// RUN CONTROLLER ===========================================================

angular.module('field_guide_controls').controller('run', 
['$scope','$http', '$location','$stateParams','$state','socket', '$rootScope', 
function($scope,  $http ,  $location , $stateParams , $state , socket ,  $rootScope){
    
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
            // Subject has been created, now open a room with that subject_id

        });
    
// SOCKET ROUTES ================================================
    var socket = io('http://127.0.0.1:8080/?test='+$stateParams._id);

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

    // socket.on('current_subject', function(data){
    //     console.log('current subject', data);
    //     $scope.subject = data.subject;
    //     $scope.live = true;
    //     $scope.select(0,0);
    //     $scope.$apply();
    // });

// ANGULAR ROUTES ===================================================
    $scope.select = function(testIndex, taskIndex) {
        // console.log('task',  $scope.tests[testIndex]._tasks[taskIndex]);

        var test = $scope.tests[testIndex];

        $scope.selected = test._tasks[taskIndex];

        // select
        // pushes the identity of a test or task
        // to the update array
        // which is then output to server when things are updated
        // this prevents the session from bulk-updating everything onscreen
        // if it has not in fact been touched.

        if(taskIndex === 0){
        
            var m   = {};
            m.title = 'Starting test';
            m.body  = test.name;

            $scope.timeline.push(m);

            if($scope.update.tests.indexOf(test._id) === -1){
                $scope.update.tests.push(test._id);
                $scope.subject._tests.push(test._id);
            }
        }

        var em   = {};
        em.title = 'Starting task';
        em.body  = test._tasks[taskIndex].name;

        $scope.timeline.push(em);

        if($scope.update.tasks.indexOf(test._tasks[taskIndex]._id) === -1){
            $scope.update.tasks.push(test._tasks[taskIndex]._id);
        }
    };


    $scope.addSubject = function(textfield){
        // console.log('touched addSubject', textfield);

        var url = 'api/subject/';
        var data_out = {name : textfield};

        $http
            .post(url, data_out)
            .success(function(subject){
                // console.log(subject);
                $scope.subject = subject;
                $scope.live = true;
                $scope.select(0,0);
                // console.log('selected', $scope.selected);
                socket.emit('send:subject_added', {subject: subject._id});
            })
            .error(function(data){
                // console.log('Error: ' + data);
        });
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

    $scope.postTest = function(){

        var url = '/api/run/'+$stateParams._id;
        var data_out = {session: $scope.session, tests: $scope.update.tests, tasks: $scope.update.tasks, subject: $scope.subject._id};

        // console.log('touched end', data_out);

        // collects all the tests and steps and outputs them as a collected object
        // to the session api link
        // where they are parsed 
        // and their individual subject lists are updated.

        $http
            .post(url, data_out)
            .success(function(data){
                // console.log('Updated tests', data);
                $location.path('/overview');
            })
            .error(function(data){
                // console.log('Error: ' + data);
            });

    }
}]);