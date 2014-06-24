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

.controller('steps', ['$scope',function($scope) {

	$scope.steps = []; // hmm-mm.

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
    	var index = $scope.steps.indexOf(step)
  		$scope.steps.splice(index, 1);   
    }

    $scope.editStep = function (step) {
    	
    	console.log('editing');
    		step.title_edit=true;
			$scope.editedStep = step;
			// Clone the original item to restore it on demand.
			$scope.originalStep = angular.extend({}, step);

		console.log(step.title_edit);
		 $scope.$apply

	};

	$scope.focused = function (step){
		console.log('focused ',step);
	}

	$scope.doneEditing = function (step) {
		$scope.editedStep = null;
		console.log('doneEditing');
		step.title = step.title.trim();

		if (!step.title) {
			$scope.removeStep(step);
		}
		step.title_edit=false;
		step.edit=false;
	};

	$scope.revertEditing = function (step) {
		steps[steps.indexOf(step)] = $scope.originalStep;
		$scope.doneEditing($scope.originalStep);
	};

}])

.directive('stepEscape', function () {
		'use strict';

		var ESCAPE_KEY = 27;

		return function (scope, elem, attrs) {
			elem.bind('keydown', function (event) {
				if (event.keyCode === ESCAPE_KEY) {
					scope.$apply(attrs.stepEscape);
				}
			});
		};
	})

.directive('stepFocus', function todoFocus($timeout) {
		'use strict';

		return function (scope, elem, attrs) {
			scope.$watch(attrs.stepFocus, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	})
;

