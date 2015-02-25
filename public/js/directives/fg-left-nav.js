// // fg-left-nav.js
// (function() {
//     'use strict';

// // This module builds out the left navigation used in report and summary controllers.
// // It does not require login in order to load information, because it is required for public routes.

//     angular.module('field_guide_controls', [])
      //   .factory('reportHTTP', 
      //     ['$http','$stateParams', function($http, $stateParams) {
      //         return $http.get('/api/summary/'+$stateParams._id)
      //                     .success(function(data) {
      //                         return data.data;
      //                     });
      //     }]);
      //   .directive('fg-left-nav', function() {
      //     return {
      //         scope: {},
      //         templateUrl: 'partials/directive-templates/fg-left-nav.html',
      //         replace: true,
      //         controller: 'FGLeftNavCtrl',
      //         controllerAs: 'ctrl'
      //     };
      // })
      // .controller('FGLeftNavCtrl', function($scope) {


      //   $scope.activate = function(obj, selectedIndex) {
      //       // passes an object from left nav to the global selection variable

      //       // reset all previous reliant variables, there are a lot!
      //       $scope.selected = '';
      //       $scope.commentMessage = '';
      //       $scope.selectedIndex = '';
      //       $scope.inputNote = '';
      //       $scope.showCommentToggle = 'hide';
      //       $scope.messageEditToggle = '';
      //       $scope.selectedIndex = selectedIndex;

      //       $scope.selected = obj || $scope.selected;
            
      //   };
//     });
// })();