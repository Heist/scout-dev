// summary.js
(function() {
    'use strict';

    // SUMMARY CONTROLLER ===========================================================

    angular.module('field_guide_controls')
        .controller('summary', ['$scope','$rootScope','$http','$location','$stateParams','$state','$sanitize',
                        function($scope,  $rootScope,  $http,  $location,  $stateParams,  $state,  $sanitize){
        $scope.test = {};
        $scope.timeline = [];
        $scope.commentMessage = '';

        $scope.reportLink = $location.protocol()+'://'+$location.host()+':8080/p/report/'+$stateParams.test_id;
        $scope.showReportLink = false;
        $scope.toggleReportLink =  function(){
            if(!$scope.showReportLink){ $scope.showReportLink=true; }
            else{ $scope.showReportLink = false; }
        };

        $http.get('/api/summary/'+$stateParams._id)
            .success(function(data){
                $scope.leftNavList = [];
                $scope.testname = data.test;
                
                var sort = _.sortBy(data.navlist, function(obj){
                                    return(obj.report_index);
                                });

                _.each(sort, function(obj){ $scope.leftNavList.push(obj); });
                
                // group messages by users
                $scope.messages = _.groupBy(data.messages, 
                    function(z){
                        if(z._subject.name){
                            return z._subject.name;
                        } else {
                            return 'report comment';
                        }
                    });

                $scope.activate($scope.leftNavList[0]);
            });

    // NAVIGATION =============================================

        $scope.reportPreview = function(){
            $location.path('/report/'+ $stateParams._id);
        };

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

            if(obj){
                $scope.selected = obj;
            }
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
                var dataOut = {
                    comment: {body : comment.body}
                };
                
                $http
                    .post('/api/comment/'+$scope.commentMessage._id, dataOut)
                    .success(function(data){
                        comment.body = '';

                        var name = data.msg._subject.name;
                        var arr = _.pluck($scope.messages[name], '_id');
                        var msg_idx = _.indexOf(arr, $scope.commentMessage._id);

                        $scope.messages[name][msg_idx]._comments.push(data.comment);
                    });
            } else {
                $scope.showCommentToggle = 'hide';   
            }
        };

        // MOVE STEPS =========================================

        $scope.moveTask = function(old_index, new_index){
            // TODO: This almost certainly has a reordering bug in it.
            // Abstract to a directive: the NavList directive

            new_index = old_index + new_index;

            while (old_index < 0) {
                old_index += this.length;
            }
            while (new_index < 0) {
                new_index += this.length;
            }
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            
            $scope.leftNavList.splice(new_index, 0, $scope.leftNavList.splice(old_index, 1)[0]);

            var obj_count=0;
            
            // set the stored index of the task properly
            _.each($scope.leftNavList, function(obj){
                obj.report_index = obj_count;
                obj_count++;
            });

            var dataOut = $scope.leftNavList;

            var nav = _.pluck($scope.leftNavList, 'name');
            
            $scope.saveSummary();
        };


        // OBJECT FUNCTIONS =====================================
        $scope.saveObject = function(obj){
            var url, data;

            url = 'summary/'+ $stateParams._id +'/navListUpdates/';
            data = [obj];

            $http
                .put('/api/'+url, data)
                .success(function(doc){
                    console.log(doc);
                });
        };

        $scope.passFail = function(obj){
            if(obj.pass_fail){ obj.pass_fail = false; }
            else if (!obj.fail){ obj.pass_fail = true; }

            $scope.saveObject(obj);
        };

        $scope.toggleVis = function(obj){
            console.log('viz toggled');
            if (obj.visible){ obj.visible = false; $scope.saveObject(obj); return;}
            if (!obj.visible){ obj.visible = true; $scope.saveObject(obj); return;}
        };


        // MESSAGE FUNCTIONS ==================================

        $scope.msgFilter = function(message){
            // Display messages that belong to the current selected item.
            if (message._id === $scope.selected._id) { return true; }
            else { return false; }
        };

        $scope.editMessage = function(message, index){
            // clear this on blur to block weird toggle bug
            $scope.inputNote = '';
            $scope.messageEditToggle = message._id;
        };

        $scope.saveEdit = function(message){
            $scope.messageEditToggle = '';

            var tags = [];
            var hashCatch = new RegExp(/\S*#\S+/gi);
            var hashPull = new RegExp(/#/gi);
            var tagIt = message.body.match(hashCatch);
            
            if (tagIt){
                _.each(tagIt, function(tag){
                    var msg = tag.replace(hashPull,'');
                    tags.push(msg);
                });
            }
            
            message.tags = tags;

            $http
                .put('/api/message/'+message._id, message)
                .success(function(msg, err){

                    var new_list =_.groupBy(msg.messages, function(z){return z._subject.name;});

                    $scope.leftNavList = msg.nav_list;
                    $scope.messages = new_list;
                });
        };

        $scope.toggleNote = function(user){
            // Opens up a new message from a user who previously participated in a test.
            $scope.messageEditToggle = '';
            $scope.inputNote = user;
        };

        $scope.saveFav = function(message){
            
            if($scope.selected.doctype === 'task'){
                if(message.fav_task){ message.fav_task = false; }
                else if (!message.fav_task){ message.fav_task = true; }
            }

            if($scope.selected.doctype === 'tag'){
                if(message.fav_tag){ message.fav_tag = false; } 
                else if (!message.fav_tag){ message.fav_tag = true;}
            }

            $http
                .put('/api/summary/message/'+message._id, message);
        };

        $scope.postMessage = function(message, subject){
            // Make a note object, which becomes a message on the back end.

            //TODO make the note never be blank.
            var note = {};

            note.body = message;
            note.tags = [];
            note.created = new Date();
             
            note._task = $scope.selected._id;
            note._test = $scope.selected._test;
            note._subject = subject._id;

            message = '';
            $scope.newnote = '';
            $scope.toggleNote(subject._id);

            // TODO: this will catch things on both sides of the hash. 
            // if message has # with no space, post that to message.tags

            var hashCatch = new RegExp(/\S*#\S+/gi);
            var hashPull = new RegExp(/#/gi);
            var tagIt = note.body.match(hashCatch);
            
            if (tagIt){
                for (var i=0; i < tagIt.length; ++i) {
                    var msg = tagIt[i].replace(hashPull,'');
                    note.tags.push(msg);
                }
            }
            
            var url = '/api/summary/message/';
            var data_out = note;

            $http
                .post(url, data_out)
                .success(function(data){
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

            var url = '/api/summary/'+ $stateParams._id;
            var data_out = {navlist: $scope.leftNavList, messages:$scope.messages[0]} ;
            
            $http
                .put(url, data_out);     

        };
    }]);
})();