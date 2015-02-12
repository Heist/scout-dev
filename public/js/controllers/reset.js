// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('reset', ['$scope','$http', '$location', '$stateParams','$rootScope', 
                    function($scope, $http, $location, $stateParams, $rootScope){

        $scope.sendToken = function(email){
            var url = '/auth/forgot';
            var dataOut = {email: email};

            $http
                .post(url, dataOut)
                .success(function(data){
                    $scope.successMsg = data;
                });
        };
        
        $scope.goToLogin = function(){
            $location.path('/login');
        };
        
    }]);
})();