'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('report', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
    // holds the relevant summary
    $scope.session = {};

    if($stateParams.flow_id){
        $http.get('/api/report/flow/'+$stateParams.flow_id)
            .success(function(data){
              console.log('the report object', data);
        })
    } 
    // else {
    //     $http.get('/api/report/session/'+$stateParams.session_id)
    //         .success(function(data){
    //           $scope.session = data;
    //           console.log('the report object', $scope.session);
    //         })
    //     }

    $scope.select = function(selector){
        $scope.selected = selector;
        

        console.log($scope.selected);

        selector.favs = []

        for(var i in selector.session_by_user){
            for (var k in selector.session_by_user[i].messages){
                var msg = selector.session_by_user[i].messages[k];
                if (msg.fav==true){
                    selector.favs.push(msg);
                }
            }
        }

        console.log(selector.favs);

    }

}]);