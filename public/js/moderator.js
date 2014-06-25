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

})

// we're working on this
// it needs to post data to the api url described in server.js
// then from there via mongoose to mongoDB

.controller('sessionOverview', ['$scope',function($scope){
	var dataOut = {name:$scope.yourName};
	
}])

// aside from managing steps, on open, this scope should fetch the flow created in overview
// and pass it as the container for the current steps

.controller('addFlow', ['$scope',function($scope) {
	// $steps.controller needs to know the index of the selected item
	// selected $index
	// ng-show when steps.edit$index is selected
	// step 3 is selected.$index.step.desc

	$scope.steps = []; // hmm-mm.
	$scope.selected = $scope.steps[0];

	$scope.add = function(step) {    
		var id_maker = Math.floor((Math.random() * 10000) + 1);    
        $scope.step = {
        		_id		: id_maker, 
        		title	: 'edit me',
        		desc	: "These are the questions you'll be asking the participants during testing",
        		flow_id : "24601",
        		title_edit : false,
        		edit	: false
        	};

        $scope.steps.push($scope.step);

    }

    $scope.removeStep = function(step){
    	step.edit=false;
    	step.title_edit=false;
    	var index = $scope.steps.indexOf(step)
  		$scope.steps.splice(index, 1);   
    }

	$scope.editTitle = function (step){
		// edit the title box for a step
		console.log('focused on editing title ',step);
		step.title_edit = true;

		$scope.editedStep = step;
		// Clone the original item to restore it on demand.
		$scope.originalStep = angular.extend({}, step);		
	}

	$scope.blurTitle = function (step){
		// on losing the focus, save the name of the step
		step.title_edit = false;

		console.log('blur ',step);
		$scope.editedStep = null;
		
		step.title = step.title.trim();

		if (!step.title) {
			$scope.removeStep(step);
		}	
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

}]);