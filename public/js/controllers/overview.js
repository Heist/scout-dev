// overview.js
(function() {
    'use strict';

    // OVERVIEW CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('overview', ['loadData', '$scope','$http', '$location', '$stateParams','$rootScope', function(loadData, $scope, $http, $location, $stateParams, $rootScope){

        // removes the body scroll overflow hidden
        var bodyScroll = angular.element(document.querySelector('body'));
        bodyScroll.removeClass('overflow-hidden');
        
        
        // get all sessions and their tests on first load
        $scope.tests = loadData.data;
        
        // ONBOARDING =========================================
        if($rootScope.user.onboard === 1){
            $scope.onboardSteps = true;
        }

                var startOnboard;
        $scope.onboardToggle = function(){
            console.log('onboardToggle');
            if(!$scope.onboardSteps || $scope.onboardSteps === false ){
                console.log('false clicked')
                startOnboard = new Date();
                var hh = startOnboard.getHours();
                var m = startOnboard.getMinutes();

                var out = {
                    created_at : hh+':'+m,
                };
                
                Intercom('trackEvent', 'opened-onboarding', out );
                Intercom('update');
                $rootScope.user.onboard = 1; 
                $scope.onboardSteps = true; 
                return;
            }

            if($scope.onboardSteps  || $scope.onboardSteps === true  ){
                console.log('truth clicked')
                
                var viewOnboarding = angular.element(document.querySelector('#viewOnboarding'));
                var lastStep = angular.element(document.querySelector('#lastStep, #modal'));
                var otherSteps = angular.element(document.querySelector('#otherSteps, #modal'));

                // below classes are from animate.css library
                viewOnboarding.addClass('animated slideOutDown').delay(1000).hide(1);
                lastStep.addClass('animated slideOutDown').delay(1000).hide(1);
                otherSteps.addClass('animated slideOutDown').delay(1000).hide(1);
                
                var duration = new Date();

                if (duration < startOnboard) {
                  duration.setDate(duration.getDate() + 1);
                }

                var diff = duration - startOnboard;
                var msec = diff;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;

                var intercom = {
                    duration : mm+"min",
                    closed   : duration
                };

                
                Intercom('trackEvent', 'closed-onboarding', intercom );
                Intercom('update');
                
                $rootScope.user.onboard = 100;
                $scope.onboardSteps = false; 
                Intercom('show');
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