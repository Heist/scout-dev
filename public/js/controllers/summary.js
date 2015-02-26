// summary.js
(function() {
    'use strict';

    // SUMMARY CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('summary', [ 'loadData', 'reportFunctions', 'postMessage', '$scope','$rootScope','$http','$location','$stateParams','$state','$sanitize', '$q',
                        function(loadData, reportFunctions, postMessage, $scope,  $rootScope,  $http,  $location,  $stateParams,  $state,  $sanitize, $q){
        
        $scope.test = {};
        $scope.timeline = [];
        $scope.commentMessage = '';
        $scope.showCommentToggle = 'hide';
        $scope.reportLink = $location.protocol()+'://'+$location.host()+'/p/report/'+$stateParams.test_id;
        $scope.showReportLink = false;

        // synchronous shit is weird. =====================
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
                if(data.youtube){
                    $scope.selected.youTubeCode = data.youtube;
                } else {
                    $scope.selected.userTesting = data.embed;
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

        $scope.activate(data.navlist.list[0], 0);

    // NAVIGATION =========================================

        $scope.reportView = function(){
            $location.path('/report/'+$stateParams._id);
        };

        $scope.summaryView = function(){
            $location.path('/summary/'+$stateParams._id);
        };

        $scope.toggleReportLink =  function(){
            $scope.showReportLink = $scope.showReportLink ? false : true;
        };

        $scope.showObjectMessages = function(msg, obj){
            if(obj._messages){
                if((obj._messages.indexOf(msg._id) >= 0)){                
                    return true;
                }
            }
        };

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
                    $location.path('/report/'+$stateParams._id);
                });
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
            }

            if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
                $scope.showCommentToggle = 'show';
                return;
            }

            if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
                $scope.showCommentToggle = 'show'; 
                $scope.commentMessage = message;
                return;
            }
            
            $scope.commentMessage = message;
        };

        
        $scope.addComment = function(comment){
            if(comment && comment.body.length > 0){
                reportFunctions.postComment(comment, $scope.commentMessage._id)
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

        // MOVE STEPS =========================================

        $scope.msgFilter = function(message){
            // Display messages that belong to the current selected item.
            return (message._id === $scope.selected._id) ? true : false;
        };

        $scope.moveTask = function(old_index, new_index){            
            $scope.navlist = reportFunctions.moveTask($scope.navlist, old_index, new_index);
            // Here the list is in the correct order, which it doesn't seem to keep. 
            // ruh-roh.
            // new function: save list? 
            // Returns list order from DB as appropriate in array order.
            $http.put('/api/summary/'+ $stateParams._id, $scope.navlist)
                .success(function(data){
                    console.log('success moving steps?', data);
                });
           
        };


        // OBJECT FUNCTIONS =====================================
        $scope.saveObject = function(obj){
            var data = [obj];

            $http.put('/api/summary/object', data)
                .success(function(doc){
                    console.log(doc);
                });
        };

        $scope.passFail = function(obj){
            if(obj.pass_fail){ obj.pass_fail = false; }
            else { obj.pass_fail = true; }

            $scope.saveObject(obj);
        };

        $scope.toggleVis = function(obj){
            if( obj.visible ){ obj.visible = false ; } 
            else { obj.visible = true; }

            $scope.saveObject(obj);
        };


        // MESSAGE FUNCTIONS ==================================
        $scope.editMessage = function(message, index){
            // clear this on blur to block weird toggle bug
            $scope.inputNote = '';
            $scope.messageEditToggle = message._id;
        };

        $scope.toggleNote = function(user){
            // Opens up a new message from a user who previously participated in a test.
            $scope.messageEditToggle = '';
            $scope.inputNote = user;
        };

        $scope.saveEdit = function(message){
            $scope.messageEditToggle = '';
            $http
                .put('/api/message/', message)
                .success(function(data){
                    console.log(data);
                });
        };

        $scope.saveFav = function(message){
            if($scope.selected.doctype === 'task'){
                return (message.fav_task) ? message.fav_task = false : message.fav_task = true ;
            }

            if($scope.selected.doctype === 'tag'){
                return (message.fav_tag) ? message.fav_tag = false : message.fav_tag = true ;
            }

            $http.put('/api/message/fav', message);
        };

        $scope.postMessage = function(message, subject){
            postMessage(message, $scope.selected._id, $scope.selected._test, subject._id )
                .then(function(data){
                    console.log(data);

                    $scope.newnote = '';

                    $scope.toggleNote(subject._id);
                    $scope.toggleNote();
                    
                    $scope.messages[data.msg._subject.name].push(data.msg);
                    $scope.selected._messages.push(data.msg._id);

                    var indexCheck = _.pluck($scope.leftNavList, 'name');

                    _.each(data.tags, function(tag){
                        
                        var idx = indexCheck.indexOf(tag.name);

                        if(idx === -1){
                            tag.report_index = $scope.leftNavList.length;
                            $scope.leftNavList.push(tag);
                            $scope.leftNavList[tag.report_index]._messages.push(data.msg._id);
                        } else {
                            $scope.leftNavList[idx]._messages.push(data.msg._id);
                        }
                    });
                });
        };



    // SAVE SUMMARY ==========================================
        $scope.saveSummary = function(){
            // post all the summary changes to the test
            // post fav'd statuses to relevant messages

            $scope.messages = _.map($scope.messages, function(val, key){ return val; });

            mixpanel.track('Summary complete', {});

            $http.put('/api/summary/'+ $stateParams._id, 
                { navlist  : $scope.navlist, 
                  messages : $scope.messages[0]
                }).success(function(data){

                });
        };
    }]);
})();