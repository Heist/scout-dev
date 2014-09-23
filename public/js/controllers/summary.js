'use strict';
// summary.js

// SUMMARY CONTROLLER ===========================================================

angular.module('field_guide_controls').controller('summary', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
	$scope.test = {};
    $scope.timeline = [];

    $http.get('/api/summary/'+$stateParams._id)
        .success(function(data){
          console.log('returned test information', data);

            $scope.test = data.test;
            $scope.tasks = data.tasks;
            $scope.messages = data.messages;

            console.log('test', $scope.test, 'tasks',$scope.tasks,'subjects',$scope.subjects)
            $scope.activate($scope.test)

        })

    // TASK FUNCTIONS =====================================

    $scope.activate = function(task, selectedIndex) {
        // passes the task to the global variable
        $scope.selectedIndex = selectedIndex;

        if(selectedIndex > -1){
            $state.go("summary.task");
        } else {
            $state.go("summary.test");
        }
     
        if(task){
            $scope.task = task;
        }
    };

    $scope.passFail = function(task){
        console.log('touched pass-fail')

        if(task.pass_fail){
            task.pass_fail = false;
        } else if (!task.fail){
            task.pass_fail = true;
        }

        console.log($scope.task);
    }  


    // SAVE MESSAGE functions  ============================

    $scope.msgFilter = function(message){
        // FILTER that filters the message array
        // so messages display when their _task is the same as the current selected task
        // and they only display to their current subject

        if ((message._task == $scope.task._id)) {
                return true;

                // check to see what the current subject is.
                console.log($scope.subject)
            }

        console.log('false', $scope.subject)
        return false;
    };

    $scope.saveFav = function(message){
        console.log('touched fav', message);
        // get the matching message from scope.messages
        // set its fav status

        if(message.fav){
            message.fav = false;
        } else if (!message.fav){
            message.fav = true;
        }
        
        // TODO: when we change screens, save all messages with message.fav = true
    }

    // TAG FUNCTIONS ======================================
    
    // TODO: on click "save"
    // pass the summary to the tag.summary
    // on click 'clear'
    // remove summary from tag


    $scope.selectTag = function (index){
        $scope.selectedTag = $scope.tags[index];
        $scope.selectedTag.index = index;
    }

    $scope.clearTagSummary = function(){
        $scope.selectedTag.summarized = false;
    }

    $scope.saveTagSummary = function(){
        $scope.tags[$scope.selectedTag.index].summary = $scope.selectedTag.summary;
        $scope.tags[$scope.selectedTag.index].summarized = true;
        $scope.selectedTag.summarized = true;

        console.log($scope.tags);
    }

    //  TEST FUNCTIONS ====================================

    $scope.completeSummary = function(){
        // post all the summary changes to the test
        // post summary changes to the tags
        // post fav'd statuses to relevant messages

        var url = '/api/summary/'+ $stateParams.test_id;
        var data_out = {test: $scope.test, tags:$scope.tags, messages:$scope.messages} ;

        console.log(data_out)
        
         $http.put(url, data_out)   
            .success(function(data){
                console.log(data);

                $location.path('/');

                // note: this MUST stay inside the Success
                // To prevent the weird pending bug 
                // caused by a state-change race condition.
            })
            .error(function(data){
                console.log('error', data);
            });        

    }
   
}]);
