// login.js
'use strict';

// LOGIN CONTROLLER ===========================================================
angular.module('field_guide_controls')
    .controller('login', ['$scope','$http', '$location', '$stateParams', function($scope, $http, $location, $stateParams){
    
    // LOGIN FUNCTIONS ====================================
    console.log('loaded login controller');
    $scope.user = {}

    $scope.register = function(user){
    	console.log(user)
    	var url = '/auth/signup/';
    	var dataOut = user;
    	
    	$http
    		.post(url, dataOut)
    		.success(function(data){
    			console.log('success!', data)

    		})
    		.error(function(error){
    			console.log('signup no bueno.', error)
    		});

    }

    $scope.login = function(user){
    	var url = '/auth/login';
    	var dataOut = user;

    	$http
    		.post(url, dataOut)
    		.success(function(data){
    			console.log('success!', data)
    		})
    		.error(function(error){
    			console.log('login no bueno.', error)
    		});

    }
}]);