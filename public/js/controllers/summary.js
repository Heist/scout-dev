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

        // var navMod = function(info, old){
        //     var indexCheck = _.pluck($scope.navlist, 'name'); // get a list of existing tags
            
        //     _.each(info.tags, function(tag){ // for each tag in the returned data
        //         var idx = indexCheck.indexOf(tag.name); // figure out if the tag already exists

        //         if(idx === -1){ // if the tag does not exist, make it, and push in new messages
        //             tag.report_index = $scope.navlist.length;
        //             $scope.navlist.push(tag);
        //             $scope.navlist[tag.report_index]._messages.push(info.msg._id);
        //         } else { // if the tag does exist, push in new messages
        //             var check = (old) ? $scope.navlist[idx]._messages.indexOf(old._id) : -1 ;
        //             console.log('check', check);
        //             if(check === -1){ // if the message is new...
        //                 $scope.navlist[idx]._messages.push(info.msg._id);
        //             } else {
        //                 $scope.navlist[idx]._messages.splice(check, 1, info.msg._id);
        //             }
        //         }
        //     });
        // };

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


        // MOVE STEPS =========================================

        $scope.msgFilter = function(message){
            // Display messages that belong to the current selected item.
            return (message._id === $scope.selected._id) ? true : false;
        };

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

        $scope.saveEdit = function(message){
            $scope.messageEditToggle = '';
            $http.put('/api/message/', message)
                .success(function(data){                 
                    
                 // add the new tags to the left nav
                    console.log('tags', data.tags);
                    console.log('selected messages 1', $scope.selected._messages, message._id);
                    // navMod(data, message);

                    var indexCheck = _.pluck($scope.navlist, 'name'); // get a list of existing tags
            
                    data.tags.map(function(tag) {
                        var idx = indexCheck.indexOf(tag.name); // figure out if the tag already exists
                        console.log('tag index check', idx );
                        if(idx === -1){ // if the tag does not exist, make it, and push in new message
                            console.log('pushing automatically', tag.name );
                            tag.report_index = $scope.navlist.length;
                            $scope.navlist.push(tag);
                            $scope.navlist[tag.report_index]._messages.push(data.msg._id);
                            return;
                        } else {
                            // the tag exists, it is tag.name
                            // does the current navlist item have the old message in its message list?
                            var old_message_index = tag._messages.indexOf(message._id);
                            console.log('old_message_index', old_message_index, message._id);

                            if(old_message_index !== -1){ // message exists splice the new message in
                                console.log('splicing');
                                $scope.navlist[idx]._messages.splice(old_message_index, 1, data.msg._id);
                            } else { 
                                // the current navlist item does not have the old message. 
                                // Does it qualify for the new one?
                                // does the current tag exist on the current message?
                                var tag_match_index = message._tags.indexOf(tag._id);
                                console.log('no old message', tag_match_index);
                                if(tag_match_index !== -1){
                                    console.log('pushing');
                                    $scope.navlist[idx]._messages.push(data.msg._id);
                                }
                            }
                        }
                    })

                    // for each tag that is on the new object
                    // check to see if that tag is already in the navigation list
                    // if it is not, add it to the navigation list
                    // and push a message to it

                    // if it is in the list
                    // check to see if this message is already in the list
                    // if the message is already in the list, splice it in

                    // if the message is not already in the list, and the tag is already in the list

                    var checkthis = _.pluck($scope.navlist, '_messages');
                    console.log('selected messages 2', data.msg._id, message._id, checkthis);


                        // else { // if the tag does exist...
                        //     // is this an edited note? Does it already exist in the messages array?
                        //     var check = $scope.navlist[idx]._messages.indexOf(message._id);
                        //     console.log('checking new index', check);

                        //     if(check !== -1){ // if the message is not new, splice it                                // splice the new message id over the old one.
                        //         $scope.navlist[idx]._messages.splice(check, 1, data.msg._id);
                        //     } else {
                        //         if(tag._id === $scope.navlist[idx]._id){
                        //             // does the tag match a message tag?
                        //             // push the new message id to the object's message list
                        //             $scope.navlist[idx]._messages.push(data.msg._id);
                        //         }
                        //     }
                // remove the previous message and insert the new one to the selected tag's message array
           
                    // this needs to splice the new message into the actual message array
                    // over the old message's position.

                    // var newTimeline = $scope.messages.map(function (item) {
                    //   if (item._id === message._id) { return data.msg; }
                    //   return item
                    // })

                    // $scope.messages = newTimeline;

                    // var item2 = $scope.messages[data.msg._subject.name].filter(function (item) {
                    //       return item._id === message._id
                    //     })[0];
                    
                    // console.log('item2', item2);

                    // $scope.messages[data.msg._subject.name].splice(item2, 1, data.msg);
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

                    // navMod(data);
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