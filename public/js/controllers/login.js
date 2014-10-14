// login.js
'use strict';

// LOGIN CONTROLLER ===========================================================
angular.module('field_guide_controls')
       .controller('login', ['$scope','$http', '$location', '$stateParams','$rootScope', function($scope, $http, $location, $stateParams, $rootScope){
    
    // LOGIN FUNCTIONS ====================================
    // console.log('loaded login controller, user is', $rootScope.user);
    $scope.user = $rootScope.user;

    $scope.login = function(user){
        var url = '/auth/login';
        var dataOut =  {email: user.email, password: user.password};

        $http
            .post(url, dataOut)
            .success(function(data){
                // console.log('login controller success', data);
                $location.path(data.redirect);
            })
            .error(function(error){
                // console.log('login no bueno.', error);
            });
    };


    $scope.register = function(user){
        // console.log(user);
        var url = '/auth/signup/';
        var dataOut = {email: user.email, password: user.password};
        
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
