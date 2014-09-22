'use strict';
// test.js

// TEST CONTROLLER ===========================================================

angular.module('field_guide_controls').controller('test', ['$scope','$http', '$stateParams','$state', '$location', function($scope, $http,$stateParams,$state, $location){
    console.log('loaded test controller');
    // if(!$scope.selectedTask && $scope.test){
        
    // };
    

    $http
        .get('/api/test/'+$stateParams.test_id, {timeout : 5000, cache:false})
        .success(function(data) {
            $scope.test = data;
            console.log('test', $scope.test)

            if($scope.test._tasks){
                console.log($scope.test._tasks.length);
                $scope.selectedTask = $scope.test._tasks[$scope.test._tasks.length-1];
            };
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // DIRECTIVES AND FUNCTIONS ===========================

    // what is our drag handle - this should be a directive.
    $scope.sortableOptions = {
        handle: '> .task-hamburger',
        update: function(e, ui) {
            console.log('touched sortable list')
            console.log($scope.test);
            $scope.updatetest($scope.test)
          }
    };

    // TASK FUNCTIONS =====================================

	$scope.newTask = function() {
        console.log('touched add a task');

        var task = {};

        task.name = "edit me";
        task._test = $stateParams.test_id;
        task._session = $scope.test._session;
         
        var url = '/api/task/';
        var data_out = task;
        
        $http
            .post(url,data_out)
            .success(function(data){
                console.log('new task added '+ JSON.stringify(data));

                $scope.test._tasks.push(data);
                $scope.selectedTask = $scope.test._tasks[$scope.test._tasks.length-1];
            })
            .error(function(data){
                console.log(JSON.stringify(data))
            });
    }
    
    $scope.removeTask = function(task){
    
        task.edit=false;
    	task.title_edit=false;

        var index = $scope.test._tasks.indexOf(task)
  		var url = '/api/task/'+task._id;
        
        $scope.test._tasks.splice(index, 1);

        console.log('delete task', url);
        console.log('index', index);

        $http.delete(url)
            .success(function(data){
                console.log(data);
                $scope.selectedTask = $scope.test._tasks[$scope.test._tasks.length-1];
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

	$scope.revertEdit = function (task) {
		// on escape, revert editing
        // this appears to not be currently in use
		tasks[tasks.indexOf(task)] = $scope.original;

		$scope.doneEdit($scope.original);
	};

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
                $location.path('/');
            });
        
        
    }
}]);