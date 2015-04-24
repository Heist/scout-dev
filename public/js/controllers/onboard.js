// onboard.js
(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('onboard', 
    		['testBuildFunctions','$scope','$http','$stateParams','$state','$location','$rootScope', '$element',
    function( testBuildFunctions,  $scope,  $http,  $stateParams,  $state,  $location, $rootScope, $element){
    	
        // SETUP VARIABLES ================================
        // $scope.user = $rootScope.user;
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

        $scope.user.onboard = 1;

        // console.log('step', $scope.user.onboard);

       // FUNCTIONS =======================================

       $scope.onboardToggle = function(){
           if($scope.onboardSteps  || $scope.onboardSteps === true  ){
            $rootScope.user.onboard = 100;
               $scope.onboardSteps = false; 
               return;
           }
           if(!$scope.onboardSteps || $scope.onboardSteps === false ){
            $rootScope.user.onboard = 1; 
               $scope.onboardSteps = true; 
               return;
           }
       };

        $scope.changeOnboard = function(num){

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