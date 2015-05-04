// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('forgot', ['$scope','$http', '$location', '$stateParams','$rootScope', 
        function($scope, $http, $location, $stateParams, $rootScope){

        // Controller Functions ===========================
       $scope.sendToken = function(email){
            var dataOut = {email: email};
            console.log('clicked send pass')
            
            $scope.hideMe = 'hide';

            $http
                .post('/auth/forgot', dataOut)
                .success(function(data, err){
                        // console.log(data, err);
                        $scope.successMsg = data;
                });
        };
    }]);
})();