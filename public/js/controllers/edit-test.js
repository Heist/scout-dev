// edit-test.js
(function() {
    'use strict';
    // TEST CONTROLLER ===========================================================
    angular.module('field_guide_controls')
    .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
    }])
    .controller('editTest', 
        ['loadData', 'testBuildFunctions', '$scope','$compile','$http','$stateParams','$state','$location','$window','$rootScope','$anchorScroll',
        function(loadData, testBuildFunctions, $scope, $compile,  $http,  $stateParams,  $state,  $location,  $window,  $rootScope,  $anchorScroll){
        var tagSort = function(tags){
            return _.filter(tags, function(n){ if(n.name){ var nameCheck = n.name.toLowerCase(); return nameCheck !== 'summary'; } else { return; }});
        };

        var data = loadData.data;
        
        Intercom('update');
        $scope.test = data;
        $scope.tags = tagSort(data._tags) || [];
        $scope.tasks = data._tasks || [];

        // removes the body scroll overflow hidden
        var bodyScroll = angular.element(document.querySelector('body'));
        bodyScroll.removeClass('overflow-hidden');

        $scope.showAnchor = function(x) {

            var explanations = [
                {   anchor : 1,
                    title : 'What is a test?',
                    body : 'A <strong>Test</strong> is a series of screens,' + 
                           ' goals, or steps for your customers to interact with.'+
                           ' For example, you could use a <strong>Test</strong> to'+
                           ' capture a sign-up process.'
                },
                {   anchor : 3,
                    title : 'What is a task?',
                    body : '<strong>Tasks</strong> allow you to define important'+
                           ' steps in your prototype, website, or app. <strong>Talking points</strong>'+
                           ' are the notes and ideas you want to ask the person you’re testing with.'+
                           ' You define steps to <strong>sort and organize</strong> your notes and feedback.'
                },
                {   anchor : 5,
                    title : 'Next steps',
                    body : 'Round up some testers - you&rsquo;re ready to test.'+
                           ' This would be a good time to schedule in some test participants.'
                }
            ];

            $scope.anchor = x;
            $scope.explanation = _.findWhere(explanations, {anchor:x});
            if(x === 5){
                $location.path('/overview');
            }
        };

        $scope.showAnchor(1);

    // DIRECTIVES AND FUNCTIONS ===============================

        // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection
        $scope.changeOnboard = function(num){
            $rootScope.user.onboard = num;
            $http.put('/api/user/'+$rootScope.user._id, {onboard : $rootScope.user.onboard});
        };
        
        // SELECTION ======================================
        $scope.select = function(task) {
            
            $scope.selectedTask = task;
        };
        
        $scope.isActive = function(task) {
            return $scope.selectedTask === task;
        };

    // ACTIONS ============================================
        $scope.selectPrototype = function(kind){
            $scope.test.kind = kind;
        };

        $scope.selectPlatform = function(kind){
            $scope.test.platform = kind;
        };

        $scope.saveAndMove = function(anchor){
            // Saves the test and changes the step to the next page
            $scope.updateTest();
            $scope.showAnchor(anchor);
        };

        $scope.deleteTopicModalToggle = function(task){

            if($scope.deleteTopic || $scope.deleteTopic === task  ){
                $scope.deleteTopic = ''; 
                return;
            }
            if(!$scope.deleteTopic || $scope.deleteTopic !== task ){
                $scope.deleteTopic = task;
                return;
            }

        };

    // TASK FUNCTIONS =====================================
        $scope.newTask = function(task) {
            // Add a new task
            testBuildFunctions.addTask($stateParams._id, task, $scope.tasks.length)
                .success(function(data){
                    $scope.tasks.push(data);
                    $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];
                    $scope.newtask = '';
                });
        };
        
        $scope.removeTask = function(task){
            // Delete a task
            task.edit=false;
            task.title_edit=false;

            var index = $scope.tasks.indexOf(task);
            var url = '/api/task/'+task._id;
            
            $scope.tasks.splice(index, 1);

            $http.delete(url)
                .success(function(data){
                    $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];

                    $scope.deleteTopicModalToggle();
                });
        };

        $scope.moveTask = function(old_index, up_down){
            // set the stored index of the task
            // Tasks therefore appear in order
            // TODO: Abstract into a directive

            var new_index = old_index + up_down;
            $scope.tasks.splice(new_index, 0, $scope.tasks.splice(old_index, 1)[0]);

            $scope.updateTest();
        };
    
    // Add A New Task or Tasks ============================
        $scope.removeTag = function(tag){
            var index = $scope.tags.indexOf(tag);            
            $scope.tags.splice(index, 1);

            $http.delete('/api/tag/'+tag._id)
                .success(function(data){
                    console.log(data);
                });
        }

        $scope.saveTag = function(tags){
            // send the array to the back end, where each will be pushed appropriately 
            // /api/tag/
            
            var i = tags.split(' ');
            var dataOut = _.map(i, function(tag){
                return {
                     name : tag,
                    _test : $stateParams._id
                }
            })

            $http.post('/api/tag/', dataOut)
                .success(function(data){
                    if(_.isArray(data)){
                        $scope.tags = $scope.tags.concat(data);
                    } else {
                        $scope.tags.push(data);
                    }
                    $scope.newtag = '';
                });
        }


    // Edit Task Things ===================================
        $scope.editTitle = function (obj){
            obj.title_edit = true;
            obj.old_name   = obj.name;
            $scope.edited  = obj;
        };

        $scope.blurTitle = function (obj){
            // on losing the focus, save the name of the task
                obj.title_edit = false;

                $scope.editedtask = null;

            // deleted the name of the task? Remove it entirely.
            if (!obj.name) {
                obj.name = obj.old_name;
            }
            if (obj.doctype === 'test') {
                $scope.updateTest();
            } else {
                $scope.updateTask(obj);
            }

        };

        $scope.updateTask = function(task){
            var url = '/api/task/'+task._id;
            var data_out = task;

            $http
                .put(url, data_out);
        };

    // TEST UPDATE ==============================
        $scope.updateTest = function(){
            // reminder: this pushes an update to an already-created test

            var test = $scope.test;

            if($scope.test.desc){
                test.desc = $scope.test.desc;
            }

            var url = '/api/test/'+$stateParams._id;
            var data_out = test;

            // index the tasks appropriately and make sure they're put away
            var task_count=0;
            
            _.each($scope.tasks, function(task){
                task.index = task_count;
                task_count++;
            });
            
            $http.put(url, data_out, {timeout:5000});
        };

    // RETURN TO MAIN SCREEN ====================
        $scope.goHome = function(){
            // fun facts! This might cause a race condition.
            // TODO: see if THEN will work here.
            $scope.updateTest()
                .then(function(){
                    $location.path('/overview');
                });
        };

    }]);
})();