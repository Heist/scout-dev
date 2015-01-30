// forgot.js
(function() {
    'use strict';

    // PASSWORD RESET CONTROLLER ===========================================================
    angular.module('field_guide_controls')
       .controller('forgot', ['$scope','$http', '$location', '$stateParams','$rootScope', function($scope, $http, $location, $stateParams, $rootScope){
        console.log('password reset controller');    

        var url = '/reset/'+$stateParams.token;
        $http
            .get(url)
            .success(function(data){
                console.log(data);
            });

        model.message = "";

        model.user = {
          username: "",
          password: "",
          confirmPassword: ""
        };

        model.submit = function(isValid) {
          console.log("h");
          if (isValid) {
            model.message = "Submitted " + model.user.username;
          } else {
            model.message = "There are still invalid fields below";
          }
        };

        
    }]);
})();