// register.js
(function() {
    'use strict';

    // REGISTRATION CONTROLLER ===========================================================
    angular.module('field_guide_controls')
           .controller('register', ['$scope','$http', '$location', '$stateParams','$rootScope', 'socket', function($scope, $http, $location, $stateParams, $rootScope, socket){
        
        $scope.user = $rootScope.user;
        
        if($stateParams.acct){
            $scope.acct = $stateParams.acct.replace( /\//gi,"");
            console.log($scope.acct);
        }

    }]);
})();