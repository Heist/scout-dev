// account.js
'use strict';

// ACCOUNT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', '$rootScope', function($scope, $http, $stateParams,$state, $location, $window, $rootScope){
	var user_id = $rootScope.user._id;

	$scope.live_user = $rootScope.user;
	$scope.account = $rootScope.user.account;
	
	// https://trello.com/1/members/my/boards?key=substitutewithyourapplicationkey&token=substitutethispartwiththeauthorizationtokenthatyougotfromtheuser
	// https://trello.com/docs/api/card/index.html#post-1-cards
	
	$http
		.get('/api/account/'+ user_id)
		.success(function(data){
			console.log(data);
			$scope.live_user = data;
		});

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


	$scope.removeTeamMember = function(person){
		console.log('remove this person', person._id );
		var index = $scope.live_user.team.indexOf(person);

		$http
			.delete('/api/account/'+person._id)
			.success(function(err, data){
				console.log('deleted', data);
				$scope.live_user.team.splice(index, 1);
			});
	};

	$scope.inviteTeamMember = function(email){
		console.log('touched invitation', email.address);
		var url, 
			dataOut;

		url = '/api/account/'+$scope.account;
		dataOut = email;

		$http
			.post(url, dataOut)
			.success(function(err, data){
				console.log('invitation sent', data);
				$scope.live_user.invites.push({ user_email: email.address, pending:true});
			});

	};

	$scope.deleteInvite = function(invite){
		var index = $scope.live_user.invites.indexOf(invite);

		$http
			.delete('/api/invite/'+invite._id)
			.success(function(err, data){
				console.log('invitation removed');
				$scope.live_user.invites.splice(index, 1);
			});
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