// account.js
'use strict';

// ACCOUNT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', function($scope, $http,$stateParams,$state, $location, $window){
	console.log('account touched');

	$scope.connectTrello = function(){
		$window.open('/connect/trello', 'Connect Field Guide to Trello', 'width=450, height=600');
		// $http
		// 	.get('/connect/trello', {timeout : 5000})
		// 	.success(function(err,data){
		// 		console.log(data)
		// 		// 
		// 	});
	}
}]);