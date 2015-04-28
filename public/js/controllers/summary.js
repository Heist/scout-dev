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

        // Activate a step on the left nav =====================
        $scope.activate = function(obj) {
            // passes an object from left nav to the global selection variable
            // reset all previous reliant variables, there are a lot!
            $scope.selected = '';

            // reset all input boxes
            $scope.inputNote = '';
            $scope.messageEditToggle = '';
            $scope.showCommentToggle = 'hide';
            $scope.commentMessage = '';

            $scope.selected = obj || $scope.selected;
        };

    // SET VIEW VARIABLES FROM LOAD DATA ==================
        var makeNavList = function(data){
            return _.toArray( _.groupBy(data, function(obj){ return obj.doctype; }) ).sort();
        }

        console.log(loadData.data);

           // Find the test in the left nav order
        

        $scope.testname = loadData.data.name;

        $scope.rawList = loadData.data.list;

        $scope.$watch('rawlist', function() {
            // group navlist by doctype when rawlist changes.
            $scope.navlist = makeNavList($scope.rawList);
        });
        
        $scope.activate($scope.rawList[_.indexOf(_.pluck($scope.rawList, 'doctype'), 'test')]);

        // GROUP MESSAGES BY USERS ==================================
        $scope.messages = _.groupBy(loadData.data.messages, function(z){ return z._subject.name ? z._subject.name : 'report comment'; });

        // $scope.activate($scope.rawList[]);

        var deleteMessage = function(message){
            // requires a message with subject name and _id
            // message splicer to remove messages from $scope.messages

            // $scope.messages[message._subject.name] \\ what's this?

            var idx = _.pluck($scope.messages[message._subject.name], '_id').indexOf(message._id);
            $scope.messages[message._subject.name].splice(idx,1);

            // message splicer to remove message from all navlist entries
            
            $scope.rawList.map(function(obj, i){
                if(obj.doctype !== 'test'){
                    var n = obj._messages.indexOf(message._id);
                    if( n !== -1){
                        obj._messages.splice(n, 1);
                    }
                    if(obj._messages.length === 0){
                        $scope.rawList.splice(i, 1);
                    }
                }
            })
        }

        
        var addTagsToLeftNav = function(data){
            var navlist_check = _.pluck($scope.rawList, 'name');
            var msg_tag       = _.pluck(data.msg._tags, 'name');

            console.log('add tags', navlist_check);
            
            data.tags.map(function(tag) {
                var n = navlist_check.indexOf(tag.name);
                if(n === -1){ // if the tag does not exist, make it, and push in new message
                    
                    tag.report_index = $scope.rawList.length;
                    $scope.rawList.push(tag);
                    $scope.rawList[tag.report_index]._messages.push(data.msg._id);
                    return;
                } else {
                    if($scope.rawList[n].doctype==='tag'){
                        $scope.rawList[n]._messages = tag._messages;
                        
                    }
                }
            })
        }

        var pullDeadTags = function(newmessage, original, navlist){
            // clear dead entries from the left nav when we edit a message.            
            var nav_id_list = _.pluck(navlist, '_id');

            // if we have an edited message returned....
            original._tags.map(function(msg_tag, i){

                var new_tag_idx = newmessage.msg._tags.indexOf(msg_tag);        // does the new message have the old tag?
                var id = (typeof msg_tag === 'object') ? msg_tag._id : msg_tag; // set id to check
                
                if(new_tag_idx === -1){                         // that tag no longer exists in that message
                    var match_in_nav = nav_id_list.indexOf(id); // find the nav entry matching the no-longer-there tag.
                    

                    var match_msg = navlist[match_in_nav]._messages
                                    .filter(function(value){
                                        return value !== original._id;           // filter matching nav entry for old messages
                                    });
                    var local_msg = _.pluck($scope.messages[original._subject.name]._messages)

                    if(match_msg.length === 0){          // no messages left? Kill the tag and select the next one.
                        navlist.splice(match_in_nav,1);  // Kill tag in the nav
                        $scope.activate($scope.rawlist[match_in_nav]); // select new one.
                        
                    }    

                }
            })
        }
        
        var constructNewListOnMessageEdit = function(message, original){
            // data.msg._subject.name << the name of the subject to edit, needlessly complex
            // what we want is to find the appropriate

             // add the new tags to the left nav
                        // var idx = _.pluck($scope.messages[message._subject.name], '_id').indexOf(original._id);
                        // $scope.messages[message._subject.name].splice(idx,1, message);
                        
                        // // var task_idx = _.pluck($scope.rawList, '_id').indexOf(original._task);
                        // // $scope.rawList[task_idx]._messages.push(data.msg._id);

                        // addTagsToLeftNav(data); // add new left nav tags to new tags
                        // pullDeadTags(data, message, $scope.navlist); // did we kill a tag? Kill a tag.
        }

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

        $scope.shareReport = false;

        $scope.shareReportModalToggle = function(){
            if($scope.shareReport || $scope.shareReport === true  ){
                $scope.shareReport = false; 
                return;
            }
            if(!$scope.shareReport || $scope.shareReport === false ){
                $scope.shareReport = true;
                return;
            }
        };

    // MESSAGE ASSIGNMENT AND FILTERING =============================
        $scope.msgFilter = function(message){
            console.log($scope.selected._messages);
            // Display messages that belong to the current selected item.
            return ($scope.selected._messages.indexOf(message._id) !== -1) ? true : false;
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
                    $location.path('/report/'+$stateParams._id);
                });
        };


        // MOVE STEPS =========================================

        $scope.moveTask = function(old_index, new_index){   
            $scope.rawlist = reportFunctions.moveTask($scope.rawlist, old_index, new_index);
            $http.put('/api/summary/'+ $stateParams._id, $scope.rawlist);           
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
        $scope.deleteMessage = function(message){
            $http.delete('/api/message/'+message._id)
                .success(function(data){
                    if(data === '1'){
                        var newList = deleteMessage(message);
                        $scope.rawlist = newList;
                    }
                })
        }

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
            $http.put('/api/message/', message)
                .success(function(data){
                    console.log(data,' (probably data.msg is what we want)');

                    addTagsToLeftNav(data);
                    pullDeadTags;
                    
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

                    addTagsToLeftNav(data);
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

    }]);
})();