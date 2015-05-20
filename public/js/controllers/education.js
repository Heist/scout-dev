// education.js
// controller for the education pop-up window

(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('education', 
    		['$scope','$http','$stateParams','$state','$location','$rootScope','$element',
    function( $scope , $http,  $stateParams , $state , $location , $rootScope , $element){

    $scope.tracker = function(step){
        // Intercom tracker ===============================
            var intercom = {
                        event_name : 'opened-education',
                        created_at : new Date(),
                        email      : $rootScope.user.email,
                        metadata   : {
                            'education-page' : step
                        }
                    };
                    
            Intercom('trackEvent', intercom );
    
    }

	}]);

})();