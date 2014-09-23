'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('report', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){

    $http.get('/api/report/'+$stateParams.test_id)
            .success(function(data){
              console.log('the report object', data);
              $scope.report = data;
              $scope.tasks = data.tasks;
              $scope.test = data.test;

             console.log('tasks', data.tasks, 'test', $scope.test)
        }) 

    $scope.select = function(obj){
        console.log('touched object', obj)
        $scope.selected = obj;
    }

    // there is nothing in reports right now.

}]);