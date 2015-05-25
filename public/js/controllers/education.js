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
                        created_at : new Date(),
                        email      : $rootScope.user.email,
                        education_page : step
                    };
                    
            Intercom('trackEvent', 'opened-education', intercom );
    
    }

    var locationPath = $location.path();

    if(locationPath.indexOf('/overview') !== -1) {
        $scope.educationPopup = 1;
    } else if (locationPath.indexOf('/edit/test') !== -1) {
        $scope.educationPopup = 2;
    } else if (locationPath.indexOf('/summary') !== -1) {
        $scope.educationPopup = 3;
    } else {
        $scope.educationPopup = 1;
    }

    // $scope.resetPopup = function(){
    //     $scope.help = false;
    //     $scope.educationPopup = 0;
    // }

	}]);

})();