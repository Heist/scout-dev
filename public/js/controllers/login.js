// login.js
'use strict';

// LOGIN CONTROLLER ===========================================================
angular.module('field_guide_controls')
       .controller('login', ['$scope','$http', '$location', '$stateParams','$rootScope', 'socket', function($scope, $http, $location, $stateParams, $rootScope, socket){
    
    // LOGIN FUNCTIONS ====================================
    // console.log('loaded login controller, user is', $rootScope.user);
    $scope.user = $rootScope.user;
    if($stateParams.acct){
        $scope.acct = $stateParams.acct.replace( /\//gi,"");
        console.log($scope.acct);
    }
    $scope.login = function(user){
        var url = '/auth/login';
        var dataOut =  {email: user.email, password: user.password};

        $http
            .post(url, dataOut)
            .success(function(data){
                console.log('login controller success', data.error);
                $scope.flashmessage = data.error;
                $location.path(data.redirect);
            })
            .error(function(error){
                console.log('login no bueno.', error);
            });
    };

    $scope.register = function(user){
        // console.log(user);
        var url, 
            dataOut,
            acct;

        if($stateParams.acct){
            acct = $stateParams.acct.replace( /\//gi,"");
            console.log('touched account', acct);
            url = '/auth/signup/';
            dataOut = {email: user.email, password: user.password, _account: acct};
        } else {
            console.log('cannot see stateparams.acct')
            url = '/auth/signup/';
            dataOut = {email: user.email, password: user.password};
        }
        
        $http
            .post(url, dataOut)
            .success(function(data){
                // console.log('register controller success', data);
                $rootScope.user = data.user;
                $location.path(data.redirect);
            })
            .error(function(error){
                // console.log('signup no bueno.', error);
        });
    };

    $scope.logout = function(){
        var url = '/auth/logout';

        $http
            .post(url)
            .success(function(data){
                // console.log('Success! Logged out.', data);
                $location.path(data.redirect);
                $rootScope.user = '';
            })
            .error(function(error){
                // console.log('logout no bueno.', error);
            });
    }
}]);
