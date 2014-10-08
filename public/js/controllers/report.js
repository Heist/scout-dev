'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('report', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){

    $http.get('/api/report/'+$stateParams.test_id)
            .success(function(data){
              // console.log('the report object', data);
      
                var messagesById = {}; 

                data.messages.forEach(function(m) { 
                    messagesById[m._id] = m;
                    // console.log('message id', m._id)
                  });

                // console.log('messagesById', messagesById);
                // // var visible_array = [];

                data.tags.forEach(function(p) {
                //  p.visible_array = [];
                //  console.log('tag message', p._messages);
                  p._messages = p._messages.map(function(message) { 
                      if (messagesById[message]){
                        // console.log('id', message, messagesById[message])
                        return messagesById[message];
                      } else {
                        return {_id : message}
                      }
                    });
                });


              $scope.report = data;
              $scope.tasks = data.tasks;
              $scope.test = data.test;
              $scope.tags = data.tags;
              $scope.messages = data.messages;

             console.log('tasks', data.tasks, 'test', $scope.test, 'tags', $scope.tags  )

             $scope.select(data.test)
             $state.go("report.test");
        }) 

    $scope.select = function(obj){
        // console.log('selected object', obj)
        $scope.selected = obj;
    }

}]);