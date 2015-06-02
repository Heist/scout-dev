// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('reset', ['$scope','$http', '$location', '$stateParams','$rootScope', '$sce', '$timeout',
                    function($scope, $http, $location, $stateParams, $rootScope, $sce, $timeout){

        $scope.newPass = function(pass){
                var dataOut = {password: pass};
                console.log(dataOut);
                $http
                    .post('/auth/reset'+$stateParams.token, dataOut)
                    .success(function(data){
                        // do a login here, perhaps
                        
                        $scope.successMsg = {};
                        console.log(data);
                        if(data === '0'){ 
                            $scope.successMsg.val = 0;
                            var note = $sce.trustAsHtml('That token has already been used. <a href="/forgot">Reset your password?</a>');
                            $scope.successMsg.msg = note;
                            console.log(data);
                            return;
                        } else {
                            $scope.successMsg.val = 1;
                            $scope.successMsg.msg = data;
                            $timeout(function() {  $location.path('/login'); }, 2000, false);
                        }
                    });
            }

        $scope.goToLogin = function(){
            console.log('goToLogin')
            $location.path('/login');
        }

        $scope.goToForgot = function(){
            console.log('goToForgot')
            $location.path('/forgot');
        }
        
    }]);
})();