// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('forgot', ['$scope','$http', '$location', '$stateParams','$rootScope', 
                    function($scope, $http, $location, $stateParams, $rootScope){
        console.log('password reset controller');    

        var url = '/reset'+$stateParams.token;

        console.log(url);
        $http
            .get(url)
            .success(function(data){
            });

        $scope.resetPass = function(pass){
            var dataOut = {password: pass};

            $http
                .post(url, dataOut)
                .success(function(data){
                    // do a login here, perhaps
                    
                    console.log('reset', data);

                });
        };
        
    }]);
})();