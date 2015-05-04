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
                    // console.log(data);
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
            $scope.reg_toggle = false;
        };

        $scope.showReg = function(){
            $scope.reg_toggle = true;
        };

        $scope.register = function(user){
            var dataOut, invite;
            
            console.log('clicked register', user)

            if($stateParams.acct){
                invite = $stateParams.acct.replace( /\//gi,"");
                dataOut = {email: user.email, name:user.name, password: user.password, invite: invite};
            } else if (!$stateParams.acct) {
                dataOut = {email: user.email, name:user.name, password:  user.password};
            }
            
            $http
                .post('/auth/signup/', dataOut)
                .success(function(data){
                    console.log(data, data.length);
                    var msg = data;

                    if(data === '1' ){
                        msg = 'That email is already taken. <br /><a href="/forgot">Would you like a password reminder?</a>';
                        $scope.flashmessage = $sce.trustAsHtml(msg);
                    } else if(data === '2'){
                        $scope.flashmessage = 'Please log out before signing up again.';
                    } else {
                        $rootScope.user = data._id;
                        $location.path(data.redirect);
                    }
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