'use strict';

// runController.js

angular.module('scoutApp.controllers').controller('run', ['$scope','$http', '$stateParams','$state', function($scope, $http,$stateParams,$state){
    // set up controller-wide variables
    $scope.session = {};
    $scope.flows = {};
    $scope.step = {};
    $scope.user = {};

    $scope.timeline = []; // holds all messages currently in flow

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


    // this has to change to get the new session created on the run() command from the main controller
    $http.get('/api/'+$stateParams.sessionId)
        .success(function(data){
            $scope.session = data;
            $scope.flows = $scope.session.flows;
            

            // set the initial timeline contents
            var message = {};

            message.body = $scope.flows[0].title;
            message.title = 'Starting flow';
            $scope.timeline.push(message);

            // set the initial reporting step
            $scope.step.current = $scope.flows[0].steps[0]._id;
        })

        // select the initial 'activated' values
        $scope.selectedIndex = 0;
        $scope.parentIndex = 0;

        $scope.addUser = function(textfield){
            $scope.user.name = textfield;
            $scope.user.toggle = true;
            
            $scope.$apply

            // $scope.session.user = textfield;
            var wrapper = { 'user': textfield };

            var url = '/api/'+ $scope.session._id;
            var dataOut = wrapper;

            
            $http.put(url, dataOut)
                .success(function(data){
                    console.log('Step pushed: ', data);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })

        }

        $scope.activate = function (index, parentIndex, step) {
            var stepType = 'Starting flow';
            if (parentIndex == $scope.parentIndex){
                stepType = 'Starting step';
            }

            $scope.selectedIndex = index;
            $scope.parentIndex = parentIndex;

            $scope.step.current = step._id;
            
            var message = {};

            message.body = step.title;
            message.title = stepType;

            $scope.timeline.push(message);


        // this is going to be a find-join in mongoose where we find all TESTS by SESSION_ID 
        // then return that information to the summarize/report function.

        };

        $scope.putMessage = function(message){
            // here we create a note object because message was too confusing.
             var note = {};
             note.body = message;
             note.tags = [];
             note.created = new Date();

             $scope.timeline.push(note);


            var connect = $scope.flows[$scope.parentIndex].steps[$scope.selectedIndex]

            // if message has # with no space, post that to message.tags
            var hashCatch = new RegExp(/\S*#\S+/gi); 
            var tagIt = message.match(hashCatch);
            
            if (tagIt){
                
                for (var i=0; i < tagIt.length; ++i) {
                    note.tags.push(tagIt[i]);
                }                
            }

            connect.messages.push(note);
            

            // now we put that step's update into its session storage in the db

            var url = '/api/'+$stateParams.sessionId+'/test/'+$stateParams.testId;

            // mongoose does not permid _id queries on grandchildren, only parent.child.id(_id)
            var dataOut = $scope.flows[$scope.parentIndex];


            $http.put(url, dataOut)
                .success(function(data){
                    console.log('Step pushed: ', data);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })


            $scope.message='';
        }
}]);