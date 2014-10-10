// account.js
'use strict';

// ACCOUNT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', '$rootScope', function($scope, $http, $stateParams,$state, $location, $window, $rootScope){
	console.log('account touched');

	// $http
	// 	.get('/api/account')
	// 	.success(function(err,data){
	// 		console.log(data);
	// 	});

	$scope.connectTrello = function(){
		$window.open('/connect/trello', 'Connect Field Guide to Trello', 'width=450, height=600');
	}

	$scope.disconnectTrello = function() {
		console.log('touched disconnect');

		$http.delete('/connect/trello')
			.success(function(err, data){
				console.log('Trello disconnected');
			});

	}
}]);