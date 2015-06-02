// overview.js
(function() {
    'use strict';

    // OVERVIEW CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('overview', ['loadData', '$scope','$http', '$location', '$stateParams','$rootScope', '$timeout', function(loadData, $scope, $http, $location, $stateParams, $rootScope, $timeout){

        // removes the body scroll overflow hidden
        var bodyScroll = angular.element(document.querySelector('body'));
        bodyScroll.removeClass('overflow-hidden');
        
        
        // get all sessions and their tests on first load
        $scope.tests = loadData.data;
        
        // ONBOARDING =========================================
        if($rootScope.user.onboard === 1){
            $scope.onboardSteps = true;
        }

                
        $scope.onboardToggle = function(){
            console.log('onboardToggle');
            if(!$scope.onboardSteps || $scope.onboardSteps === false ){
                console.log('false clicked')
                var startOnboard = new Date();
                var hh = startOnboard.getHours();
                var m = startOnboard.getMinutes();

                var out = {
                    created_at : hh+':'+m,
                };
                
                Intercom('trackEvent', 'opened-onboarding', out );
                $timeout(function() { Intercom('update'); }, 1000, false);
                $rootScope.user.onboard = 1; 
                $scope.onboardSteps = true; 
                return;
            }

            if($scope.onboardSteps  || $scope.onboardSteps === true  ){
                console.log('truth clicked')
                
                var duration = new Date();
                var hr = duration.getHours();
                var mm = duration.getMinutes();

                var intercom = {
                    created_at : hr+':'+mm,
                };
                
                Intercom('trackEvent', 'closed-onboarding', intercom );
                $timeout(function() { Intercom('update'); }, 1000, false);

                var viewOnboarding = angular.element(document.querySelector('#viewOnboarding'));
                var lastStep = angular.element(document.querySelector('#lastStep, #modal'));
                var otherSteps = angular.element(document.querySelector('#otherSteps, #modal'));

                // below classes are from animate.css library
                viewOnboarding.addClass('animated slideOutDown').delay(1000).hide(1);
                lastStep.addClass('animated slideOutDown').delay(1000).hide(1);
                otherSteps.addClass('animated slideOutDown').delay(1000).hide(1);
                
                $rootScope.user.onboard = 100;
                $scope.onboardSteps = false; 
                
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