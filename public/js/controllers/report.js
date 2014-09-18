'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('report', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){

    $http.get('/api/report/test/'+$stateParams.test_id)
            .success(function(data){
              console.log('the report object', data);
              $scope.report = data
        }) 

    // there is nothing in reports right now.

}]);