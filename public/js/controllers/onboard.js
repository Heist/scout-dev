// onboard.js
// Onboarding controller for modal partial
(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('onboard', 
    		['testBuildFunctions','$scope','$http','$stateParams','$state','$location','$rootScope', '$element',
    function( testBuildFunctions,  $scope,  $http,  $stateParams,  $state,  $location, $rootScope, $element){
    	
       // removes the body scroll overflow hidden
       var bodyScroll = angular.element(document.querySelector('body'));
       bodyScroll.removeClass('overflow-hidden');

        // SETUP VARIABLES ================================

        $scope.user.onboard = 1;
        var startOnboard = '';
        

       // FUNCTIONS =======================================

       // $scope.onboardToggle = function(){
       //    if(!$scope.onboardSteps || $scope.onboardSteps === false ){
       //        $rootScope.user.onboard = 1;
       //        $scope.onboardSteps = true; 
       //        return;
       //     }
       //     if($scope.onboardSteps  || $scope.onboardSteps === true  ){
       //        $rootScope.user.onboard = 100;
       //        $scope.onboardSteps = false; 
       //        return;
       //     }
       // };

        $scope.changeOnboard = function(num){

            $scope.user.onboard = num;
            $rootScope.user.onboard = num;


            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = {onboard : $scope.user.onboard};

            $http
                .put(url, dataOut)
                .success(function(data){
                    
                });
        };


	}]);

})();