// summary.js
'use strict';

// SUMMARY CONTROLLER ===========================================================

angular.module('field_guide_controls')
    .controller('summary', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
	$scope.test = {};
    $scope.timeline = [];

    $http.get('/api/summary/'+$stateParams._id)
        .success(function(data){
            console.log('returned test information', data);

            $scope.tags = data.tags;
            $scope.test = data.test;
            $scope.tasks = data.tasks;

            // group messages by users
            $scope.messages = _.groupBy(data.messages, function(z){return z._subject.name;});

            console.log('test', $scope.test, 'tasks',$scope.tasks,'tags', $scope.tags,'messages',$scope.messages);
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
            console.log('task or test', obj._id);
        }
    };

    $scope.passFail = function(task){
        console.log('touched pass-fail');

        if(task.pass_fail){
            task.pass_fail = false;
        } else if (!task.fail){
            task.pass_fail = true;
        }

        console.log($scope.task);
    };


    $scope.show = function (message, tags) {
        return message._tags.indexOf(tags.body) >= 0;
    }

    // SAVE MESSAGE functions  ============================

    $scope.msgFilter = function(message){
        // FILTER that filters the message array
        // so messages display when their _task is the same as the current selected task
        // and they only display to their current subject

        if ((message._id === $scope.task._id)) {
            return true;
        }

        console.log('false', $scope.subject);
        return false;
    };

    $scope.saveFav = function(message){
        console.log('touched fav', message);
        // get the matching message from scope.messages
        // set its fav_task status

        if(message.fav){
            message.fav_task = false;
        } else if (!message.fav){
            message.fav_task = true;
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

        console.log($scope.tags);
    };

    //  TEST FUNCTIONS ====================================

    $scope.completeSummary = function(){
        // post all the summary changes to the test
        // post summary changes to the tags
        // post fav'd statuses to relevant messages

        // TODO: for each task push each of their messages to $scope.messages
        // no good in the new format, messages need to be their own array
        // displayed for both task and tag.

        // extract messages from wherever I've placed them in the main body?
        // this is a terrible way to do this. Rethink.


        var holder = _.pluck($scope.tasks, 'messages');

        var arr = []

        for(var i = 0 ; i < holder.length; i++){
            console.log('i', holder[i])
            var arr1 = _.toArray(holder[i])
            for(var j = 0 ; j < arr1.length; j++){
                console.log('j', arr1[j])
                for(var k = 0; k < arr1[j].length; k++){
                    console.log('k', arr1[j][k])
                    arr.push(arr1[j][k]);
                }
            }
        }

        console.log(holder, arr);


        // var url = '/api/summary/'+ $stateParams._id;
        // var data_out = {test: $scope.test, tags:$scope.tags, tasks:$scope.tasks, messages:$scope.messages} ;

        // console.log('this is our data out', data_out);
        
        // $http.put(url, data_out)   
        //     .success(function(data){
        //         console.log(data);

        //         $location.path('/overview');

        //         // note: this MUST stay inside the Success
        //         // To prevent the weird pending bug 
        //         // caused by a state-change race condition.
        //     })
        //     .error(function(data){
        //         console.log('er;ror', data);
        //     });        

    };
   
}]);
