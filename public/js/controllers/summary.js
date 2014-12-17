// summary.js
'use strict';

// SUMMARY CONTROLLER ===========================================================

angular.module('field_guide_controls')
    .controller('summary', ['$scope','$rootScope','$http','$location','$stateParams','$state','$sanitize', 
                    function($scope,  $rootScope,  $http,  $location,  $stateParams,  $state,  $sanitize){
	$scope.test = {};
    $scope.timeline = [];

    $http.get('/api/summary/'+$stateParams._id)
        .success(function(data){
            console.log('returned test information', data);

            $scope.leftNavList = [];
            
            var sort = _.sortBy(data.navlist, function(obj){
                                return(obj.report_index);
                            });

            _.each(sort, function(obj){
                console.log(obj.name); 
                $scope.leftNavList.push(obj);
            });
            
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

    // COMMENTING =========================================
    $scope.showComments = function(message){
        if( !$scope.showCommentToggle){  $scope.showCommentToggle = true; }

        $scope.commentMessage = message;
        console.log('comments on message', message);
    };

    $scope.addComment = function(comment){
        var dataOut = {
            comment: {body : comment.body},
            message: $scope.commentMessage._id
        };

        console.log($scope.messages);

        $http
            .post('/api/comment/', dataOut)
            .success(function(data){
                console.log('new comment', data);
                comment.body = '';
                
                var arr = _.pluck($scope.messages, '_id');
                var msg_idx = _.indexOf(arr, $scope.commentMessage._id);
                
                $scope.messages[msg_idx] = data.msg;
            });

    };

    // MOVE STEPS =========================================

    $scope.moveTask = function(old_index, new_index){
        console.log('touched moveTask', old_index, new_index);
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
        console.log('nav', $scope.leftNavList);

        $scope.saveSummary();

    };


    // SAVE FUNCTIONS =====================================
    $scope.saveObject = function(obj){
        console.log('saving', obj);

        var url, data;

        if(obj.doctype === 'test'){
            console.log('put test');
            url = 'summary/test/'+ obj._id;
            data = obj;
        }
        if(obj.doctype === 'task'){
            url = 'summary/task/'+ obj._id;
            data = obj;
        }
        if(obj.doctype === 'tag'){
            url = 'summary/tag/'+ obj._id;
            data = obj;
            obj.summarized = true;
        }
        $http
            .put('/api/'+url, data)
            .success(function(doc){
                console.log('summary_success', doc);
            });
    };

    $scope.activate = function(obj, selectedIndex) {
        // passes the task to the global variable
        console.log('activated', obj.name);

        $scope.selectedIndex = selectedIndex;
        if(obj){ $scope.selected = obj; }
    };

    $scope.passFail = function(obj){
        console.log('touched pass-fail', obj);

        if(obj.pass_fail){ obj.pass_fail = false; }
        else if (!obj.fail){ obj.pass_fail = true; }

        $scope.saveObject(obj);
    };

    $scope.show = function (msg_id) {
        // if a message's _id matches any value in the _messages list of .selected, return.
        if($scope.selected._messages && $scope.selected._messages.indexOf(msg_id) >= 0){
            return true;
        }
    };

    $scope.toggleVis = function(obj){
        console.log('toggle me', obj);

        if (obj.visible){ obj.visible = false; $scope.saveObject(obj); return;}
        if (!obj.visible){ obj.visible = true; $scope.saveObject(obj); return;}

    };

    $scope.saveFav = function(message){
        console.log('touched message fav', message);
        console.log('what kind of object is this?', $scope.selected.doctype);
        
        if($scope.selected.doctype === 'task'){
            if(message.fav_task){ message.fav_task = false; }
            else if (!message.fav_task){ message.fav_task = true; }
        }

        if($scope.selected.doctype === 'tag'){
            if(message.fav_tag){ message.fav_tag = false; } 
            else if (!message.fav_tag){ message.fav_tag = true;}
        }

        $http
            .put('/api/summary/message/'+message._id, message)
            .success(function(data){
                console.log('msg_success', data);
            });
    };

    // MESSAGE FUNCTIONS ==================================

    $scope.msgFilter = function(message){
        // Display messages that belong to the current selected item.
        if (message._id === $scope.selected._id) { return true; }
        else { return false; }
    };

    $scope.editMessage = function(message, index){
        $scope.messageEditToggle = message._id;
    };

    $scope.saveEdit = function(message){
        $scope.messageEditToggle = false;

        console.log(message);

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
        console.log('tags', message.tags);

        $http
            .put('/api/message/'+message._id, message)
            .success(function(msg, err){
                console.log('msg_success', msg, err);
                var new_list =_.groupBy(msg.messages, function(z){return z._subject.name;});
                console.log(new_list);
                
                $scope.leftNavList = msg.nav_list;
                $scope.messages = new_list;
            });
    };

    $scope.toggleNote = function(user){
        if (!$scope.inputNote) {$scope.inputNote = true;}
        // if ($scope.inputNote) {$scope.inputNote = false;}
    };

    $scope.postMessage = function(message, subject){
        // Make a note object, which becomes a message on the back end.
        var note = {};

        note.body = message;
        note.tags = [];
        note.created = new Date();
         
        note._task = $scope.selected._id;
        note._test = $scope.selected._test;
        note._subject = subject._id;

        message = '';
        $scope.newnote = '';
        
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

        console.log(note, subject._id);
        
        var url = '/api/summary/message/';
        var data_out = note;

        $http
            .post(url, data_out)
            .success(function(data){
                $scope.toggleNote();
                console.log(data);

                $scope.messages[data.msg._subject.name].push(data.msg);
                $scope.selected._messages.push(data.msg._id);

                _.each(data.tags, function(tag){
                    tag.report_index = $scope.leftNavList.length;
                    $scope.leftNavList.push(tag);
                });
            });
    };

// SAVE SUMMARY ==========================================
    $scope.saveSummary = function(){
        // post all the summary changes to the test
        // post fav'd statuses to relevant messages

        $scope.messages = _.map($scope.messages, function(val, key){ return val; });

        // mixpanel.track('Summary complete', {});

        console.log('messages', $scope.messages);

        var url = '/api/summary/'+ $stateParams._id;
        var data_out = {navlist: $scope.leftNavList, messages:$scope.messages[0]} ;
        
        $http.put(url, data_out)
            .success(function(data, msg){
                console.log('saved summary', data, msg);
                // $location.path('/report/'+ $stateParams._id);
            })
            .error(function(data){
                console.log('error', data);
            });        

    };

// PREVIEW REPORT
    $scope.reportPreview = function(){
        $location.path('/report/'+ $stateParams._id);
    };
}]);