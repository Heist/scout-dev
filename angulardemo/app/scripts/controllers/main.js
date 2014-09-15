'use strict';

/**
 * @ngdoc function
 * @name angulardemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angulardemoApp
 */
angular.module('angulardemoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
