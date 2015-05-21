// new-test.js
(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('newTest', 
    		['testBuildFunctions','$scope','$http','$stateParams','$state','$location','$rootScope',
    function( testBuildFunctions,  $scope,  $http,  $stateParams,  $state,  $location, $rootScope){
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
            
            var intercom = {
                event_name : 'created-project',
                created_at : new Date(),
                email      : $rootScope.user.email
            } ;

            $http
                .post('/api/test/', test)
                .success(function(data){
                    Intercom('trackEvent', intercom );

                    $scope.$parent.tests.push(data);
                    $scope.$parent.newTestModalToggle();
                    $location.path('/edit/test/'+ data._id);
                });
        }

	}]);

})();