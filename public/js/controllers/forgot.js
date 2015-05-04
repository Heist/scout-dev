// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('forgot', ['$scope','$http', '$location', '$stateParams','$rootScope', 
        function($scope, $http, $location, $stateParams, $rootScope){

        // Controller Functions ===========================
            $scope.newPass = function(pass){
                var dataOut = {password: pass};
                console.log('touched newPass');
                $http
                    .post('/auth/forgot'+$stateParams.token, dataOut)
                    .success(function(data){
                        // do a login here, perhaps
                        console.log('forgotten token sent', data);
                        

                        // if(data.length === 0){ 
                        //     $scope.successMsg = "I'm sorry, that reset token is broken.";
                        // }
                        // if(data.length > 0){
                        //     $scope.successMsg = data;
                        // }
                    });
            };

            $scope.goToLogin = function(){
                $location.path('/login');
            };
    }]);
})();