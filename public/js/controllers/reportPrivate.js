'use strict';
// report.js

// REPORT CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('reportPrivate', 
            ['postComment','$scope','$sce','$http','$location','$stateParams','$state','$sanitize','$rootScope', 
    function( postComment,  $scope,  $sce,  $http,  $location,  $stateParams,  $state,  $sanitize,  $rootScope){
// https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

    $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams.test_id;
    $scope.showReportLink = false;

    $scope.toggleReportLink =  function(){
        if(!$scope.showReportLink){ $scope.showReportLink=true; }
        else{ $scope.showReportLink = false; }
    };

    $http.get('/api/summary/'+$stateParams.test_id)
            .success(function(data){
                $scope.leftNavList = [];
                $scope.testname = data.test;
                
                var sort = _.sortBy(data.navlist, function(obj){
                                return(obj.report_index);
                            });

                _.each(sort, function(obj){
                    if(obj.visible){
                        $scope.leftNavList.push(obj);
                    }
                });

                $scope.messages = data.messages;
                $scope.activate($scope.leftNavList[0]);
                
            }); 

// == mixpanel ==================================

    mixpanel.track('Report Loaded', {});

// ==============================================


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
        $location.path('/summary/'+ $stateParams.test_id);
    };

    $scope.activate = function(obj, selectedIndex) {
        // passes the task to the global variable

        $scope.selected = '';
        $scope.commentMessage = '';
        $scope.selectedIndex = '';
        $scope.showCommentToggle = 'hide';
        
        $scope.selectedIndex = selectedIndex;
        
        if(obj){
            $scope.selected = obj;

            // here's where we do the rendering shit for the embeds. Slow. Boo.
            if(obj.embed){
                var utest = /usabilitytestresults/i;
                var ut = utest.test(obj.embed);
                if(ut){
                    var w1 = /width='\d+'/i;
                    var h1 = /height='\d+'/i;
                    var w2 = /"width":"\d+"/i;
                    var h2 = /"height":"\d+"/i;
                    
                    var res = obj.embed.replace(w1, "width='574'");
                    res = res.replace(w2, '"width":"574"');
                    res = res.replace(h1, "height='380'");
                    res = res.replace(h2, '"height":"380"');
                    
                    // console.log(res);

                    $scope.selected.userTesting = $sce.trustAsHtml(res);
                    // $scope.selected.HTMLdemo = '<a href="#linky">I am a link</a>';
                } else {
                    $scope.selected.youTubeCode = obj.embed;
                }

            }
        }
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
}]);