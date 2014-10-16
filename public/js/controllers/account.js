// account.js
'use strict';

// ACCOUNT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', '$rootScope', function($scope, $http, $stateParams,$state, $location, $window, $rootScope){
	console.log('account touched', $rootScope.user);
	var user_id = $rootScope.user;

	// https://trello.com/1/members/my/boards?key=substitutewithyourapplicationkey&token=substitutethispartwiththeauthorizationtokenthatyougotfromtheuser
	// https://trello.com/docs/api/card/index.html#post-1-cards
	
	$http
		.get('/api/account/'+ user_id)
		.success(function(data){
			console.log(data);
			$scope.account = data;
		});

	$scope.connectTrello = function(){
		$scope.connector = true;
		$window.open('/connect/trello', 'Connect Field Guide to Trello', 'width=450, height=600');
		// in here I gotta put a $scope.watch or some shit to see if a thing changes.
	}

	$scope.disconnectTrello = function() {
		console.log('touched disconnect');

		$http.delete('/connect/trello')
			.success(function(err, data){
				console.log('Trello disconnected');
				$scope.account.trello=false;
			});

	}
}]);