// register.js
(function() {
    'use strict';

    // REGISTRATION CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('register', ['$scope','$http', '$location', '$stateParams','$rootScope', '$sce',
        function($scope, $http, $location, $stateParams, $rootScope, $sce){
        
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

        // used to show/hide the registration form and loading spinner ==================
        $scope.results = false;

        $scope.register = function(user){
        	var url = '/auth/signup';
            var dataOut, invite;

            if($stateParams.acct){
                invite = $stateParams.acct.replace( /\//gi,"");
                dataOut = {email: user.email, name:user.name, password: user.password, invite: invite};
            } else if (!$stateParams.acct) {
                dataOut = {email: user.email, name:user.name, password:  user.password};
            }
            
            // TODO:
            // on register, we should assume the fresh-test data works and change the route to overview.
            // Then, on overview, we should show a "baking your data" thing until we have the test data.

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
                    } else if (data._id){
                        $rootScope.user = data._id;
                        // make a call to register your tests here.
                        console.log('successful registration, now callng tests....');

                        // ADD LOADING SPINNER HERE TO COVER FOR THE TESTS BEING MADE
                        $scope.results = true;
                        $http.post('/api/newtests/'+data._id).success(function(tests){
                            console.log('data', tests);
                            $location.path(data.redirect);
                        })
                    } else {
                        console.log(data);
                    }
                });
        };
    }]);
})();