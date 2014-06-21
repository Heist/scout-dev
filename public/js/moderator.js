"use strict";
// moderator.js

var scoutApp = angular.module('scoutApp',['ngRoute']);

scoutApp.config(function($routeProvider,$locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: 'partials/overview.html'
		})
		.when('/add', {
			templateUrl: 'partials/add.html'
		})
});