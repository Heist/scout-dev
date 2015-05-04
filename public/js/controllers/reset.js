// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('reset', ['$scope','$http', '$location', '$stateParams','$rootScope', 
                    function($scope, $http, $location, $stateParams, $rootScope){

        $scope.newPass = function(pass){
                var dataOut = {password: pass};
                console.log('touched newPass', pass);
                $http
                    .post('/auth/reset'+$stateParams.token, dataOut)
                    .success(function(data){
                        // do a login here, perhaps
                        console.log('reset', data);
                        if(data.length === 0){ 
                            $scope.successMsg = "I'm sorry, that reset token is broken.";
                        }
                        if(data.length > 0){
                            $scope.successMsg = data;
                        }
                    });
            }
        
    }]);
})();