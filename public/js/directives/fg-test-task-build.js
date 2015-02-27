// test-task-build.js
// functions required to build out a test
'use strict';

(function(){
    angular.module('field_guide_controls')
        .factory('testBuildFunctions', ['$q', '$timeout', '$http', '$location', '$rootScope', 
            function($q, $timeout, $http, $location, $rootScope) {
                return {
                    addTask : function(test, task){
                        task._test = test;

                        var promise = $http.post('/api/task/', task).success(function(data){
                                return data;
                            });
                        return promise;
                    }
                };
            }]);
})();