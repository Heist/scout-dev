"use strict";
// moderatorController.js

var moderatorController = angular.module('moderatorController', []);

moderatorController.controller('modScreenCtrl', function ($scope) {
	$scope.yourName = "nose";
	$scope.check=function(){
		console.log($scope.yourName);
	};
});