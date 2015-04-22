// onboard.js
(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('onboard', 
    		['testBuildFunctions','$scope','$http','$stateParams','$state','$location','$rootScope',
    function( testBuildFunctions,  $scope,  $http,  $stateParams,  $state,  $location, $rootScope){
    	
        // SETUP VARIABLES ================================
        // $scope.user = $rootScope.user;
        $scope.user.onboard = 1;

        console.log('onboard js', $scope.user.onboard);
       // if($rootScope.user.onboard === 2){}

       // if($rootScope.user.onboard === 3 || $rootScope.user.onboard === 4 || $rootScope.user.onboard === 5 ){
       //     $location.path('/run/'+$scope.tests[1]._id);
       // }

       // if($rootScope.user.onboard === 6 && $scope.tests.length > 0){
       //     $location.path('/summary/'+$scope.tests[1]._id);
       // }

       // if($rootScope.user.onboard === 7 && $scope.tests.length > 0){
       //     $location.path('/report/'+$scope.tests[1]._id);
       // }

       // FUNCTIONS =======================================

        $scope.changeOnboard = function(num){
            console.log('change on board num', num);
            $scope.user.onboard = num;
            
            $rootScope.user.onboard = num;

            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = {onboard : $scope.user.onboard};

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log($rootScope.user);
                });
        };


	}]);

})();