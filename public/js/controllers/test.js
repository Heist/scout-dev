'use strict';
// test.js

// TEST CONTROLLER ===========================================================

angular.module('field_guide_controls')
.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
.controller('test', ['$scope','$http', '$stateParams','$state', '$location','$window','$rootScope', '$anchorScroll',
    function($scope, $http,$stateParams,$state, $location,$window,$rootScope,$anchorScroll){
    console.log('loaded test controller');
    
    $http
        .get('/api/test/'+$stateParams.test_id, {timeout : 5000, cache:false})
        .success(function(data) {
            $scope.test = data;
            console.log('test', $scope.test);

            $scope.showAnchor(1);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // DIRECTIVES AND FUNCTIONS ===========================

    // what is our drag handle - this should be a directive.
    $scope.sortableOptions = {
        handle: '> .step-hamburger',
        update: function(e, ui) {
            console.log('update: '+ui.item.index());
            console.log('task to update', $scope.tasks[ui.item.index()]);

            $scope.tasks[ui.item.index()].index = ui.item.index();
            $scope.updateTask($scope.tasks[ui.item.index()]);
        }
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
                body : 'A <strong>Test</strong> is a series of screens, goals, or steps for your customers to interact with. For example, you could use a <strong>Test</strong> to capture a sign-up process.'
            },
            {   anchor : 3,
                title : 'What is a task?',
                body : '<strong>Tasks</strong> allow you to define important steps in your prototype, website, or app. <strong>Talking points</strong> are the notes and ideas you want to ask the person you’re testing with. You define steps to <strong>sort and organize</strong> your notes and feedback.'
            },
            {   anchor : 4,
                title : 'Next steps',
                body : 'Round up some testers - you&rsquo;re ready to test. This would be a good time to schedule in some test participants.'
            }
        ];

        $scope.anchor = x;
        $scope.explanation = _.findWhere(explanations, {anchor:x});
        // $scope.explanation.body = ;
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
                console.log(JSON.stringify(data))
            });
    }
    
    $scope.removeTask = function(task){
    
        task.edit=false;
    	task.title_edit=false;

        var index = $scope.tasks.indexOf(task)
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
            })
    }

	$scope.editTitle = function (task){
		// edit the title box for a task
		task.title_edit = true;
		$scope.edited = task;

		// Clone the original item to restore it on demand.
		$scope.original = angular.extend({}, task);
	}

	$scope.blurTitle = function (task){
		// on losing the focus, save the name of the task
		task.title_edit = false;
		$scope.editedtask = null;

		task.name = task.name.trim();

		if (!task.name) {
			$scope.removeTask(task);
		}

        $scope.updateTask(task)
	}

    $scope.select= function(task) {
        $scope.selectedTask = task;         
    };
    
    $scope.isActive = function(task) {
       return $scope.selectedTask === task;
    };

    $scope.updateTask = function(task){
        console.log('touched update task', task._id, task.desc)

        var url = '/api/task/'+task._id;
        var data_out = task;

        return $http
            .put(url, data_out)
            .success(function(data){
                console.log('task has pushed', data);
                console.log('current test tasklist', data._tasks);
             })
            .error(function(data){
                console.log('error', data)
            });
    }

    $scope.updateTest = function(){
        // function asPromise(f) { return $q(function(resolve, reject) { resolve(f()); } };ca
        var test = $scope.test;
        
        console.log('touched update test', test);

        var url = '/api/test/'+$stateParams.test_id;
        var data_out = test;

        if (!test.title){
            test.title = 'New test Name Goes Here';
        }

        // reminder: this pushes an update to an already-created test
		return $http
            .put(url, data_out, {timeout:5000})
            .success(function(data){
                console.log('test has pushed', data);
                
             })
            .error(function(data){
                console.log('error', data)
            });
	};

    $scope.goHome = function(){
        // fun facts! This might cause a race condition.
        // TODO: see if THEN will work here.
        $scope.updateTest()
            .then(function(){
                $location.path('/overview');
            });
        
        
    }
}]);