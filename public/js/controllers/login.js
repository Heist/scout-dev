// login.js
'use strict';

// LOGIN CONTROLLER ===========================================================
angular.module('field_guide_controls')
    .controller('login', ['$scope','$http', '$location', '$stateParams', function($scope, $http, $location, $stateParams){
    
    // LOGIN FUNCTIONS ====================================
    console.log('loaded login controller');

    $scope.register = function(credentials){
    	console.log(credentials);
    }

    $scope.login = function(credentials){
    	console.log(credentials);
    	var url = '/auth/login'
    	
    	$http
    		.post(url)
    		.success(function(data){
    			console.log('success!')
    		})
    		.error(function(error){
    			console.log('login no bueno.', error)
    		});

    }
}]);