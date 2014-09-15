'use strict';
// flow.js

// FLOW EDIT CONTROLLER ===========================================================

angular.module('field_guide_controls').controller('flow', ['$scope','$http', '$stateParams','$state', '$location', function($scope, $http,$stateParams,$state, $location){
    console.log('loaded flow controller');

    $http
        .get('/api/flow/'+$stateParams.flow_id, {timeout : 5000, cache:false})
        .success(function(data) {
            $scope.flow = data;
            console.log('flow', $scope.flow)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    console.log('this is after the Get')

	$scope.postStep = function() {
        console.log('touched add a step');

        var step = {};

        step.name = "edit me";
        step._flow = $stateParams.flow_id;
        step._session = $scope.flow._session;
         
        var url = '/api/step/';
        var data_out = step;
        
        $http
            .post(url,data_out)
            .success(function(data){
                console.log('new step added '+ JSON.stringify(data));

                $scope.flow.steps.push(data);
            })
            .error(function(data){
                console.log(JSON.stringify(data))
            });
    }
    
    $scope.removeStep = function(step){
    
        step.edit=false;
    	step.title_edit=false;
        

        var index = $scope.flow.steps.indexOf(step)
  		var url = '/api/step/'+step._id;
        
        $scope.flow.steps.splice(index, 1);

        console.log('delete step', url);
        console.log('index', index);

        $http.delete(url)
            .success(function(data){
                console.log(data);
                
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }

	$scope.editTitle = function (step){
		// edit the title box for a step
		
		step.title_edit = true;

		$scope.editedStep = step;
		// Clone the original item to restore it on demand.
		$scope.originalStep = angular.extend({}, step);
	}

	
	// what is our drag handle - this should be a directive.


	$scope.sortableOptions = {
	    handle: '> .step-hamburger',
        update: function(e, ui) {
            console.log('touched sortable list')
            console.log($scope.flow);
            $scope.updateFlow($scope.flow)
          }
	};

	$scope.blurTitle = function (step){
		// on losing the focus, save the name of the step
		step.title_edit = false;

		$scope.editedStep = null;
		
		step.name = step.name.trim();

		if (!step.name) {
			$scope.removeStep(step);
		}

        $scope.updateStep(step)
	}

	$scope.revertEditing = function (step) {
		// on escape, revert editing
		steps[steps.indexOf(step)] = $scope.originalStep;
		$scope.doneEditing($scope.originalStep);
	};

    $scope.select= function(step) {
       $scope.selected = step;
    };
    
    $scope.isActive = function(step) {
       return $scope.selected === step;
    };

    $scope.updateStep = function(step){
        console.log('touched update step', step._id)
        var url = '/api/step/'+step._id;
        var data_out = step;

        $http
            .put(url, data_out)
            .success(function(data){
                console.log('step has pushed', data);
             })
            .error(function(data){
                console.log('error', data)
            });
    }

    $scope.goHome = function(flow){
        $scope.updateFlow(flow)
        $location.path('/'+flow._session);
    }

    $scope.updateFlow = function(flow){
        // Put to this URL the entire data object from this controller
        // technically this is created when we hit Add on prev. page
        console.log('touched update flow', flow)

        var url = '/api/flow/'+$stateParams.flow_id;
        var data_out = flow;

        if (!flow.title){
            flow.title = 'New Flow Name Goes Here';
        }

        // reminder: this pushes an update to an already-created flow now
		$http
            .put(url, data_out, {timeout:5000})
            .success(function(data){
                console.log('flow has pushed', data);
             })
            .error(function(data){
                console.log('error', data)
            });
	};
}]);