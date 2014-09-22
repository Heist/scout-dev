'use strict';
// run.js

// RUN CONTROLLER ===========================================================

angular.module('field_guide_controls').controller('run', ['$scope','$http', '$location','$stateParams','$state', function($scope, $http,$location,$stateParams,$state){
    
    // // set up controller-wide variables
    // $scope.session = {};
    // $scope.tests = {};
    // $scope.step = {};
    // $scope.subject = {};

    // $scope.update = {};
    // $scope.update.tests = [];
    // $scope.update.steps = [];

    $scope.timeline = []; // holds all messages currently in test

    // $scope.testKey = keygen();

    // // refresh warning to prevent whoops-I-deleted-the-Session
    // var leavingPageText = "If you refresh, you will lose this test.";
    // window.onbeforeunload = function(){
    //     return leavingPageText;
    // }

    // $scope.$on('$destroy', function() {
    //     window.onbeforeunload = undefined;
    // });

    // $scope.$on('$locationChangeStart', function(event, next, current) {
    //     if(!confirm(leavingPageText + "\n\nAre you sure you want to leave this page?")) {
    //         event.preventDefault();
    //     }
    // });

    $http
        .get('/api/run/'+$stateParams._id)
        .success(function(data){
            $scope.tests = data;
            console.log('how is data built', data);

            // set the initial timeline contents
            var message = {};

        })

        $scope.activate = function(parentIndex, selectedIndex) {
            console.log('parent', parentIndex)
            console.log('step',  selectedIndex)

            $scope.parentIndex = parentIndex;
            $scope.selectedIndex = selectedIndex;

            // if( selectedIndex == 0){
            //     console.log('match')
            //     // if this is the first step in a test, log the test start
            //     // then log the step start
                
            //     if($scope.update._tests.indexOf($scope.tests[parentIndex]._id) == -1){
            //         console.log('test push')
            //         $scope.update._tests.push($scope.tests[parentIndex]._id)
            //     }

            //     if($scope.update._tasks.indexOf($scope.tests[parentIndex]._tasks[selectedIndex]._id) == -1){
            //         console.log('step push')
            //         $scope.update._tasks.push($scope.tests[parentIndex]._tasks[selectedIndex]._id)
            //     }

            //     var message = {};
            //     message.title='Starting test'
            //     message.body=$scope.tests[parentIndex].name;
            //     $scope.timeline.push(message);

            // }
            // else {
            //     console.log('not a match with first index')

            //     var message = {};
            //     message.body = $scope.tests[parentIndex]._tasks[selectedIndex].name;
            //     message.title = 'Starting step';

            //     $scope.timeline.push(message);

            //     if($scope.update._tasks.indexOf($scope.tests[parentIndex]._tasks[selectedIndex]._id) == -1){
            //         console.log('other step push')
            //         $scope.update._tasks.push($scope.tests[parentIndex]._tasks[selectedIndex]._id)
            //     }

            // }

            // console.log('updateArray', $scope.update)
            // $scope.step.current = $scope.tests[parentIndex]._tasks[selectedIndex];
        };

        $scope.addUser = function(textfield){
            console.log(textfield);

            var url = 'api/subject/';
            var data_out = {name : textfield};

            $http
                .post(url, data_out)
                .success(function(data){
                    $scope.user = data;
                    $scope.user.toggle = true;
                    // $scope.activate(0,0);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
        }

        $scope.postMessage = function(message){
            // here we create a note object
            var note = {};

            note.body = message;
            note.tags = [];
            note.created = new Date();
             
            note._step = $scope.step.current._id;
            note._test = $scope.step.current._test;
            note._session = $stateParams.sessionId;

            note.subject = $scope.subject._id;
            note.key = $scope.testKey;

            $scope.timeline.push(note);

            // TODO: this will catch things on both sides of the hash. 
            // if message has # with no space, post that to message.tags
            var hashCatch = new RegExp(/\S*#\S+/gi);
            var hashPull = new RegExp(/#/gi);
            var tagIt = message.match(hashCatch);          
            
            if (tagIt){
                for (var i=0; i < tagIt.length; ++i) {
                    var msg = tagIt[i].replace(hashPull,'');
                    note.tags.push(msg);
                }
            }
            
            console.log('note', note);

            var url = '/api/message/';
            var data_out = note;

            $http.post(url, data_out)
                .success(function(data){
                    console.log('Message pushed: ', data);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })

            $scope.message='';
        }

    $scope.postTest = function(){

        var url = '/api/run/'+$stateParams._id;
        var data_out = {session: $scope.session, tests: $scope.update.tests, steps: $scope.update.steps, subject: $scope.subject._id};

        console.log('touched end', data_out);

        // collects all the tests and steps and outputs them as a collected object
        // to the session api link
        // where they are parsed 
        // and their individual subject lists are updated.

        $http
            .post(url, data_out)
            .success(function(data){
                console.log('Updated tests', data);
                $location.path('/');
            })
            .error(function(data){
                console.log('Error: ' + data);
            })

    }
}]);