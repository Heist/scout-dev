// overview.js
(function() {
    'use strict';

    // OVERVIEW CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('overview', ['loadData', '$scope','$http', '$location', '$stateParams','$rootScope', function(loadData, $scope, $http, $location, $stateParams, $rootScope){
        
        // get all sessions and their tests on first load
        $scope.tests = loadData.data;


        // ONBOARDING =========================================

        $scope.onboardToggle = function(){

            if($scope.onboardSteps  || $scope.onboardSteps === true  ){
                // TODO: setup as http post
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

        // TEST ROUTES ========================================
        $scope.devTest = function(){
            $http.post('/api/dev_tests/')
                .success(function(data){
                    $scope.tests.push(data);
                });
        };

        $scope.newTestModalToggle = function(){
            if($scope.newProject  || $scope.newProject === true  ){
                $scope.newProject = false; 
                return;
            }
            if(!$scope.newProject || $scope.newProject === false ){  
                $scope.newProject = true; 
                return;
            }
        };

        $scope.removeTest = function(test){ 
            // delete a test from the database
                var url = '/api/test/'+test._id,
                index = $scope.tests.indexOf(test);
                $scope.tests.splice(index, 1);
                $http.delete(url);
        };

        $scope.dupeTest = function(test){
            var url = '/api/test/'+test._id;
            var data_out = test;
            
            $http
                .post(url, data_out)
                .success(function(data){
                    $scope.tests.push(data);
                });
        };

        $scope.editTest = function(test){
            $location.path('/edit/test/'+ test._id);
        };

        $scope.watchTest = function(test){
            $location.path('/watch/'+test._id);
        };
         
        $scope.runTest = function(test){
            $location.path('/run/'+test._id);
        };

        $scope.summarizeTest = function(test_id){
            $location.path('/summary/'+ test_id);
        };

        $scope.loadReport = function(test_id){
            $location.path('/report/'+ test_id);
        };

    // TEST OVERLAY =============================



    }]);
})();