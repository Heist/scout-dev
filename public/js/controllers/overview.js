// overview.js
(function() {
    'use strict';

    // OVERVIEW CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('overview', ['$scope','$http', '$location', '$stateParams','$rootScope', function($scope, $http, $location, $stateParams, $rootScope){
        
        // get all sessions and their tests on first load
        $http
            .get('/api/test/', {timeout : 5000})
            .success(function(data) {
                $scope.tests = data;
                
                if($rootScope.user.onboard === 2){ 
                    
                }

                if($rootScope.user.onboard === 3 || $rootScope.user.onboard === 4 || $rootScope.user.onboard === 5 ){
                    $location.path('/run/'+$scope.tests[1]._id);
                }

                if($rootScope.user.onboard === 6 && $scope.tests.length > 0){
                    $location.path('/summary/'+$scope.tests[1]._id);
                }

                if($rootScope.user.onboard === 7 && $scope.tests.length > 0){
                    $location.path('/report/'+$scope.tests[1]._id);
                }
            });

        // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection

        // TODO: check the onboard number
        // if the onboard number requires a route change, change the route.
        // check for the name of the appropriate test, as it may no longer exist in the DB
        // or possibly should have permit locks on it.
        // Tests do not have actual permit locks on them now, do they.
        // else just continue as normal.
        // console.log('onboard', $rootScope.user.onboard);

        $scope.changeOnboard = function(num){
            $rootScope.user.onboard = num;

            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = { onboard : $rootScope.user.onboard };

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log($rootScope.user);
                    if($rootScope.user.onboard === 3){
                        $location.path('/run/'+$scope.tests[1]._id);
                    }
                });
        };

        // TEST ROUTES ========================================
        $scope.devTest = function(){
            $http.post('/api/test/dev_tests/')
                .success(function(data){
                    $scope.tests.push(data);
                });
        };

        $scope.newTest = function(){
                var test = {};
                
                if($rootScope.user){
                    test.created_by_user = $rootScope.user;
                    mixpanel.track('Add new test', { 'user' : $rootScope.user });
                } else {
                    console.log('whoops, needs a checkin');
                }

                var url = '/api/test/';
                var data_out = test;
                
                $http
                    .post(url, data_out)
                    .success(function(data){
                        $location.path('/edit/test/'+ data._id);
                        $scope.tests.push(data);
                    });
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
            mixpanel.track('Run test', { 'user': $rootScope.user });
        };

        $scope.summarizeTest = function(test_id){
            $location.path('/summary/'+ test_id);
            mixpanel.track('Summary clicked', {});
        };

        $scope.loadReport = function(test_id){
            $location.path('/report/'+ test_id);
        };

    }]);
})();