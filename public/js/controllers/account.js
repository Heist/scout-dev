// account.js
'use strict';

// ACCOUNT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', '$rootScope', function($scope, $http, $stateParams,$state, $location, $window, $rootScope){
	var user_id = $rootScope.user._id;

	$scope.live_user = $rootScope.user;
	$scope.account = $rootScope.user.account;
	
	// https://trello.com/1/members/my/boards?key=substitutewithyourapplicationkey&token=substitutethispartwiththeauthorizationtokenthatyougotfromtheuser
	// https://trello.com/docs/api/card/index.html#post-1-cards
	
	// $http
	//	.get('/api/account/'+ user_id)
	//	.success(function(data){
	//		console.log(data);
	//		$scope.live_user = data;
	//	});

	$scope.connector = {};
	
	if($scope.live_user.trello){
		$scope.connector.message = "Your Trello account is connected.";
		$scope.connector.toggle = 1;
	} 

	if (!$scope.live_user.trello) {
		$scope.connector.message = "Connect your Trello account.";
		$scope.connector.toggle = 2;
	}

	$window.inviteCallback = function(){
		$scope.connector.message = "Your Trello account is connected.";
		$scope.connector.toggle = 1;
		console.log('called back');
		$scope.$apply();
	};

	$scope.connectTrello = function(){
		$scope.connector.message = "Connecting your Trello account...";
		$scope.connector.toggle = 3;
		// $window.open('views/anotherWindow.html', '_blank','menubar=yes,toolbar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,personalbar=yes');
		$window.open('/connect/trello', 'Connect Field Guide to Trello', 'width=450, height=600');
		$scope.$watch('inviteCallback', function(){
			console.log('hello callback!');
			// $scope.connector = false;
			// $scope.live_user.trello = true;
		});
	};

	$scope.disconnectTrello = function() {
		console.log('touched disconnect');

		$http.delete('/connect/trello')
			.success(function(err, data){
				console.log('Trello disconnected');
				$scope.live_user.trello=false;

				$scope.connector.message = "Connect your Trello account.";
				$scope.connector.toggle = 2;
			});

	};
}]);