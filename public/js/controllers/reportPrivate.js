'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('reportPrivate', 
            ['loadData', 'videoRender', 'postComment','$scope','$sce','$http','$location','$stateParams','$state','$sanitize','$rootScope', 
    function(loadData, videoRender, postComment,  $scope,  $sce,  $http,  $location,  $stateParams,  $state,  $sanitize,  $rootScope){

// https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

    $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams._id;
    $scope.showReportLink = false;

    $scope.toggleReportLink =  function(){
        $scope.showReportLink = ($scope.showReportLink) ?  false : true; 
        // if(!$scope.showReportLink){ $scope.showReportLink=true; }
        // else{ $scope.showReportLink = false; }
    };

    $scope.activate = function(obj, selectedIndex) {
    // passes an object from left nav to the global selection variable
            console.log('activate');

        // reset all previous reliant variables, there are a lot!
            $scope.selected = '';
            $scope.commentMessage = '';
            $scope.selectedIndex = '';
            $scope.inputNote = '';
            $scope.showCommentToggle = 'hide';
            $scope.messageEditToggle = '';

            $scope.selectedIndex = selectedIndex;
            $scope.selected = obj || $scope.selected;
            
            console.log(obj);
            // if(obj.embed){
            //     videoRender(obj.embed)
            //         .then(function(data){
            //             if(data.youtube){
            //                 $scope.selected.youTubeCode = data.youtube;
            //             } else {
            //                 $scope.selected.userTesting = data.embed;
            //             }
            //         });
            // }  
        };

// SET VIEW VARIABLES FROM LOAD DATA ==================
    console.log(loadData.data);
    var data = loadData.data; // lol who even fucking knows why this can't return directly.

    $scope.navlist = _.sortBy(data.navlist.list, function(obj){
                return (obj.report_index);
            });
    
    $scope.messages = _.groupBy(data.messages, function(z){
                return z._subject.name ? z._subject.name : 'report comment';
            });

    $scope.testname = data.navlist.test;

    $scope.activate(data.navlist.list[0], 0);


// ONBOARDING =========================================
    // TODO: Abstract into service for dependency injection

    $scope.changeOnboard = function(num){
        $rootScope.user.onboard = num;

        var url = '/api/user/'+$rootScope.user._id;
        var dataOut = {onboard : $rootScope.user.onboard};

        $http
            .put(url, dataOut)
            .success(function(data){
                console.log($rootScope.user);
                $location.path('/');
            });
    };

// NAVIGATION =============================================
    $scope.summarize = function(){
        console.log($stateParams._id);
        $location.path('/summary/'+ $stateParams._id);
    };

    $scope.showObjectMessages = function(msg, obj){
        if(obj._messages){
            if((obj._messages.indexOf(msg._id) >= 0)){     
                if(obj.doctype === 'task' && msg.fav_task){
                    return true;
                }
                if(obj.doctype === 'tag' && msg.fav_tag){
                    return true;
                }
            }
        }
    };


// COMMENTING =========================================
    $scope.showComments = function(message){
        // if the comment toggle is the same as the current comment toggle
        // hide commenting
        // else show the new message's comments

        if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'show'){
            // console.log('match');
            $scope.showCommentToggle = 'hide';
            $scope.commentMessage = '';
            return;
        }
        if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
            // console.log('match');
            $scope.showCommentToggle = 'show';
            return;
        }
        if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
            // console.log('fail');
            $scope.showCommentToggle = 'show'; 
            $scope.commentMessage = message;
            return;
        }
        
        $scope.commentMessage = message;

    };

    $scope.addComment = function(comment){
        if(comment && comment.body.length > 0){
            postComment(comment, $scope.commentMessage._id)
                .then(function(data){
                    comment.body = '';
                    var arr = _.pluck($scope.messages, '_id');
                    var msg_idx = _.indexOf(arr, $scope.commentMessage._id);
                    $scope.messages[msg_idx] = data;
                });
        }
        else {
            $scope.showCommentToggle = 'hide';
        }
    };

}]);