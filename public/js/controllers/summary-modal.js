// summary-modal.js
(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('summaryModal', 
    		['testBuildFunctions','$scope','$http','$stateParams','$state','$location','$rootScope',
    function( testBuildFunctions,  $scope,  $http,  $stateParams,  $state,  $location, $rootScope){
        console.log('loaded new test');
    	// SETUP VARIABLES ==========================
        $scope.test = {};

        $scope.test.created_by_user = $rootScope.user;

    	// TEST UPDATE ==============================
    	$scope.selectPrototype = function(kind){
            $scope.test.kind = kind;
            mixpanel.track('Type of Test', {'test type' : kind });
        };

        $scope.selectPlatform = function(kind){
            $scope.test.platform = kind;
        };

        $scope.updateTest = function(){
            // reminder: this pushes an update to an already-created test
        };

        $scope.addTest = function(test){
        	console.log('new test', test);

            if($scope.test.name){
                mixpanel.track('Test name changed', { 'user': $rootScope.user });
            }

            $http
                .post('/api/test/', test)
                .success(function(data){
                    $scope.$parent.tests.push(data);
                    $scope.$parent.newTestModalToggle();
                    $location.path('/edit/test/'+ data._id);
                });
        }

	}]);

})();