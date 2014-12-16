'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('report', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
// https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

    $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/report/'+$stateParams.test_id;
    
    $http.get('/api/auth/report/'+$stateParams.test_id)
            .success(function(data){
                console.log('the report object', data);
                
                $scope.leftNavList = [];
                
                var sort = _.sortBy(data.navlist, function(obj){
                                return(obj.report_index);
                            });

                _.each(sort, function(obj){
                    console.log(obj.name); 
                    $scope.leftNavList.push(obj);
                });

                $scope.messages = data.messages;

                $scope.activate($scope.leftNavList[0]);
                
            }); 

    $scope.doKeyUp = function(evt){
        console.log(evt);
        if(event.keyCode === 27){
            $scope.showCommentToggle = false;
            $scope.commentMessage = '';   
        } else {
            return;
        }
    };

// MIXPANEL ===================================== 

    // mixpanel.track('Report Loaded', {});
// ==============================================

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

// COMMENTING =============================================

    $scope.showComments = function(message){
        if( !$scope.showCommentToggle){  $scope.showCommentToggle = true; }

        $scope.commentMessage = message;
        console.log('comments on message', message);
    };

    $scope.addComment = function(comment){
        var dataOut = {
            comment: {body : comment.body},
            message: $scope.commentMessage._id
        };


        console.log($scope.messages);
        $http
            .post('/api/comment/', dataOut)
            .success(function(data){
                console.log(data);
                comment.body = '';
                
                var arr = _.pluck($scope.messages, '_id');
                var msg_idx = _.indexOf(arr, $scope.commentMessage._id);
                
                $scope.messages[msg_idx]._comments.push(comment);
                
            });

    };

}]);