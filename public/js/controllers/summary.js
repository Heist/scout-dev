// summary.js
'use strict';

// SUMMARY CONTROLLER ===========================================================

angular.module('field_guide_controls')
    .controller('summary', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
	$scope.test = {};
    $scope.timeline = [];

    $http.get('/api/summary/'+$stateParams._id)
        .success(function(data){
            console.log('returned test information', data);

            $scope.tags = data.tags;
            $scope.test = data.test[0];
            $scope.tasks = data.tasks;

            $scope.leftNavList = [];

            _.each(data.test, function(test){
                $scope.leftNavList.push(test);
            });
            _.each(data.tasks, function(task){
                $scope.leftNavList.push(task);
            });
            _.each(data.tags, function(tag){
                $scope.leftNavList.push(tag);
            });

            console.log($scope.leftNavList);

            // group messages by users
            $scope.messages = _.groupBy(data.messages, function(z){return z._subject.name;});
            
            // console.log('messages', $scope.messages, data.messages);
            
            $scope.activate($scope.leftNavList[0]);

        });

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

        $http
            .put('/api/summary/', dataOut)
            .success(function(data, msg){
                console.log('success', data, msg);
            });

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

// CLOSE SUMMARY ==========================================
    $scope.completeSummary = function(){
        // post all the summary changes to the test
        // post fav'd statuses to relevant messages

        $scope.messages = _.map($scope.messages, function(val, key){ return val; });

        // mixpanel.track('Summary complete', {});

        console.log('messages', $scope.messages);

        var url = '/api/summary/'+ $stateParams._id;
        var data_out = {navlist: $scope.leftNavList, messages:$scope.messages[0]} ;
        
        $http.put(url, data_out)
            .success(function(data){
                // console.log(data);
                $location.path('/report/'+ $stateParams._id);
            })
            .error(function(data){
                console.log('error', data);
            });        

    };
   
}]);
