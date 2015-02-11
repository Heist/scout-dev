// login.js
(function() {
    'use strict';

    // LOGIN CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('login', ['$scope','$http', '$location', '$stateParams','$rootScope',
        function($scope, $http, $location, $stateParams, $rootScope){

        // LOGIN FUNCTIONS ====================================
        
        if($rootScope.user){
            $scope.user = $rootScope.user;
        }
        // // console.log('$scope.login $rootScope.user', $rootScope.user);

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
                    // console.log('login controller success', data);
                    $scope.flashmessage = data.error;
                    $location.path('/');
                })
                .error(function(error){
                    // // console.log('login no bueno.', error);
                });
        };

        $scope.showReg = function(){
            $scope.reg_toggle = true;
            // console.log('touched register', $scope.reg_toggle);

        };

        $scope.goToReset = function(){
            $location.path('/reset');
        };

        $scope.showLogin = function(){
            // // console.log('touched login', $scope.reg_toggle);
            $scope.reg_toggle = false;
        };

        $scope.register = function(user){
            // console.log('register this user', user);
            var url, 
                dataOut,
                invite;
            
            if($stateParams.acct){
                invite = $stateParams.acct.replace( /\//gi,"");
                // // console.log('touched account', acct);
                url = '/auth/signup/';
                dataOut = {email: user.email, name:user.name, password: user.password, invite: invite};
            } else if (!$stateParams.acct) {
                // // console.log('this signup does not include an account (stateparams.acct)');
                url = '/auth/signup/';
                dataOut = {email: user.email, name:user.name, password:  user.password};
            }
            
            $http
                .post(url, dataOut)
                .success(function(data){
                    $scope.flashmessage = data.error;
                    // // console.log('register controller success passed back this', data);
                    
                    $rootScope.user = data._id;
                    $location.path(data.redirect);

                    mixpanel.track('registered new user', { 'name': data.email });

                })
                .error(function(error){
                    // // console.log('signup no bueno.', error);
            });
        };

        $scope.logout = function(){
            var url = '/auth/logout';

            $http
                .post(url)
                .success(function(data){
                    // // console.log('Success! Logged out.', data);
                    $location.path(data.redirect);
                    $rootScope.user = '';
                })
                .error(function(error){
                    // // console.log('logout no bueno.', error);
            });
        };
    }]);
})();