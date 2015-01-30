// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('forgot', ['$scope','$http', '$location', '$stateParams','$rootScope', function($scope, $http, $location, $stateParams, $rootScope){
        console.log('password reset controller');    

        var url = '/reset/'+$stateParams.token;
        $http
            .get(url)
            .success(function(data){
                console.log(data);
            });
        
        
    }]);
})();