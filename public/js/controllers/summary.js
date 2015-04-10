// summary.js
(function() {
    'use strict';

    // SUMMARY CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('summary', 
            [ 'loadData', 'reportFunctions', 'postMessage', '$scope','$rootScope','$http','$location','$stateParams','$state','$sanitize', '$q',
        function(loadData, reportFunctions, postMessage, $scope,  $rootScope,  $http,  $location,  $stateParams,  $state,  $sanitize, $q){
        
        $scope.test = {};
        $scope.timeline = [];
        $scope.commentMessage = '';
        $scope.showCommentToggle = 'hide';
        $scope.reportLink = $location.protocol()+'://'+$location.host()+'/p/report/'+$stateParams._id;
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
                if(loadVideo.youtube){
                    $scope.selected.youTubeCode = loadVideo.youtube;
                } else {
                    $scope.selected.userTesting = loadVideo.embed;
                }
            }  
        };

    // SET VIEW VARIABLES FROM LOAD DATA ==================
        var data = loadData.data; // lol who even fucking knows why this can't return directly.
        
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


        // MOVE STEPS =========================================

        // $scope.msgFilter = function(message){
        //     // Display messages that belong to the current selected item.
        //     return (message._id === $scope.selected._id) ? true : false;
        // };

        $scope.moveTask = function(old_index, new_index){   
            $scope.navlist = reportFunctions.moveTask($scope.navlist, old_index, new_index);
            $http.put('/api/summary/'+ $stateParams._id, $scope.navlist);           
        };

        // OBJECT FUNCTIONS =====================================

        $scope.saveObject = function(obj){
            $http.post('/api/summary/object/', [obj]);
        };

        $scope.passFail = function(obj){
            obj.pass_fail = obj.pass_fail ? false : true;
            $scope.saveObject(obj);
        };

        $scope.toggleVis = function(obj){
            obj.visible = obj.visible ? false : true;
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

// TODO:
// on editing a note to remove a tag
// the note should disappear from the tag even if it is being edited within that tag
// it should then appear on any other tag that is on the left nav
// if it does not have a tag to belong to, it should turn up only on tasks (v 1.0)
        var navMod = function(data){
            var navlist_check = _.pluck($scope.navlist, 'name');
            var msg_tag       = _.pluck(data.msg._tags, 'name');

            data.tags.map(function(tag) {
                var n = navlist_check.indexOf(tag.name);
                if(n === -1){ // if the tag does not exist, make it, and push in new message
                    console.log('pushing automatically', tag.name, tag._messages );
                    tag.report_index = $scope.navlist.length;
                    $scope.navlist.push(tag);
                    $scope.navlist[tag.report_index]._messages.push(data.msg._id);
                    return;
                } else {
                    if($scope.navlist[n].doctype==='tag'){
                        $scope.navlist[n]._messages = tag._messages;
                        // console.log('selected push', $scope.navlist[n]._messages);
                        // this actually doesn't need to be touched like this.
                    }
                }
            })
        }


        $scope.saveEdit = function(message){
            $scope.messageEditToggle = '';
            $http.put('/api/message/', message)
                .success(function(data){                 
                    
                 // add the new tags to the left nav
                    var idx = _.pluck($scope.messages[data.msg._subject.name], '_id').indexOf(message._id);
                    $scope.messages[data.msg._subject.name].splice(idx,1, data.msg);
                    
                    var task_idx = _.pluck($scope.navlist, '_id').indexOf(message._task);
                    $scope.navlist[task_idx]._messages.push(data.msg._id);

                    // edit the messages list of the left navigation.
                    navMod(data);

                    // map the nav list
                    // check if the old message had a tag the new message doesn't
                    // if so, get the index of that tag name in the nav list
                    // splice it out.

                    // the tag now exists on the nav list
                    // but it no longer exists in the message
                    // compare the message to the new message and find which tags are not matched -> -1

                    // if a tag does not exist, check the navlist id list for their id
                    // if it exists, splice the message from navlist_id_entry
                    // then check the navlist_id_entry length 
                    // if the entry length is 0, delete that id from the nav list.

                    var nav_id_list = _.pluck($scope.navlist, '_id');
                    // var cheat = $scope.navlist.length - 1;

                    // alright, let's try to clear dead entries from the left nav.
                    message._tags.map(function(msg_tag, i){

                        var new_tag_idx = data.msg._tags.indexOf(msg_tag);
                        console.log('tag index', new_tag_idx)
                        // set id to check
                        var id;
                        if(typeof msg_tag === 'object'){
                            id = msg_tag._id;
                        }
                        if(typeof msg_tag === 'string'){
                            id = msg_tag
                        }
                        
                        if(new_tag_idx === -1){
                            // that tag no longer exists in that message
                            // we now have a tag id that matches something in the nav.
                            console.log('this no longer exists on this message', id);

                            // find the nav entry matching the no-longer-there tag.
                            var match_in_nav = nav_id_list.indexOf(id);
                            console.log('match in nav - exists?', match_in_nav, id);

                            // in that nav entry, get the messages, and splice out the old message
                            console.log('does the tag have this message in its list still', message._id, $scope.navlist[match_in_nav]._messages);
                            function strFilter (value){
                                return value !== message._id;
                            }
                            var match_msg = $scope.navlist[match_in_nav]._messages.filter(strFilter);
                            console.log('is it dead', match_msg);

                            if(match_msg.length === 0){
                                console.log('there are no messages left');
                                $scope.navlist.splice(match_in_nav,1);
                                
                                // var pick = $scope.navlist.length;
                                // $scope.activate($scope.navlist[pick], pick);
                            }    

                        }
                    })
                });
        };

        $scope.postMessage = function(message, subject){
            postMessage(message, $scope.selected._id, $scope.selected._test, subject._id )
                .then(function(data){

                    $scope.newnote = '';

                    $scope.toggleNote(subject._id);
                    $scope.toggleNote();
                    
                    $scope.messages[data.msg._subject.name].push(data.msg);
                    $scope.selected._messages.push(data.msg._id);

                    navMod(data);
                });
        };

        $scope.saveFav = function(message){
            if($scope.selected.doctype === 'task'){
                message.fav_task = ( message.fav_task === true ) ? false : true ;
            }

            if($scope.selected.doctype === 'tag'){
                message.fav_tag = (message.fav_task === true ) ? false : true ;
            }

            $http.put('/api/message/fav', message);
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
                });
        };



    // COMMENTING =========================================
        // $scope.showComments = function(message){
        //     // if the comment toggle is the same as the current comment toggle
        //     // hide commenting
        //     // else show the new message's comments

        //     if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'show'){
        //         $scope.showCommentToggle = 'hide';
        //         $scope.commentMessage = '';
        //         return;
        //     }

        //     if($scope.commentMessage._id === message._id && $scope.showCommentToggle === 'hide'){
        //         $scope.showCommentToggle = 'show';
        //         return;
        //     }

        //     if ($scope.commentMessage._id !== message._id && $scope.showCommentToggle === 'hide'){
        //         $scope.showCommentToggle = 'show'; 
        //         $scope.commentMessage = message;
        //         return;
        //     }
            
        //     $scope.commentMessage = message;
        // };

        
        // $scope.addComment = function(comment){
        //     if(comment && comment.body.length > 0){
        //         reportFunctions.postComment(comment, $scope.commentMessage._id)
        //             .then(function(data){
        //                 comment.body = '';
        //                 var arr = _.pluck($scope.messages, '_id');
        //                 var msg_idx = _.indexOf(arr, $scope.commentMessage._id);
        //                 $scope.messages[msg_idx] = data;
        //             });
        //     }
        //     else {
        //         $scope.showCommentToggle = 'hide';
        //     }
        // };
    }]);
})();