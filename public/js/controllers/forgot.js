// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('forgot', ['$scope','$http', '$location', '$stateParams','$rootScope', '$sce', 
        function($scope, $http, $location, $stateParams, $rootScope, $sce){

        // Controller Functions ===========================
       $scope.sendToken = function(email){
            var dataOut = {email: email};
            console.log('clicked send pass')
            
            $scope.hideMe = 'hide';

            $http
                .post('/auth/forgot', dataOut)
                .success(function(data, err){
                        // console.log(data, err);
                        if(data.indexOf('No user with that e-mail exists') === -1){
                            $scope.successMsg = data;
                            
                        } else {
                            var msg = data + '<br>Please try again';
                            $scope.successMsg = $sce.trustAsHtml(msg);
                            $scope.hideMe = 'show';
                        }
                });
        };
    }]);
})();