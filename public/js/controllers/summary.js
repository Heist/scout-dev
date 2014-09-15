'use strict';
// summary.js

// SUMMARY CONTROLLER ===========================================================

angular.module('field_guide_controls').controller('summary', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
	$scope.flow = {};
    $scope.timeline = [];

    $http.get('/api/summary/'+$stateParams.flow_id)
        .success(function(data){
          console.log(data);

            $scope.flow = data.flow;
            $scope.activate($scope.flow)

            $scope.tags = data.tags;

            console.log('steps', $scope.flow.steps);

        })

    $scope.activate = function(step, selectedIndex) {
        // passes the step to the global variable
        $scope.selectedIndex = selectedIndex;

        if(selectedIndex > -1){
            $state.go("summary.step");
        } else {
            $state.go("summary.flow");
        }
        if(step){
                $scope.step = step;
                // console.log('step', step)
        }
    };

    $scope.completeSummary = function(){
        // post all the summary changes to the flow
        // post summary changes to the tags
        // post fav'd statuses to relevant messages

        var url = '/api/summary/'+ $stateParams.flow_id;
        var data_out = {flow: $scope.flow, tags:$scope.tags, messages:$scope.messages} ;
        console.log(data_out)

        
         $http.put(url, data_out)   
            .success(function(data){
                // console.log('sent a new summary '+ JSON.stringify(data));
                $location.path('/');
                console.log(data);
                // note: this MUST stay inside the Success
                // as that prevents the weird pending bug 
                // which is caused by there being invisibly no data at some point.
            })
            .error(function(data){
                console.log('error', data);
            });        

    }

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

    $scope.passFail = function(step){
        console.log('touched pass-fail')
        if(step.pass_fail){
            step.pass_fail = false;
        } else if (!step.fail){
            step.pass_fail = true;
        }

        console.log($scope.step);
    }  

    // Summarize Tags controller functions

    // TODO: on click "save"
    // pass the summary to the tag.summary
    // on click 'clear'
    // remove summary from tag

    $scope.selectTag = function (index){
        $scope.selectedTag = $scope.tags[index];
        $scope.selectedTag.index = index;
    }

    $scope.clearTagSummary = function(){
        // $scope.tags[].selectedTag.summary = '';
        $scope.selectedTag.summarized = false;
    }

    $scope.saveTagSummary = function(){
        $scope.tags[$scope.selectedTag.index].summary = $scope.selectedTag.summary;
        $scope.tags[$scope.selectedTag.index].summarized = true;
        $scope.selectedTag.summarized = true;
        console.log($scope.tags);
    }

   
}]);
