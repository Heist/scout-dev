// fg-load-spinner.js
// provide a loading spinner as an HTTP interceptor

'use strict';
(function(){
    angular.module('field_guide_app')
        .factory('loadInterceptor', function ($q, $window) {
          return function (promise) {
            return promise.then(function (response) {
              $("#spinner").hide();
              return response;
            }, function (response) {
              $("#spinner").hide();
              return $q.reject(response);
            });
          };
        });
})();