'use strict';

/**
 * @ngdoc function
 * @name angulardemoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angulardemoApp
 */
angular.module('angulardemoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
