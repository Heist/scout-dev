// fg-enter.js
// Use either tab or enter to enter data from an input field

'use strict';
(function(){
    angular.module('field_guide_controls')
        .directive('ngEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13 || event.which === 9 ) {
                        scope.$apply(function (){
                            scope.$eval(attrs.ngEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        });
})();