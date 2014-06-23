"use strict";
// moderator.js

var scoutApp = angular.module('scoutApp',['ui.router']);

scoutApp.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
	$locationProvider
		.html5Mode(true);

	$urlRouterProvider.otherwise('/home');
    
    $stateProvider        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partials/overview.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
});