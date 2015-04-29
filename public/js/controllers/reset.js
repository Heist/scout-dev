// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('reset', ['$scope','$http', '$location', '$stateParams','$rootScope', 
                    function($scope, $http, $location, $stateParams, $rootScope){

        $scope.sendToken = function(email){
            var dataOut = {email: email};

            $http
                .post('/auth/forgot', dataOut)
                .success(function(data, err){
                        // console.log(data, err);
                        $scope.successMsg = data;
                });
        };
        
        $scope.goToLogin = function(){
            $location.path('/login');
        };
        
    }]);
})();