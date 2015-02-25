// fg-left-nav.js
(function() {
    'use strict';

// This module builds out the left navigation used in report and summary controllers.
// It does not require login in order to load information, because it is required for public routes.

    angular.module('field_guide_controls', [])
      .directive('fg-left-nav', function() {
        return {
            scope: {
                contestants: '=' // vaaaaaz issss?
            },
            templateUrl: 'partials/directive-templates/fg-left-nav.html',
            replace: true,
            controller: 'FGLeftNavCtrl',
            controllerAs: 'ctrl'
        };
    })
    .controller('FGLeftNavCtrl', function($scope) {
        this.contestant = {}; // this is connected to the above somehow
        this.save = function() {
            $scope.contestants.push(this.contestant);
            this.contestant = {};
        };
    });

})();