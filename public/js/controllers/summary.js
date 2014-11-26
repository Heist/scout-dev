// summary.js
'use strict';

// SUMMARY CONTROLLER ===========================================================

angular.module('field_guide_controls')
    .controller('summary', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
	$scope.test = {};
    $scope.timeline = [];

    $http.get('/api/summary/'+$stateParams._id)
        .success(function(data){
            // // console.log('returned test information', data);

            $scope.tags = data.tags;
            $scope.test = data.test;
            $scope.tasks = data.tasks;

            // group messages by users
            $scope.messages = _.groupBy(data.messages, function(z){return z._subject.name;});
            
            // console.log('messages', $scope.messages, data.messages);
            
            $scope.activate($scope.test);

        });

    // TASK FUNCTIONS =====================================

    $scope.activate = function(obj, selectedIndex) {
        // passes the task to the global variable
        $scope.selectedIndex = selectedIndex;

        if(selectedIndex > -1){
            $state.go("summary.task");
        } else {
            $state.go("summary.test");
        }
     
        if(obj){
            $scope.selected = obj;
            // // console.log('task or test', obj._id);
        }
    };

    $scope.passFail = function(task){
        console.log('touched pass-fail', task);

        if(task.pass_fail){
            task.pass_fail = false;
        } else if (!task.fail){
            task.pass_fail = true;
        }

        $scope.saveTaskSummary(task);
        
    };

    $scope.show = function (msg_id) {
        // if a message's _id matches any value in the _messages list of .selected, return.
        // console.log($scope.selected);
        if($scope.selected._messages.indexOf(msg_id) >= 0){
            return true;
        }
    };

    $scope.showTest = function (msg_id) {
        // if a message's _id matches any value in the _messages list of .selected, return.
        if($scope.selectedTag){
            // console.log($scope.selectedTag);
            if($scope.selectedTag._messages.indexOf(msg_id) >= 0){
                return true;
            }
        }
    };

    // SAVE MESSAGE functions  ============================

    $scope.msgFilter = function(message){
        // FILTER that filters the message array
        // so messages display when their _task is the same as the current selected task
        // and they only display to their current subject

        if ((message._id === $scope.task._id)) {
            return true;
        }

        // // console.log('false', $scope.subject);
        return false;
    };

    $scope.saveFavTask = function(message){
        if(message.fav_task){
            message.fav_task = false;
        } else if (!message.fav_task){
            message.fav_task = true;
        }

        $http
            .put('/api/message/'+message._id, message)
            .success(function(err, msg){
                console.log('msg_success');
            });
    };

    $scope.saveFavTag = function(message){
        if(message.fav_tag){
            message.fav_tag = false;
        } else if (!message.fav_tag){
            message.fav_tag = true;
        }

        $http
            .put('/api/message/'+message._id, message)
            .success(function(err, msg){
                console.log('msg_success');
            });
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

        console.log('tags', tags);
        message.tags = tags;

        $http
            .put('/api/message/'+message._id, message)
            .success(function(msg, err){
                console.log('msg_success', msg, err);

                // we cheat and return everything en masse.
                $scope.tags = msg.tags;
            });
    };

    // TAG FUNCTIONS ======================================
    
    // TODO: on click "save"
    // pass the summary to the tag.summary
    // on click 'clear'
    // remove summary from tag


    $scope.selectTag = function (index){
        $scope.selectedTag = $scope.tags[index];
        $scope.selectedTag.index = index;
    };

    $scope.clearTagSummary = function(){
        $scope.selectedTag.summarized = false;
    };

    $scope.saveTagSummary = function(){
        var tag = $scope.tags[$scope.selectedTag.index];
        tag.summary = $scope.selectedTag.summary;
        tag.summarized = true;
        $scope.selectedTag.summarized = true;

        $http
            .put('/api/tag/'+ tag._id, tag)
            .success(function(err, tag){
                console.log('tag_success');
            });

    };

    // TASK FUNCTIONS =====================================
    $scope.saveTaskSummary = function(task){
        $http
            .put('/api/task/'+ task._id, task)
            .success(function(err, task){
                console.log('task_success', task);
            });
    };

    //  TEST FUNCTIONS ====================================

    $scope.saveTestSummary = function(test){
        $http
            .put('/api/test/'+ test._id, test)
            .success(function(err, test){
                console.log('test_success');
            });
    };

    $scope.completeSummary = function(){
        // post all the summary changes to the test
        // post summary changes to the tags
        // post fav'd statuses to relevant messages

        // TODO: for each task push each of their messages to $scope.messages
        // no good in the new format, messages need to be their own array
        // displayed for both task and tag.

        var msg_arr = [];
    
        $scope.messages = _.map($scope.messages, function(val, key){ return val; });
    
        // mixpanel.track('Summary complete', {});

        console.log('messages', $scope.messages);

        var url = '/api/summary/'+ $stateParams._id;
        var data_out = {test: $scope.test, tags:$scope.tags, tasks:$scope.tasks, messages:$scope.messages[0]} ;
        
        // console.log(data_out);
        
        $http.put(url, data_out)
            .success(function(data){
                // console.log(data);

                $location.path('/overview');
            })
            .error(function(data){
                // // console.log('er;ror', data);
            });        

    };
   
}]);
