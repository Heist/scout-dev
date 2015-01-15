// confirm-click.js
(function() {
    'use strict';

    angular.module('field_guide_controls')
    .directive('ngConfirmClick', function(){
        return {
            restrict: 'A',
            replace: false,
            link: function($scope, $element, $attr) {
                var clickAction, msg;
                msg = $attr.ngConfirmClick || "Are you sure?";
                clickAction = $attr.confirmedClickAction;
                return $element.bind('click', function(event) {
                    if (window.confirm(msg)) {
                        return $scope.$eval(clickAction);
                    }
                });
            }
        };
    });
})();