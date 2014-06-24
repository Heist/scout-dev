"use strict";
// moderator.js

var scoutApp = angular.module('scoutApp',['ui','ui.bootstrap','ui.router']);

scoutApp.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
	$locationProvider
		.html5Mode(true);

	$urlRouterProvider.otherwise('/home');
    
    $stateProvider        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partials/overview.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('add', {
        	url: '/add',
            templateUrl: 'partials/add.html'
            // we'll get to this in a bit       
        })
        ;

});

scoutApp.controller('steps', ['$scope',function($scope) {

	$scope.steps = [{title:'step one',editing: false},{title:'step two',editing: false},{title:'big bird',editing: false}];

	$scope.add = function() {        
        $scope.step = {'title':'edit me'};
        $scope.steps.push($scope.step);
    }

    $scope.removeStep = function(step){
    	var index = $scope.steps.indexOf(step)
  		$scope.steps.splice(index, 1);   
    }


    $scope.editStep = function (step) {
    	console.log(step.editing);
    		step.editing=true;
			$scope.editedStep = step;
			// Clone the original todo to restore it on demand.
			$scope.originalStep = angular.extend({}, step);
		};

	$scope.doneEditing = function (step) {
		$scope.editedStep = null;

		step.title = step.title.trim();

		if (!step.title) {
			$scope.removeStep(step);
		}
		step.editing=false;
	};

	$scope.revertEditing = function (step) {
		steps[steps.indexOf(step)] = $scope.originalStep;
		$scope.doneEditing($scope.originalStep);
	};


 //    $scope.edit = function(step){
 //    	console.log('editing');
 //    	step.editing = true;
 //    	$scope.editedStep = step;    	
	// 		// Clone the original todo to restore it on demand.
	// 	$scope.originalStep = angular.extend({}, step);
 //    }
	// $scope.doneEditing = function (step) {
	// 	$scope.editedStep = null;
	// 	step.title = step.title.trim();

	// 	if (!step.title) {
	// 		$scope.removeStep(step);
	// 	}
	// 	step.editing = false;
	// };
	// $scope.check=function(){
	// 	console.log($scope.flowname);
	// };
}]);

