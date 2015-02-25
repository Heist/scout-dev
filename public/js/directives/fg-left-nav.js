// fg-left-nav.js
(function() {
    'use strict';

// This module builds out the left navigation used in report and summary controllers.
// It does not require login in order to load information, because it is required for public routes.
    angular.module('field_guide_controls', [])
        .factory('reportHTTP', ['$http', function($http) {
            return {
                getReport: function(_id) {
                    $http.get('/api/summary/' + _id)
                        .success(function(data) {
                            return data.data;
                        });
                }
            };
        }])
        .directive('fgLeftNav', function() {
            return {
                scope: {},
                templateUrl: 'partials/directive-templates/fg-left-nav.html',
                replace: true,
                controller: 'FGLeftNavCtrl',
                controllerAs: 'ctrl'
            };
        })
        .controller('FGLeftNavCtrl', ['$scope', '$stateParams', 'reportHTTP',
            function($scope, $stateParams, reportHTTP) {               
                    reportHTTP.getReport($stateParams._id)
                        .success(function(response) {
                            $scope.navList = response.data;
                        });
                }
        ]);
})();