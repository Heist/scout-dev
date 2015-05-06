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
        console.log('loadData', loadData.data);

        var makeNavList = function(data){
            return _.groupBy(data, function(obj){ return obj.doctype; }) ;
        }

        // Set the messages from the summary tag to the test object
        var summaryObject = function(data){
            // Find the test in the left nav order
            var testIdx = _.indexOf(_.pluck(data, 'doctype'), 'test');

            // get the tag object for #summary
            var summaryItem = _.filter(loadData.data.list, function(n){ 
                if(n.name){
                    n.name = n.name.toLowerCase();
                    return n.name !== 'Summary';
                } else {
                    return
                }
            })[0];
            
            console.log('summary object', summaryItem, data);

            // set the message list for the test to being those messages, and pass the list generally
            var summaryMsgList = data[testIdx]._messages = (summaryItem && summaryItem._messages) ? summaryItem._messages : [];
            var summaryTagIdCheck = (summaryItem) ? summaryItem._id : 'undefined';

            return { summaryMsgList: summaryMsgList, summaryTagIdCheck: summaryTagIdCheck, freshList : data };
        }

        var summaryList = summaryObject(loadData.data.list);
        console.log(summaryList);

        var tagCheck = summaryList.summaryTagIdCheck;
        // organise the returned information to pass back a good set for raw data
        var hasMsg  = _.filter(summaryList.freshList, function(n){ return n._messages.length > 0 })
        var noSum   = _.filter(hasMsg, function(n){ if(n.name){ n.name = n.name.toLowerCase(); return n.name !== 'Summary'; } else { return; }});
        var tagList = _.sortBy(noSum, function(obj){ return obj.report_index; });

        $scope.testname = loadData.data.name;
        $scope.rawList = tagList;
        
        $scope.$watch('rawList', function() {
            // group navlist by doctype when rawList changes.
            $scope.navlist =  makeNavList($scope.rawList);
        });
        
        $scope.selected = $scope.rawList[_.indexOf(_.pluck($scope.rawList, 'doctype'), 'test')];

        // GROUP MESSAGES BY USERS ==================================
        $scope.messages = _.groupBy(loadData.data.messages, function(z){ return z._subject.name ? z._subject.name : 'report comment'; });

        var deleteMessage = function(message){
            // requires a message with subject name and _id
            // message splicer to remove messages from $scope.messages

            // take the message out of the messages list entirely
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
            // when we're returned new data, check the tags for messages and filter ones that have none
            // set the new list of tags to the bottom of the navlist
            var clear = $scope.rawList.filter(function(r){ return r.doctype !== 'tag'});
            
            var hasMsg  = _.filter(data.tags, function(n){ return n._messages.length > 0 })
            var noSum   = _.filter(hasMsg, function(n){ if(n.name){ n.name = n.name.toLowerCase(); return n.name !== 'Summary'; } else { return; }});
            var sumMsg  = _.filter(hasMsg, function(n){ if(n.name){ n.name = n.name.toLowerCase(); return n.name !== 'Summary'; } else { return; }});
            var tagList = _.sortBy(noSum, function(obj){ return obj.report_index; });
            var testIdx  = _.indexOf(_.pluck($scope.rawList, 'doctype'), 'test');

            $scope.rawList = clear.concat(tagList);

            if(sumMsg && sumMsg.length > 0){
                $scope.rawlist[testIdx]._messages = sumMsg._messages;
            }

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
            $scope.rawList = reportFunctions.moveTask($scope.rawList, old_index, new_index);
            $http.put('/api/summary/'+ $stateParams._id, $scope.rawList);           
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
                        $scope.rawList = newList;
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

        $scope.saveEdit = function(original){
            $scope.messageEditToggle = '';

            var output = original;

            if(output._tags.indexOf(summaryList.summaryTagIdCheck) !== -1){
                console.log('this is a summary message', output);
                output.body = output.body + ' #summary';
            }
            
            $http.put('/api/message/', output)
                .success(function(data, err){
                    console.log(data);

                    if($scope.selected.doctype === 'test'){
                        // if this is a test, the message needs to be marked as a Summary message
                        // this is in case of re-editing after an original edit
                        data.msg._tags.push(tagCheck);
                    }

                    // splice the new message over its old self in the messages list
                    var idx = _.pluck($scope.messages[output._subject.name], '_id').indexOf(output._id);
                    $scope.messages[output._subject.name].splice(idx,1, data.msg);
                    
                    // now find the original._id on selected item in left nav and replace with new _id
                    var x = $scope.selected._messages.indexOf(output._id);
                    if( x !== -1){
                            $scope.selected._messages.splice(x, 1, data.msg._id);
                        }
                    if($scope.selected._messages.length === 0){
                        $scope.selected._messages.splice(0, 1, data.msg._id);
                    }

                    addTagsToLeftNav(data);
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

            $http.put('/api/summary/'+ $stateParams._id, 
                { navlist  : $scope.navlist, 
                  messages : $scope.messages[0]
                });
        };

    }]);
})();