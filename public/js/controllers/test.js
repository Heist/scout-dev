// test.js
(function() {
    'use strict';
    // TEST CONTROLLER ===========================================================
    angular.module('field_guide_controls')
    .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
    }])
    .controller('test', 
                ['$scope','$compile','$http','$stateParams','$state','$location','$window','$rootScope','$anchorScroll',
        function(  $scope, $compile,  $http,  $stateParams,  $state,  $location,  $window,  $rootScope,  $anchorScroll){
        
        console.log('loaded test controller');
        
        $http
            .get('/api/test/'+$stateParams.test_id, {timeout : 5000, cache:false})
            .success(function(data) {
                $scope.test = data;
                $scope.tasks = data._tasks;

                console.log('test', $scope.test);
                console.log('tasks', $scope.tasks);
                $scope.showAnchor(1);

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // DIRECTIVES AND FUNCTIONS ===========================


        // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection

        $scope.changeOnboard = function(num){
            $rootScope.user.onboard = num;

            var url = '/user/'+$rootScope.user._id;
            var dataOut = {user : $rootScope.user.onboard};

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log(data);
                });
        };
        
        // ACTIONS ============================================
        // an effort to manipulate order.... 
        $scope.moveTask = function(old_index, up_down){
            console.log(old_index, up_down);
            var new_index = old_index + up_down;

            console.log(new_index);
            
            $scope.tasks.splice(new_index, 0, $scope.tasks.splice(old_index, 1)[0]);

            var task_order = _.pluck($scope.tasks, 'name');
            var task_idx = _.pluck($scope.tasks, 'task_index');
            
            console.log(task_order, task_idx);
            // set the stored index of the task properly
            // console.log('did things stay moved', $scope.tasks); // for testing purposes
            
            // I think if we don't do this, it won't store if another thing's not pressed.
            $scope.updateTest();
            
        };

        $scope.selectPrototype = function(kind){
            console.log('touched prototype', kind);
            $scope.test.kind = kind;
            mixpanel.track('Type of Test', {'test type' : kind });
        };

        $scope.selectPlatform = function(kind){
            $scope.test.platform = kind;
            console.log('touched platform', $scope.test.platform);
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
            $scope.updateTest();
            $scope.showAnchor(anchor);
        };

        // TIPS ===============================================
        $scope.tip = function(test){
            
            // $scope.tip.body = 'Testing your prototype on an <strong>iPhone</strong> or <strong>iPad</strong>? Download the Field Guide
            //             app from the <a href="#" class="alt">App Store</a>.'

            // do something HTML-rendering-and-sanitizing related in here.
            // perhaps implement a Markdown directive?
        };

        // TASK FUNCTIONS =====================================

    	$scope.newTask = function(task) {
            console.log('touched add a task');

            task._test = $stateParams.test_id;
            task._session = $scope.test._session;
            task.index = $scope.tasks.length;
            
            console.log(task);
            mixpanel.track('Task added', { 'user': $rootScope.user });

            var url = '/api/task/';
            var data_out = task;
            
            $http
                .post(url,data_out)
                .success(function(data){
                    console.log('new task added '+ JSON.stringify(data));

                    $scope.tasks.push(data);
                    $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];
                    $scope.newtask = '';
                })
                .error(function(data){
                    console.log(JSON.stringify(data));
                });
        };
        
        $scope.removeTask = function(task){
        
            task.edit=false;
            task.title_edit=false;

            var index = $scope.tasks.indexOf(task);
            var url = '/api/task/'+task._id;
            
            $scope.tasks.splice(index, 1);

            console.log('delete task', url);
            console.log('index', index);

            $http.delete(url)
                .success(function(data){
                    console.log(data);
                    $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];
                })
                .error(function(data){
                    console.log('Error: ' + data);
                });
        };

    	$scope.editTitle = function (task){
    		// edit the title box for a task
    		task.title_edit = true;
    		$scope.edited = task;
    	};

    	$scope.blurTitle = function (task){
    		// on losing the focus, save the name of the task
    		task.title_edit = false;
    		$scope.editedtask = null;

    		task.name = task.name.trim();

    		if (!task.name) {
    			$scope.removeTask(task);
    		}

            $scope.updateTask(task);
    	};

        $scope.select = function(task) {
            $scope.selectedTask = task;         
        };
        
        $scope.isActive = function(task) {
            return $scope.selectedTask === task;
        };

        $scope.batchTask = function(){
            console.log('touched batchTash', $scope.tasks);

            var dataOut = $scope.tasks;
            var url = '/api/task/';

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log('tasks pushed', data);
                })
                .error(function(data){
                    console.log('error', data);
                });

        };

        $scope.updateTask = function(task){
            console.log('touched update task', task._id, task.desc);

            var url = '/api/task/'+task._id;
            var data_out = task;

            return $http
                .put(url, data_out)
                .success(function(data){
                    console.log('task has pushed', data);
                    console.log('current test tasklist', data._tasks);
                 })
                .error(function(data){
                    console.log('error', data);
                });
            
        };

        $scope.updateTest = function(){
            var test = $scope.test;
            
            if($scope.test.desc){
                test.desc = test.desc;
            }

            if($scope.test.name){
                mixpanel.track('Test name changed', { 'user': $rootScope.user });
            }

            console.log('touched update test', test);

            var url = '/api/test/'+$stateParams.test_id;
            var data_out = test;

            var task_count=0;
            _.each($scope.tasks, function(task){
                task.index = task_count;
                task_count++;
                console.log(task.name, task.index);
            });

            console.log($scope.tasks);

            // reminder: this pushes an update to an already-created test
    		return $http
                .put(url, data_out, {timeout:5000})
                .success(function(data){
                    console.log('test has pushed', data);
                })
                .error(function(data){
                    console.log('error', data);
                });
    	};

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