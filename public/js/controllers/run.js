'use strict';
// run.js

// RUN CONTROLLER ===========================================================

angular.module('field_guide_controls').controller('run', ['$scope','$http', '$location','$stateParams','$state', function($scope, $http,$location,$stateParams,$state){
    
    // set up controller-wide variables
    $scope.task = {};

    $scope.update = {};
    $scope.update.tests = [];
    $scope.update.tasks = [];

    $scope.timeline = []; // holds all messages currently in test
    
    // // refresh warning to prevent whoops-I-deleted-the-Session
    var leavingPageText = "If you refresh, you will lose this test.";
    window.onbeforeunload = function(){
        return leavingPageText;
    }

    $scope.$on('$destroy', function() {
        window.onbeforeunload = undefined;
    });

    $scope.$on('$locationChangeStart', function(event, next, current) {
        if(!confirm(leavingPageText + "\n\nAre you sure you want to leave this page?")) {
            event.preventDefault();
        }
    });

    $http
        .get('/api/run/'+$stateParams._id)
        .success(function(data){
            $scope.tests = data;
            console.log('how is data built', data);

            // reset variables to clear cache from state changes.
            $scope.task = {};
            var message = {};

        })

        $scope.activate = function(parentIndex, selectedIndex) {
            // console.log('test', parentIndex)
            console.log('task',  selectedIndex)

            if ($scope.parentIndex == parentIndex && $scope.selectedIndex == selectedIndex){
                return
            }

            else{
                $scope.parentIndex = parentIndex;
                $scope.selectedIndex = selectedIndex;
    
                // activate 
                // pushes the identity of a test or task
                // to the update array
                // which is then output to server when things are updated
                // this prevents the session from bulk-updating everything onscreen
                // if it has not in fact been touched.
    
                var test = $scope.tests[parentIndex];
                var task = $scope.tests[parentIndex]._tasks[selectedIndex];
                
                $scope.task = task;

                // TODO: there is a bug in here where steps are not always stored properly
                // this needs to not be a bug!

                console.log('active task', $scope.task.name, $scope.task._id)

                if( selectedIndex == 0){
                    // if this is the first step in a test, log the test start
                    // then log the step start
    
                    if($scope.update.tests.indexOf(test._id) == -1){
                        $scope.update.tests.push(test._id)
                        $scope.subject._tests.push(test._id)

                        var message   = {};
                        message.title = 'Starting test';
                        message.body  = test.name;
        
                        $scope.timeline.push(message);
                    }
    
                    if($scope.update.tasks.indexOf(task._id) == -1){
                        $scope.update.tasks.push(task._id)
                    }
    
                    message = {};
                    
                    message.title = 'Starting task';
                    message.body = task.name;
                    
                    $scope.timeline.push(message);
                }
                else {
    
                    var message   = {};
                    message.body  = task.name;
                    message.title = 'Starting task';
    
                    $scope.timeline.push(message);
    
                    if($scope.update.tasks.indexOf(task._id) == -1){
                        $scope.update.tasks.push(task._id)
                    }
    
                }

            }
        };

        $scope.addSubject = function(textfield){
            console.log('touched addSubject', textfield);

            var url = 'api/subject/';
            var data_out = {name : textfield};

            $http
                .post(url, data_out)
                .success(function(data){
                    $scope.subject = data;
                    $scope.subject.toggle = true;
                    $scope.activate(0,0);
                })
                .error(function(data){
                    // console.log('Error: ' + data);
                })
        }

        $scope.postMessage = function(message){
            // here we create a note object
            var note = {};

            note.body = message;
            note.tags = [];
            note.created = new Date();
             
            note._task = $scope.task._id;
            note._test = $scope.task._test;
            note._session = $stateParams._id;

            note._subject = $scope.subject._id;

            $scope.timeline.push(note);
            console.log('message pushing to', $scope.task._id)

            // console.log('note being pushed', note)
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
            
            // console.log('note', note);

            var url = '/api/message/';
            var data_out = note;

            $http.post(url, data_out)
                .success(function(data){
                    console.log('Message pushed: ', data);
                })
                .error(function(data){
                    // console.log('Error: ' + data);
                })

            $scope.message='';
        }

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
            })

    }
}]);