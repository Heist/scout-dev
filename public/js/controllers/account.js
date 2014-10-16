// account.js
'use strict';

// ACCOUNT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', '$rootScope', function($scope, $http, $stateParams,$state, $location, $window, $rootScope){
	var user_id = $rootScope.user._id;

	$scope.account = $rootScope.user;
	// https://trello.com/1/members/my/boards?key=substitutewithyourapplicationkey&token=substitutethispartwiththeauthorizationtokenthatyougotfromtheuser
	// https://trello.com/docs/api/card/index.html#post-1-cards
	
	// $http
	// 	.get('/api/account/'+ user_id)
	// 	.success(function(data){
	// 		console.log(data);
	// 		$scope.account = data;
	// 	});

	$scope.connectTrello = function(){
		$scope.connector = true;
		// $window.open('views/anotherWindow.html', '_blank','menubar=yes,toolbar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,personalbar=yes');
		$window.open('/connect/trello', 'Connect Field Guide to Trello', 'width=450, height=600');
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