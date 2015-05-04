// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('forgot', ['$scope','$http', '$location', '$stateParams','$rootScope', 
        function($scope, $http, $location, $stateParams, $rootScope){

        // Controller Functions ===========================
            $scope.getResetToken = function(email){
                var dataOut = {email: email};

                $http
                    .post('/auth/forgot', dataOut)
                    .success(function(data){
                        // do a login here, perhaps
                        console.log('Requested new password token token sent', data);


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