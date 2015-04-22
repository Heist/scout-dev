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

        console.log('step', $scope.user.onboard);

        var slideInUp = 'animated slideInUp';
        var slideOutDown = 'animated slideOutDown';
        var slideOutLeft = 'animated slideOutLeft';
        var slideInRight = 'animated slideInRight';
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        $scope.trueFalse = false;
        var s1 = $element.find('.step-1');


        s1.removeClass('hide');
        
        s1.addClass('show');


       // FUNCTIONS =======================================

        $scope.changeOnboard = function(num){
            console.log('change on board num', num);
            $scope.user.onboard = num;
            
            $rootScope.user.onboard = num;

            // if (num === 2) { this.addClass('YOUR CLASS') } // look up how to add class to item in angular
            // alternately, ng-class? prooooobably not
          if( num === 2 ){
            var s2 = $element.find('.step-2');
            s2.addClass(slideInRight);
          }

            // $('.modal').addClass(animationUpIn).one(animationEnd, function(){
            //   $('.step-1').css('display', 'block').addClass(animationUpIn);
            // });

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