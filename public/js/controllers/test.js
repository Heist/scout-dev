// test.js
(function() {
    'use strict';
    // TEST CONTROLLER ===========================================================
    angular.module('field_guide_controls')
    .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
    }])
    .controller('test', 
                ['testBuildFunctions', '$scope','$compile','$http','$stateParams','$state','$location','$window','$rootScope','$anchorScroll',
        function(testBuildFunctions, $scope, $compile,  $http,  $stateParams,  $state,  $location,  $window,  $rootScope,  $anchorScroll){
        
        $http
            .get('/api/test/'+$stateParams.test_id, {timeout : 5000, cache:false})
            .success(function(data) {
                $scope.test = data;
                $scope.tasks = data._tasks;
                $scope.showAnchor(1);
            });

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
            // TODO: Set isActive in here. 
        };
        
        $scope.isActive = function(task) {
            return $scope.selectedTask === task;
        };

    // ACTIONS ============================================
        $scope.selectPrototype = function(kind){
            $scope.test.kind = kind;

            mixpanel.track('Type of Test', {'test type' : kind });
        };

        $scope.selectPlatform = function(kind){
            $scope.test.platform = kind;
        };

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
                mixpanel.track('Test setup completion page', { 'user': $rootScope.user });
            }
        };

        $scope.saveAndMove = function(anchor){
            // Saves the test and changes the step to the next page
            $scope.updateTest();
            $scope.showAnchor(anchor);
        };

    // TASK FUNCTIONS =====================================
        $scope.newTask = function(task) {
            // Add a new task
            mixpanel.track('Task added', { 'user': $rootScope.user });
            
            task._test = $stateParams.test_id;
            task._session = $scope.test._session;
            task.index = $scope.tasks.length;
            
            var url = '/api/task/';
            var data_out = task;
            
            $http
                .post(url,data_out)
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

    // Edit Task Things =========================
        $scope.editTitle = function (task){
            task.title_edit = true;
            $scope.edited = task;
        };

        $scope.blurTitle = function (task){
            // on losing the focus, save the name of the task
            task.title_edit = false;
            $scope.editedtask = null;

            task.name = task.name.trim();

            // deleted the name of the task? Remove it entirely.
            if (!task.name) {
                $scope.removeTask(task);
            }

            $scope.updateTask(task);            
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
            
            if($scope.test.name){
                mixpanel.track('Test name changed', { 'user': $rootScope.user });
            }

            if($scope.test.desc){
                test.desc = $scope.test.desc;
            }

            var url = '/api/test/'+$stateParams.test_id;
            var data_out = test;

            // index the tasks appropriately and make sure they're put away
            var task_count=0;
            _.each($scope.tasks, function(task){
                task.index = task_count;
                task_count++;
            });
            
            $http
                .put(url, data_out, {timeout:5000});
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