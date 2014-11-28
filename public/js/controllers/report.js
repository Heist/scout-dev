'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('report', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
// https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

    $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/report/'+$stateParams.test_id;
    
    $http.get('/api/report/'+$stateParams.test_id)
            .success(function(data){
                console.log('the report object', data);

                // $scope.report = data;
                $scope.tasks = data.tasks;
                $scope.test = data.test;
                $scope.tags = data.tags;
                $scope.messages = data.messages;

                $scope.leftNavList = [];

                _.each(data.test, function(test){
                    $scope.leftNavList.push(test);
                });
                _.each(data.tasks, function(task){
                    $scope.leftNavList.push(task);
                });
                _.each(data.tags, function(tag){
                    $scope.leftNavList.push(tag);
                });

                console.log($scope.leftNavList);

                // console.log('tasks', data.tasks, 'test', $scope.test, 'tags', $scope.tags  );
                console.log($scope.reportLink);
                $scope.select($scope.leftNavList[0]);

            }); 

        // mixpanel.track('Report Loaded', {});

    $scope.summarize = function(){
        $location.path('/summary/'+ $stateParams.test_id);
    };

    $scope.select = function(obj){
        console.log('selected object', obj);
        $scope.selected = obj;
    };

    $scope.showTask = function(msg, obj){
        if((obj._messages.indexOf(msg._id) >= 0) && (msg.fav_task === true)){
            // console.log('task shown');
            return true;
        }
    };

}]);