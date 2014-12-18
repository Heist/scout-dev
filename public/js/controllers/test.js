'use strict';
// test.js

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

    // $scope.dragControlListeners = {
    //     accept: function (sourceItemHandleScope, destSortableScope) {return boolean} //override to determine drag is allowed or not. default is true.
    //     itemMoved: function (event) {//Do what you want},
    //     orderChanged: function(event) {//Do what you want},
    //     containment: '#board'//optional param.
    // };

    $scope.treeOptions = {
        dropped: function(e) {
            console.log (e.source.nodesScope);
            console.log($scope.tasks);
            _.each($scope.tasks, function(task){
                task.index = $scope.tasks.indexOf(task);
            });
            $scope.batchTask();
        }
    };


    // ACTIONS ============================================
    // an effort to manipulate order.... 
    $scope.moveTask = function(old_index, new_index){
        console.log(old_index, new_index)
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
        
        $scope.tasks.splice(new_index, 0, $scope.tasks.splice(old_index, 1)[0]);

        // set the stored index of the task properly
        

        return $scope.tasks; // for testing purposes
    };

    $scope.selectPrototype = function(kind){
        console.log('touched prototype', kind);
        $scope.test.kind = kind;
        // mixpanel.track('Type of Test', {'test type' : kind });
    };

    $scope.selectPlatform = function(kind){
        $scope.test.platform = kind;
        console.log('touched platform', $scope.test.platform);
    };

    $scope.showAnchor = function(x) {
        // var newHash = 'anchor' + x;
        // if ($location.hash() !== newHash) {
        //   // set the $location.hash to `newHash` and
        //   // $anchorScroll will automatically scroll to it
        //   $location.hash('anchor' + x);
        // } else {
        //   // call $anchorScroll() explicitly,
        //   // since $location.hash hasn't changed
        //   $anchorScroll();


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
            // mixpanel.track('Test setup completion page', { 'user': $rootScope.user });
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

	$scope.newTask = function() {
        console.log('touched add a task');

        var task = {};

        task.name = "edit me";
        task._test = $stateParams.test_id;
        task._session = $scope.test._session;
        task.index = $scope.tasks.length;
        
        // mixpanel.track('Task added', { 'user': $rootScope.user });

        var url = '/api/task/';
        var data_out = task;
        
        $http
            .post(url,data_out)
            .success(function(data){
                console.log('new task added '+ JSON.stringify(data));

                $scope.tasks.push(data);
                $scope.selectedTask = $scope.tasks[$scope.tasks.length-1];
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

		// Clone the original item to restore it on demand.
		$scope.original = angular.extend({}, task);
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
            // mixpanel.track('Test name changed', { 'user': $rootScope.user });
        }

        console.log('touched update test', test);

        var url = '/api/test/'+$stateParams.test_id;
        var data_out = test;

        if (!test.name){
            test.name = 'New test Name Goes Here';
        }

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