// account.js
'use strict';

// ACCOUNT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('account', ['$scope','$http', '$stateParams','$state', '$location', function($scope, $http,$stateParams,$state, $location){
	console.log('account touched');

	$scope.connectTrello = function(){
		$http
			.get('/connect/trello', {timeout : 5000})
			.success(function(err,data){
				console.log(data)
				// $window.open('/connect/trello');
			});
	}
}]);