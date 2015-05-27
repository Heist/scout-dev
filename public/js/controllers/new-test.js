// new-test.js
(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('newTest', 
    		['testBuildFunctions','$scope','$http','$stateParams','$state','$location','$rootScope',
    function( testBuildFunctions,  $scope,  $http,  $stateParams,  $state,  $location, $rootScope){

        // removes the body scroll overflow hidden
        var bodyScroll = angular.element(document.querySelector('body'));
        bodyScroll.removeClass('overflow-hidden');

        
    	// SETUP VARIABLES ==========================
        $scope.test = {};

        $scope.test.created_by_user = $rootScope.user;

    	// TEST UPDATE ==============================
    	$scope.selectPrototype = function(kind){
            $scope.test.kind = kind;

        };

        $scope.selectPlatform = function(kind){
            $scope.test.platform = kind;
        };

        $scope.updateTest = function(){
            // reminder: this pushes an update to an already-created test
        };

        $scope.addTest = function(test){
            var date = new Date();
            var hh = date.getHours();
            var mm = date.getMinutes();
            var out = hh.concat(':'+mm);
            
            var intercom = {
                created_at : new Date(),
                email      : $rootScope.user.email
            };

            $http
                .post('/api/test/', test)
                .success(function(data){
                    Intercom('trackEvent', 'created-project', intercom );

                    $scope.$parent.tests.push(data);
                    $scope.$parent.newTestModalToggle();
                    $location.path('/edit/test/'+ data._id);
                });
        }

	}]);

})();