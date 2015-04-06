// new-test.js
(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('newTest', 
    		['testBuildFunctions','$scope','$http','$stateParams','$state','$location','$rootScope',
    function( testBuildFunctions,  $scope,  $http,  $stateParams,  $state,  $location, $rootScope){
        console.log('loaded new test');
    	// SETUP VARIABLES ==========================
        $scope.test = {};
        $scope.test.created_by_user = $rootScope.user;
        mixpanel.track('Add new test', { 'user' : $rootScope.user });

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
            var test = $scope.test;
            
            if($scope.test.name){
                mixpanel.track('Test name changed', { 'user': $rootScope.user });
            }

            if($scope.test.desc){
                test.desc = $scope.test.desc;
            }

            var url = '/api/test/'+$stateParams._id;
            var data_out = test;
        };

        $scope.addTest = function(){
        	// in here, add the new test once someone's entered all their weird testing data.
        }

        $scope.cancelTest = function(){
       
        }

                // var url = '/api/test/';
                // var data_out = test;
                
                // $http
                //     .post(url, data_out)
                //     .success(function(data){
                        
                //         $scope.tests.push(data);
                //     });

	}]);

})();