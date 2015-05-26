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

       $scope.onboardToggle = function(){
           if($scope.onboardSteps  || $scope.onboardSteps === true  ){
            var duration = new Date();
              if (duration < startOnboard) {
                  duration.setDate(duration.getDate() + 1);
              }

              var diff = duration - startOnboard;

              var msec = diff;
              var mm = Math.floor(msec / 1000 / 60);
              msec -= mm * 1000 * 60;
              
              var intercom = {
                    created_at : new Date(),
                    email      : $rootScope.user.email,
                    duration : mm
                };
                
              Intercom('trackEvent', 'closed-onboarding', intercom );

            $rootScope.user.onboard = 100;
               $scope.onboardSteps = false; 
               return;
           }
           if(!$scope.onboardSteps || $scope.onboardSteps === false ){
              startOnboard = new Date();

              var intercom = {
                    created_at : new Date(),
                    email      : $rootScope.user.email
                };
                
                Intercom('trackEvent', 'opened-onboarding', intercom );

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
                    
                });
        };


	}]);

})();