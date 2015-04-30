// report.js
(function() {
    'use strict';

    // REPORT CONTROLLER ===========================================================
    angular.module('field_guide_controls').controller('reportPublic', 
                [ 'loadData', 'reportFunctions', '$scope', '$sce', '$http', '$location', '$stateParams','$state','$sanitize', 
        function( loadData, reportFunctions, $scope, $sce, $http, $location,$stateParams,$state, $sanitize){
   
    // https://trello.com/docs/api/card/index.html#post-1-cards << HOW 2 POST CARDS TO TRELLO
        
    // ==============================================

    // SHARE LINK =========================================
        $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams.test_id;

        $scope.showReportLink = false;

        $scope.toggleReportLink =  function(){
            $scope.showReportLink = $scope.showReportLink ? false : true;
        };

    // ON LEFT NAV CLICK, SELECT THINGS ===================
        $scope.activate = function(obj, selectedIndex) {
            // passes an object from left nav to the global selection variable
            // reset all previous reliant variables, there are a lot!
            $scope.selected = '';
            $scope.commentMessage = '';
            $scope.selectedIndex = '';
            $scope.inputNote = '';
            $scope.showCommentToggle = 'hide';
            $scope.messageEditToggle = '';

            $scope.selectedIndex = selectedIndex;
            $scope.selected = obj || $scope.selected;
            

        // Set up what kind of video we're expecting to need here.
            if(obj.embed){
                var loadVideo = reportFunctions.videoRender(obj.embed);
                if(loadVideo.youtube){
                    $scope.selected.youTubeCode = loadVideo.youtube;
                } else {
                    $scope.selected.userTesting = loadVideo.embed;
                }
            }  
        };

    // SET VIEW VARIABLES FROM LOAD DATA ==================
        var data = loadData.data; // lol who even fucking knows why this can't return directly.
        console.log(data);
        
        $scope.navlist = _.sortBy(data.navlist.list, function(obj){
                    return obj.report_index;
                });
        
        $scope.messages = _.groupBy(data.messages, function(z){
                    return z._subject.name ? z._subject.name : 'report comment';
                });

        $scope.testname = data.navlist.test;

        var test_obj_arr = _.pluck(data.navlist.list, 'doctype');
        var idx = _.indexOf(test_obj_arr, 'test');
        
        $scope.activate(data.navlist.list[idx], 0);

    // NAVIGATION =============================================

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
    }]);
})();