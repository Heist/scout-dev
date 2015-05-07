// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('reset', ['$scope','$http', '$location', '$stateParams','$rootScope', 
                    function($scope, $http, $location, $stateParams, $rootScope){

        $scope.newPass = function(pass){
                var dataOut = {password: pass};
                
                $http
                    .post('/auth/reset'+$stateParams.token, dataOut)
                    .success(function(data){
                        // do a login here, perhaps
                        
                        $scope.successMsg = {};

                        if(data === '0'){ 
                            $scope.successMsg.val = 0;
                            $scope.successMsg.msg = 'That token has already been used.';

                        } else {
                            $scope.successMsg.val = 1;
                            $scope.successMsg.msg = data;
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