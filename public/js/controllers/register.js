// register.js
'use strict';

// REGISTRATION CONTROLLER ===========================================================
angular.module('field_guide_controls')
       .controller('register', ['$scope','$http', '$location', '$stateParams','$rootScope', 'socket', function($scope, $http, $location, $stateParams, $rootScope, socket){
    
    $scope.user = $rootScope.user;
    
    if($stateParams.acct){
        $scope.acct = $stateParams.acct.replace( /\//gi,"");
        console.log($scope.acct);
    }

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
            console.log('cannot see stateparams.acct');
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

}]);
