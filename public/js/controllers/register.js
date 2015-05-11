// register.js
(function() {
    'use strict';

    // REGISTRATION CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('register', ['$scope','$http', '$location', '$stateParams','$rootScope', '$sce',
        function($scope, $http, $location, $stateParams, $rootScope, $sce){
        
        // $scope.user = $rootScope.user;
        
        // if($stateParams.acct){
        //     $scope.acct = $stateParams.acct.replace( /\//gi,"");
        // }
        
        if($rootScope.user){
            $scope.user = $rootScope.user;
        }
        
        if($stateParams.acct){
            $scope.acct = $stateParams.acct.replace( /\//gi,"");


            // TODO: get the invitation represented by that id and pre-populate the e-mail field.
            $http
                .get('/auth/invite'+$stateParams.acct)
                .success(function(data){
                    
                    $scope.user = data;
                    $scope.user.email = data.user_email;
                });
        }

        $scope.register = function(user){
        	var url = '/auth/register';
            var dataOut, invite;

            console.log('clicked register', user);

            if($stateParams.acct){
                invite = $stateParams.acct.replace( /\//gi,"");
                dataOut = {email: user.email, name:user.name, password: user.password, invite: invite};
            } else if (!$stateParams.acct) {
                dataOut = {email: user.email, name:user.name, password:  user.password};
            }
            
            $http
                .post(url, dataOut)
                .success(function(data){
                    console.log(data, data.length);
                    var msg = data;

                    if(data === '1' ){
                        msg = 'That email is already taken. <br />Do you want to <a href="/forgot" class="line">reset your password</a>?';
                        $scope.flashmessage = $sce.trustAsHtml(msg);
                    } else if(data === '2'){
                        $scope.flashmessage = 'Please log out before signing up again.';
                    } else {
                        
                        $rootScope.user = data._id;
                        $location.path(data.redirect);
                    }
                });
        };

    }]);
})();