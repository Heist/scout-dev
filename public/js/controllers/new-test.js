// new-test.js
(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('newTest', 
    ['loadData', 'testBuildFunctions', '$scope','$compile','$http','$stateParams','$state','$location','$window','$rootScope','$anchorScroll',
    function(loadData, testBuildFunctions, $scope, $compile,  $http,  $stateParams,  $state,  $location,  $window,  $rootScope,  $anchorScroll){
        
    	// SETUP VARIABLES ==========================
        $scope.test = {};

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
                // var test = {};
                
                // if($rootScope.user){
                //     console.log($rootScope.user);
                //     test.created_by_user = $rootScope.user;
                //     mixpanel.track('Add new test', { 'user' : $rootScope.user });
                // } else {
                //     console.log('whoops, needs a checkin');
                // }

                // var url = '/api/test/';
                // var data_out = test;
                
                // $http
                //     .post(url, data_out)
                //     .success(function(data){
                        
                //         $scope.tests.push(data);
                //     });

	}]);

})();