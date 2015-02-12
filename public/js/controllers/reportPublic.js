// report.js
(function() {
    'use strict';

    // REPORT CONTROLLER ===========================================================
    angular.module('field_guide_controls').controller('reportPublic', ['$scope', '$sce', '$http', '$location', '$stateParams','$state','$sanitize', 
        function($scope, $sce, $http, $location,$stateParams,$state, $sanitize){
    // https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO

        $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams.test_id;

        $scope.showReportLink = false;
        $scope.toggleReportLink =  function(){
            if(!$scope.showReportLink){ $scope.showReportLink=true; }
            else{ $scope.showReportLink = false; }
        };

        $http.get('/api/public/report/'+$stateParams.test_id)
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
                    var ytube = /youtube.com/i;
                    var yt = ytube.test(obj.embed);
                    if(yt){
                        $scope.selected.youTubeCode = obj.embed;
                    }

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
                        
                        $scope.selected.userTesting = $sce.trustAsHtml(res);
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
                $scope.showCommentToggle = 'hide';
                $scope.commentMessage = '';
                return;
            } else if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
                $scope.showCommentToggle = 'show';
                return;
            } else if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
                $scope.showCommentToggle = 'show'; 
                $scope.commentMessage = message;
                return;
            }
            
            $scope.commentMessage = message;

        };

        $scope.addComment = function(comment){
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
                        $scope.messages[msg_idx]._comments.push(data.comment);

                    });
            } else {
                $scope.showCommentToggle = 'hide';   
            }
        };
    }]);
})();