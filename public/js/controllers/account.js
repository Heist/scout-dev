// account.js
(function() {
	'use strict';

	// ACCOUNT CONTROLLER ===========================================================
	angular.module('field_guide_controls')
		.controller('account', ['$scope','$http', '$stateParams','$state', '$location', '$window', '$rootScope', 
					function($scope, $http, $stateParams,$state, $location, $window, $rootScope){
		var user_id = $rootScope.user._id;

		$scope.live_user = $rootScope.user;
		$scope.account = $rootScope.user.account;
		$scope.connector = {};
		
		
		// https://trello.com/1/members/my/boards?key=substitutewithyourapplicationkey&token=substitutethispartwiththeauthorizationtokenthatyougotfromtheuser
		// https://trello.com/docs/api/card/index.html#post-1-cards
		
		$http
			.get('/api/account/'+ user_id)
			.success(function(data){
				// 
				$scope.live_user = data;
			});

		
	// ONBOARDING =========================================
    // TODO: Abstract into service for dependency injection

        $scope.onboardToggle = function(){
            if($scope.onboardSteps  || $scope.onboardSteps === true  ){
            	$rootScope.user.onboard = 100;
                $scope.onboardSteps = false; 
                $scope.animationToggle();
                return;
            }
            if(!$scope.onboardSteps || $scope.onboardSteps === false ){
            	$rootScope.user.onboard = 1; 
                $scope.onboardSteps = true; 
                return;
            }
        };

        $scope.animationToggle = function(){
        	var lastStep = angular.element(document.querySelector('#lastStep, #modal'));
        	var otherSteps = angular.element(document.querySelector('#otherSteps, #modal'));

        	// below classes are from animate.css library
        	lastStep.addClass('animated slideOutDown').delay(1000).hide(1);
        	otherSteps.addClass('animated slideOutDown').delay(1000).hide(1);

        };

	// STRIPE CHECKOUT ====================================

		// $scope.stripeCheckout = function(){
		// 	var handler = StripeCheckout.configure({
		// 	key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
		// 	// image: '/square-image.png',
		// 	token: function(token) {
		// 	// Use the token to create the charge with a server-side script.
		// 	// You can access the token ID with `token.id`
		// 	}
		// 	});

		// 	handler.open({
		// 		name: 'Demo Site',
		// 		description: '2 widgets ($20.00)',
		// 		amount: 2000
		// 	});
		// };


	// HOOK UP TRELLO =====================================
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
			$scope.$apply();
		};

		$scope.connectTrello = function(){
			$scope.connector.message = "Connecting your Trello account...";
			$scope.connector.toggle = 3;

			$window.open('/connect/trello', 'Connect Field Guide to Trello', 'width=450, height=600');
			$scope.$watch('inviteCallback', function(){
				// $scope.connector = false;
				// $scope.live_user.trello = true;
			});
		};

		$scope.disconnectTrello = function() {
			// // 

			$http.delete('/connect/trello')
				.success(function(err, data){
					// // 
					$scope.live_user.trello=false;

					$scope.connector.message = "Connect your Trello account.";
					$scope.connector.toggle = 2;
				});

		};

// TEAM MEMBER INVITATIONS ================================
		// $scope.removeTeamMember = function(person){
		// 	var index = $scope.live_user.team.indexOf(person);

		// 	$http
		// 		.delete('/api/account/'+person._id)
		// 		.success(function(err, data){
		// 			$scope.live_user.team.splice(index, 1);
		// 		});
		// };

		// $scope.team_mail = function(){
		// }

		// $scope.team_mail = {};

		$scope.inviteTeamMember = function(email){
			var url = '/api/invite/',
				dataOut = email,
				new_url = $location.protocol()+'://'+$location.host()+':8080';

			$http
				.post(url, dataOut)
				.success(function(invite){
					if(invite.user_email){
						// user_email exists only on the Invite model.
						// if an invitation then exists, do the following.

						$scope.live_user.invites.push(invite);

						email.address = "";
						
						$scope.message = "We&rsquo;ve sent an e-mail invitation to your team member."+
							" Just in case, you can also invite them using this personalized link:"+
							" <a href='"+new_url+"/login/"+invite._id+"' target='_blank'>"+new_url+
							"/login/"+invite._id+"</a>";
					}
					else if(invite.msg === 'user found'){
						// an existing user was found
						// their existing account identity was wiped out and 
						// they have been added to the new team
						
						$scope.live_user.team.push({ local : {email : invite.email}, 'name': invite.name});
						email.address = "";
						$scope.message = "<strong>This team member is already a Field Guide user. "+
										"If they join your team they will be removed from their current team "+
										"and lose access to those projects.</strong><br><br>"+
										"Invite them to your team using this personalized link:"+
										" <a href='"+new_url+"/login/"+invite._id+"' target='_blank'>"+
										new_url+"/login/"+invite._id+"</a>";
					} 
					else {
						$scope.message = invite;
					}
				});
		};

		$scope.resendInvite = function(invite){
			// this will resend a pending invitation for a non-existent user
			// it requires that the previous invitation supply an invitation._id
			
			var url = '/api/invite/'+invite._id,
				dataOut = invite,
				new_url = $location.protocol()+'://'+$location.host()+':8080';

			$http
				.post(url, dataOut)
				.success(function(data){
					
					$scope.message = "Reinvitation sent to "+ data.user_email +
									"<br /> Here is a personalized invitation link you can share with them: "+
									"<a href='"+new_url+"/login/"+invite._id+"'>"+new_url+"/login/"+invite._id+
									"</a>";
				});

		};
		$scope.deleteInvite = function(invite){
			var index = $scope.live_user.invites.indexOf(invite);

			$http
				.delete('/api/invite/'+invite._id)
				.success(function(err, data){
					$scope.live_user.invites.splice(index, 1);
				});
		};

		$scope.accountExport = function(){
			// TODO: Output this data as a compressed JSON return.
			$http
				.get('/auth/export/account/')
				.success(function(data){
					
				});
		};

	}]);
})();