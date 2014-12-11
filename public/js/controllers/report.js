'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('report', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
// https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

    $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/report/'+$stateParams.test_id;
    
    $http.get('/api/report/'+$stateParams.test_id)
            .success(function(data){
                console.log('the report object', data);
                
                var sort = _.sortBy(data.navlist, function(obj){
                                return(obj.report_index);
                            });

                $scope.leftNavList = [];
                
                _.each(sort, function(obj){console.log(obj.name); $scope.leftNavList.push(obj);});

                $scope.messages = data.messages;

                $scope.activate($scope.leftNavList[0]);
                
                // console.log($scope.reportLink);
                

            }); 

        // mixpanel.track('Report Loaded', {});

    $scope.summarize = function(){
        $location.path('/summary/'+ $stateParams.test_id);
    };

    $scope.activate = function(obj, selectedIndex) {
        // passes the task to the global variable
        // console.log('activated', obj.name);

        $scope.selectedIndex = selectedIndex;
     
        if(obj){
            $scope.selected = obj;
        }
    };

    $scope.showTask = function(msg, obj){
        if(obj._messages){
            var obj_msg_list = _.pluck(obj._messages, '_id');

            // console.log('object messages', obj_msg_list);
            // console.log('message id', msg._id);

            if((obj_msg_list.indexOf(msg._id) >= 0)){
                // console.log('task shown');
                return true;
            }
        }
    };

}]);