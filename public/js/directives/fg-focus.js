// fg-focus.js
// a directive to provide imperative focus within Angular
'use strict';
(function(){
    angular.module('field_guide_controls')
.factory('focus', function($timeout) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function(){
        var element = document.getElementById(id);
        if(element){
            element.focus();
        }
      }, 150);
    };
  })
.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '@focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") { 
          $timeout(function() {
            element[0].focus(); 
          }, 150);
        }
      });
    }
  };
});
})();