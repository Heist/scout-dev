"use strict";
// moderator.js

var scoutApp = angular.module('scoutApp',['ui','ui.bootstrap','ui.router']);

scoutApp.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
	$locationProvider
		.html5Mode(true);

	$urlRouterProvider.otherwise('/home');
    
    $stateProvider        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partials/overview.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('add', {
        	url: '/add',
            templateUrl: 'partials/add.html'
            // we'll get to this in a bit       
        })
        ;

});

scoutApp.controller('steps', ['$scope',function($scope) {

	$scope.steps = [{'title':'step one'},{'title':'step two'},{'title':'big bird'}];

	$scope.add = function() {
        $scope.steps.push($scope.step);
        $scope.step = "";
    }
	// $scope.check=function(){
	// 	console.log($scope.flowname);
	// };
}]);

