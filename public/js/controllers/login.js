// login.js
(function() {
    'use strict';

    // LOGIN CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('login', [ '$scope','$http', '$location', '$stateParams','$rootScope',
        function( $scope, $http, $location, $stateParams, $rootScope){
            // TODO: Reinsert ngCheckStrength

        // LOGIN FUNCTIONS ====================================
        if($rootScope.user){
            $scope.user = $rootScope.user;
        }

        if($stateParams.acct){
            $scope.acct = $stateParams.acct.replace( /\//gi,"");
            $scope.reg_toggle = true;
            mixpanel.track('registration page touch', { 'account': $stateParams.acct });
            
            
            // TODO: get the invitation represented by that id and pre-populate the e-mail field.
            $http
                .get('/auth/invite'+$stateParams.acct)
                .success(function(data){
                    // console.log(data);
                    $scope.user = data;
                    $scope.user.email = data.user_email;
                });
        }
        
        $scope.tracker = function(){
            mixpanel.track('myAccount', { 'account': $stateParams.acct });
        };

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
            $scope.reg_toggle = false;
        };

        $scope.showReg = function(){
            $scope.reg_toggle = true;
        };

        $scope.goToReset = function(){
            $location.path('/reset');
        };

        $scope.register = function(user){
            var url, 
                dataOut,
                invite;
            
            if($stateParams.acct){
                invite = $stateParams.acct.replace( /\//gi,"");
                url = '/auth/signup/';
                dataOut = {email: user.email, name:user.name, password: user.password, invite: invite};
            } else if (!$stateParams.acct) {
                url = '/auth/signup/';
                dataOut = {email: user.email, name:user.name, password:  user.password};
            }
            
            $http
                .post(url, dataOut)
                .success(function(data){

                    $scope.flashmessage = data.error;
                    $rootScope.user = data._id;
                    $location.path(data.redirect);

                    mixpanel.track('registered new user', { 'name': data.email });

                });
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