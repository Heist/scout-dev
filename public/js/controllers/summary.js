// summary.js
(function() {
    'use strict';

    // SUMMARY CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('summary', 
            [ 'loadData', 'reportFunctions', 'postMessage', '$scope','$rootScope','$http','$location','$stateParams','$state','$sanitize', '$q', '$timeout',
        function(loadData, reportFunctions, postMessage, $scope,  $rootScope,  $http,  $location,  $stateParams,  $state,  $sanitize, $q, $timeout){
        
        // console.log('report data from server', loadData.data);

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


            // if the selected _.messages has none of the messages in a given user in it
            // hide the user


            // messages has a _tags set on each
            // check the _tag against _selected's _id?
            
        };

        $scope.messageFilter = function(selected, user){
                var cycle = _.filter(user, function(n){
                    if(selected._messages.indexOf(n._id) !== -1){
                        return  n
                    }
                });
                if(cycle.length !== 0){
                    return true;
                } else { 
                    return false;
                }
        }

    // SET VIEW VARIABLES FROM LOAD DATA ==================
        

        var makeNavList = function(data){
            return _.groupBy(data, function(obj){ return obj.doctype; }) ;
        }

        var makeMessageGroups = function(data){
            return _.groupBy(data, function(z){ return z._subject.name ? z._subject.name : 'report comment'; });
        }

        $scope.summaryItem =  _.filter(loadData.data.list, function(n){
                if(n.name){
                    var nameCheck = n.name.toLowerCase();
                    return nameCheck === 'summary';
                } else {
                    return [];
                }
            })[0];

        // Set the messages from the summary tag to the test object
        $scope.summaryList = _.filter(loadData.data.messages, function(n){
                // (for each message in loadData, return that message if index of summary._id is not -1)
                if (n._tags.indexOf($scope.summaryItem._id) !== -1){
                    return n
                } else {
                    return ; 
                }
            });

        var tagCheck = $scope.summaryItem._id;
        
        // organise the returned information to pass back a good set for raw data
        var hasMsg  = _.filter(loadData.data.list, function(n){ '' 
                            var reply;
                            if(n.doctype === 'test'){ return n.doctype === 'test' }
                            else {
                                return n._messages.length > 0 
                            }
                        })

        var noSum   = _.filter(hasMsg, function(n){ if(n.name){ var nameCheck = n.name.toLowerCase(); return nameCheck !== 'summary'; } else { return; }});
        var navList = _.sortBy(noSum, function(obj){ return obj.report_index; });

        $scope.testname = loadData.data.name;
        $scope.rawList = navList;
        
        $scope.$watch('rawList', function() {
            // group navlist by doctype when rawList changes.
            $scope.navlist =  makeNavList($scope.rawList);
            // console.log($scope.navlist);
        });
        
        $scope.selected = $scope.rawList[_.indexOf(_.pluck($scope.rawList, 'doctype'), 'test')];
        $scope.messages = makeMessageGroups(loadData.data.messages);

        // provides the variable to display the report from the test object on the right hand side of the screen
        $scope.displayReport = _.filter(loadData.data.list, function(n){
            return n.doctype === 'test';
        })[0];
        

        // GROUP MESSAGES BY USERS ==================================
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
            // console.log(data);
            var clear = $scope.rawList.filter(function(r){ return r.doctype !== 'tag'});
            
            // console.log('left nav list to concatenate to', clear);

            var hasMsg  = _.filter(data.tags, function(n){ return n._messages.length > 0 })
            var noSum   = _.filter(hasMsg, function(n){ if(n.name){ var nameCheck = n.name.toLowerCase(); return nameCheck !== 'summary'; } else { return; }});
            var sumMsg  = _.filter(hasMsg, function(n){ if(n.name){ var nameCheck = n.name.toLowerCase(); return nameCheck !== 'summary'; } else { return; }});
            var tagList = _.sortBy(noSum, function(obj){ return obj.report_index; });
            var testIdx  = _.indexOf(_.pluck($scope.rawList, 'doctype'), 'test');

            $scope.rawList = clear.concat(tagList);

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

        // removes the body scroll on summary page
        var bodyScroll = angular.element(document.querySelector('body'));
        bodyScroll.addClass('overflow-hidden');

        $scope.shareReport = false;

        $scope.shareReportModalToggle = function(){
            if($scope.shareReport || $scope.shareReport === true  ){
                $scope.shareReport = false; 
                return;
            }
            if(!$scope.shareReport || $scope.shareReport === false ){
                $scope.shareReport = true;
                var date = new Date();
            
                var intercom = {
                    created_at : date.getHours()+':'+date.getMinutes()
                };
                
                Intercom('trackEvent', 'shared-report-button-clicked', intercom );
                Intercom('update');        
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
             
            if(obj.doctype === 'test'){
                var date = new Date();

                var intercom = {
                    created_at : date.getHours()+':'+date.getMinutes(),
                    summary    : (obj.summary)    ? 'true' : 'false',
                    next_steps : (obj.next_steps) ? 'true' : 'false'
                };

                Intercom('trackEvent', 'saved-test-report', intercom );
                Intercom('update');
            }

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
            $timeout(function() {$('textarea#messageInput').focus() }, 10);
        };

        $scope.toggleNote = function(user){
            // Opens up a new message from a user who previously participated in a test.
            $scope.messageEditToggle = '';
            $scope.inputNote = user;
        };

        $scope.saveEdit = function(original, list){
            
            $scope.messageEditToggle = '';
            var dataOut = {msg: original, hasSummary: $scope.summaryItem._id}

            $http.put('/api/message/', dataOut)
                .success(function(data, err){
                    // console.log('data received', data);
                    if($scope.selected.doctype === 'test'){
                        // if this is a test, the message needs to be marked as a Summary message
                        // this is in case of re-editing after an original edit
                        data.msg._tags.push(tagCheck);
                    }

                    // splice the new message over its old self in the messages list
                    var idx = _.pluck($scope.messages[original._subject.name], '_id').indexOf(original._id);
                    $scope.messages[original._subject.name].splice(idx,1, data.msg);

                    // now find the original._id on raw list item replace with new _id
                    // console.log($scope.rawList);

                    var objList    = _.filter($scope.rawList, function(n){ if(n.doctype === 'tag' || n.doctype === 'task' ) {return n;} else {return;}})
                    var test       = _.filter($scope.rawList, function(n){ return n.doctype === 'test'; });
                    
                    var nonTestObj = _.map(objList, function(n){
                        // // console.log(n.doctype);
                        var x = n._messages.indexOf(original._id);
                        // map each test item and then return
                        if( x !== -1){
                            // if that message exists on the original object, add it
                            n._messages.splice(x, 1, data.msg._id);
                          return n;
                        }
                        if(n._messages.length === 0){
                            // if that message does not exist on the original object, add it
                            n._messages.splice(0, 1, data.msg._id);
                          return n;
                        } else {
                            return n;
                        }
                    })

                    // // console.log('data, tags are returning undefined', data);
                    if(data.msg._tags.indexOf($scope.summaryItem._id) !== -1){
                        // if it's a summary message, add it back into the summary message filter list
                        $scope.summaryItem._messages.splice($scope.summaryItem._messages.indexOf(original._id), 1, data.msg._id);
                    }

                    // // console.log(test);

                    $scope.rawList = test.concat(nonTestObj);

                    // Summary messages is a list of messages that match the summary._id
                    // // console.log(nonTestObj);
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