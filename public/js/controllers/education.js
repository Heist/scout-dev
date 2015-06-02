// education.js
// controller for the education pop-up window

(function() {
	'use strict';

	angular.module('field_guide_controls')
	.controller('education', 
    		['$scope','$http','$stateParams','$state','$location','$rootScope','$element','$timeout',
    function( $scope , $http,  $stateParams , $state , $location , $rootScope , $element,  $timeout){


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
    var intercom = {
                        education_page : $scope.educationPopup
                    };
                    
            

    $scope.showIntercom = function(){
        Intercom('trackEvent', 'opened-education', intercom );
        Intercom('show');
        $timeout(function() { Intercom('update'); }, 1000, false);
    }


	}]);

})();