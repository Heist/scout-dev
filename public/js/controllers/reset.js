// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('reset', ['$scope','$http', '$location', '$stateParams','$rootScope', 
                    function($scope, $http, $location, $stateParams, $rootScope){
        
        console.log('password reset controller');    

        $scope.sendToken = function(email){
            var url = '/auth/forgot';
            var dataOut = {email: email};

            $http
                .post(url, dataOut)
                .success(function(data){
                    console.log('success', data);
                    $scope.successMsg = data;
                })
                .error();
        };
        
    }]);
})();