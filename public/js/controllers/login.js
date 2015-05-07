// login.js
(function() {
    'use strict';

    // LOGIN CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('login', [ '$scope','$http', '$location', '$stateParams','$rootScope', '$sce',
        function( $scope, $http, $location, $stateParams, $rootScope, $sce){
            // TODO: Reinsert ngCheckStrength

        // LOGIN FUNCTIONS ====================================
        if($rootScope.user){
            $scope.user = $rootScope.user;
        }

        if($stateParams.acct){
            $scope.acct = $stateParams.acct.replace( /\//gi,"");
            $scope.reg_toggle = true;

            
            
            // TODO: get the invitation represented by that id and pre-populate the e-mail field.
            $http
                .get('/auth/invite'+$stateParams.acct)
                .success(function(data){
                    
                    $scope.user = data;
                    $scope.user.email = data.user_email;
                });
        }

        $scope.login = function(user){
            var url = '/auth/login';
            var dataOut =  {email: user.email, password: user.password};

            $http
                .post(url, dataOut)
                .success(function(data){
                    
                    $scope.flashmessage = data.error;
                    $location.path('/');
                });
        };

        $scope.showLogin = function(){
            $scope.flashmessage = '';
            $scope.reg_toggle = false;
        };

        $scope.logout = function(){
            var url = '/auth/logout';

            $http
                .post(url)
                .success(function(data){
                    $location.path(data.redirect);
                    $rootScope.user = '';
                });
        };
    }]);
})();