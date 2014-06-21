"use strict";
// moderator.js

function modScreenCtrl($scope,$http) {

	$scope.yourName = "nose";
	$scope.greeting = "";

	$scope.send=function(){
		var dataOut = {name:$scope.yourName};
		
		$http
			.post('/api/greet',dataOut)
			.success(function(dataIn){
				$scope.greeting = dataIn.greeting;
			});
	};
};