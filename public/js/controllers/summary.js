// summary.js
'use strict';

// SUMMARY CONTROLLER ===========================================================

angular.module('field_guide_controls')
    .controller('summary', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
	$scope.test = {};
    $scope.timeline = [];

    $http.get('/api/summary/'+$stateParams._id)
        .success(function(data){
            // console.log('returned test information', data);

            $scope.tags = data.tags;
            $scope.test = data.test;
            $scope.tasks = data.tasks;

            // group messages by users
            $scope.messages = _.groupBy(data.messages, function(z){return z._subject.name;});
            
            console.log('messages', $scope.messages, data.messages);
            
            $scope.activate($scope.test);

        });

    // TASK FUNCTIONS =====================================

    $scope.activate = function(obj, selectedIndex) {
        // passes the task to the global variable
        $scope.selectedIndex = selectedIndex;

        if(selectedIndex > -1){
            $state.go("summary.task");
        } else {
            $state.go("summary.test");
        }
     
        if(obj){
            $scope.selected = obj;
            // console.log('task or test', obj._id);
        }
    };

    $scope.passFail = function(task){
        // console.log('touched pass-fail');

        if(task.pass_fail){
            task.pass_fail = false;
        } else if (!task.fail){
            task.pass_fail = true;
        }

        // console.log($scope.task);
    };

    $scope.show = function (msg_id, selected_obj) {
        // if a message's _id matches any value in the _messages list of .selected, return.
        if(selected_obj._messages.indexOf(msg_id) >= 0){
            return true;
        }
        
    };

    // SAVE MESSAGE functions  ============================

    $scope.msgFilter = function(message){
        // FILTER that filters the message array
        // so messages display when their _task is the same as the current selected task
        // and they only display to their current subject

        if ((message._id === $scope.task._id)) {
            return true;
        }

        // console.log('false', $scope.subject);
        return false;
    };

    $scope.saveFavTask = function(message){
        if(message.fav_task){
            message.fav_task = false;
        } else if (!message.fav_task){
            message.fav_task = true;
        }
    };

    $scope.saveFavTag = function(message){
        if(message.fav_tag){
            message.fav_tag = false;
        } else if (!message.fav_tag){
            message.fav_tag = true;
        }
        
        // TODO: when we change screens, save all messages with message.fav_task = true
    };

    // TAG FUNCTIONS ======================================
    
    // TODO: on click "save"
    // pass the summary to the tag.summary
    // on click 'clear'
    // remove summary from tag


    $scope.selectTag = function (index){
        $scope.selectedTag = $scope.tags[index];
        $scope.selectedTag.index = index;
    };

    $scope.clearTagSummary = function(){
        $scope.selectedTag.summarized = false;
    };

    $scope.saveTagSummary = function(){
        $scope.tags[$scope.selectedTag.index].summary = $scope.selectedTag.summary;
        $scope.tags[$scope.selectedTag.index].summarized = true;
        $scope.selectedTag.summarized = true;

        // console.log($scope.tags);
    };

    //  TEST FUNCTIONS ====================================

    $scope.completeSummary = function(){
        // post all the summary changes to the test
        // post summary changes to the tags
        // post fav'd statuses to relevant messages

        // TODO: for each task push each of their messages to $scope.messages
        // no good in the new format, messages need to be their own array
        // displayed for both task and tag.

        var msg_arr = [];
    
        $scope.messages = _.map($scope.messages, function(val, key){ return val; });
        
        console.log('messages', $scope.messages[0]);

        var url = '/api/summary/'+ $stateParams._id;
        var data_out = {test: $scope.test, tags:$scope.tags, tasks:$scope.tasks, messages:$scope.messages[0]} ;
        
        console.log(data_out);
        
        $http.put(url, data_out)
            .success(function(data){
                console.log(data);

                $location.path('/overview');
            })
            .error(function(data){
                // console.log('er;ror', data);
            });        

    };
   
}]);
