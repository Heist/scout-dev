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

    // $scope.doKeyUp = function(evt){
    //     console.log(evt);
    //     if(event.keyCode === 27){
    //         $scope.showCommentToggle = false;
    //         $scope.commentMessage = '';   
    //     } else {
    //         return;
    //     }
    // };

// MIXPANEL ===================================== 

    // mixpanel.track('Report Loaded', {});
// ==============================================

// NAVIGATION =============================================

    $scope.summarize = function(){
        $location.path('/summary/'+ $stateParams.test_id);
    };

    $scope.activate = function(obj, selectedIndex) {
        // passes the task to the global variable

        $scope.selected = '';
        $scope.commentMessage = '';
        $scope.selectedIndex = '';
        $scope.showCommentToggle = 'hide';
        // $scope.messageEditToggle = '';
        
        $scope.selectedIndex = selectedIndex;
        
        if(obj){
            $scope.selected = obj;

            // here's where we do the rendering shit for the embeds. Slow. Boo.
            if(obj.embed){
                var ytube = /youtube.com/i;
                var yt = ytube.test(obj.embed);
                if(yt){
                    $scope.selected.youTubeCode = obj.embed;
                }

                var utest = /usabilitytestresults/i;
                var ut = utest.test(obj.embed);
                if(ut){
                    $scope.selected.userTesting = true;
                }

            }
        }
    };

    $scope.showObjectMessages = function(msg, obj){
        if(obj._messages){
            if((obj._messages.indexOf(msg._id) >= 0)){                
                return true;
            }
        }
    };

// COMMENTING =========================================
    $scope.showComments = function(message){
        // if the comment toggle is the same as the current comment toggle
        // hide commenting
        // else show the new message's comments

        console.log(message._id, $scope.commentMessage._id, $scope.showCommentToggle);

        // if(){}
        if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'show'){
            console.log('match');
            $scope.showCommentToggle = 'hide';
            $scope.commentMessage = '';
            return;
        }
        if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
            console.log('match');
            $scope.showCommentToggle = 'show';
            return;
        }
        if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
            console.log('fail');
            $scope.showCommentToggle = 'show'; 
            $scope.commentMessage = message;
            return;
        }
        
        $scope.commentMessage = message;

    };

    $scope.addComment = function(comment){
        console.log('add comment', $scope.messages);
        if(comment && comment.body.length > 0){
            var dataOut = {
                comment: {body : comment.body}
            };
            
            $http
                .post('/api/comment/'+$scope.commentMessage._id, dataOut)
                .success(function(data){
                    comment.body = '';

                    var arr = _.pluck($scope.messages, '_id');
                    var msg_idx = _.indexOf(arr, $scope.commentMessage._id);

                    console.log(msg_idx);
                    $scope.messages[msg_idx]._comments.push(data.comment);
                });
        } else {
            $scope.showCommentToggle = 'hide';   
        }
    };


}]);