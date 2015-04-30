// test-task-build.js
// functions required to build out a test
'use strict';

(function(){
    angular.module('field_guide_controls')
        .factory('testBuildFunctions', ['$http', '$rootScope', 
            function($http, $rootScope) {
                return {
                    addTask : function(test, task, index){
                        // console.log(task, test);
                        
                        task._test = test;
                        task.index = index;

                        var promise = $http.post('/api/task/', task).success(function(data){
                                return data;
                            });
                        return promise;
                    }
                };
            }]);
})();