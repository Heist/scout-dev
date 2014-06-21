"use strict";
// moderator.js

function modScreenCtrl($scope) {

	$scope.yourName = "nose";

	$scope.check=function(){
		console.log($scope.yourName);
	};
};