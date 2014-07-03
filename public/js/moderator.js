"use strict";
// moderator.js

var scoutApp = angular.module('scoutApp',['ui','ui.bootstrap','ui.router']);

scoutApp.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
	$locationProvider
		.html5Mode(true);

	// $urlRouterProvider.otherwise('/home');
	// conflicts with routes provided to express
    
    $stateProvider        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partials/overview.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('flow', {
        	url: '/flow/:sessionId',
            templateUrl: 'partials/flow.html'
            // we'll get to this in a bit       
        })
        .state('run', {
        	url: '/run/:sessionId',
            templateUrl: 'partials/run.html'
            // we'll get to this in a bit       
        })
        ;

})

.controller('sendFlow', ['$scope','$http', function($scope, $http){
	
}])


.controller('runSession', ['$scope','$http', '$stateParams','$state', function($scope, $http,$stateParams,$state){
    // set up controller-wide variables
    $scope.session = {};
    $scope.flows = {};

    $http.get('/api/'+$stateParams.sessionId)
        .success(function(data){
            $scope.session = data;
            $scope.flows = $scope.session.flows;
            console.log($scope.flows);
        })

        $scope.selectedIndex = 0;
        $scope.parentIndex = 0;

        $scope.activate = function (index, parentIndex) {
            $scope.selectedIndex = index;
            $scope.parentIndex = parentIndex;
        };
}])


.controller('overview', ['$scope','$http', function($scope, $http){
	// set up controller-wide variables
	$scope.sessions = {};


	// get all sessions and their flows	
	$http.get('/api/')
		.success(function(data) {
			// flows is *all* flows
			$scope.sessions = data;
			console.log($scope.sessions);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

    $scope.editTitle = function(textfield){
        textfield.editing = 'true';
        console.log(textfield.editing);

        
        // Clone the original item to restore it on demand.
        // $scope.originalTitle = angular.extend({}, session);
    }


    $scope.blurTitle= function(session){
        session.editing ='false';
        $scope.editedTitle = null;
        
        // var index = $scope.session.flows.indexOf(flow);
        var url = '/api/'+session._id;
        
        console.log(session.name);

        if (!session.name) {
            session.name = 'New Session';
        }

        var dataOut = {name:session.name};

        $http.put(url, dataOut)
                .success(function(data){
                    console.log('success: ', data);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
    }

	$scope.removeFlow = function(session, flow){ 
        
        $scope.sessions[session].flows.splice(flow, 1);

        var url = '/api/'+$scope.sessions[session]._id;
        var dataOut = $scope.sessions[session];

        $http.put(url,dataOut)
  			.success(function(data){
  				console.log(data)
  			})
  			.error(function(data){
  				console.log('Error: ' + data);
  			})
    }

    $scope.addSession = function(session){
        var dataOut = {name:'New Session'}        

    	$http.post('/api/', dataOut)   
    		.success(function(data){        		
                $scope.sessions.push(data);
                console.log(data)
    		})
    		.error(function(data){

    		})
    }

    $scope.removeSession = function(session){
        var index = $scope.sessions.indexOf(session);
        $scope.sessions.splice(index, 1);

        var url = '/api/'+session._id;

        $http.delete(url)
            .success(function(data){
                console.log(url ,'deleted')
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }
	
}])

// aside from managing steps, on open, this scope should fetch the flow created in overview
// and pass it as the container for the current steps

// $scope, $http, $stateParams, $state
// using ui-router, the above should be used to access angular_route/add?sessionId=

.controller('addFlow', ['$scope','$http', '$stateParams','$state', function($scope, $http,$stateParams,$state){
	// $steps.controller needs to know the index of the selected item
	// selected $index
	// ng-show when steps.edit$index is selected
	// step 3 is selected.$index.step.desc   

	$scope.steps = []; // hmm-mm.
	$scope.selected = $scope.steps[0];

	$scope.flow = {}; // this is wholly structured on the front end, which is weird.
	$scope.flow.steps = $scope.steps;

	$scope.add = function(step) {
        $scope.step = {
        		title	: 'edit me',
        		desc	: '',        		
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

    $scope.addAFlow = function(){

        // Put to this URL the entire data object from this controller
        var putURL = '/api/'+$stateParams.sessionId;

        if (!$scope.flow.title){
            $scope.flow.title = 'New Flow Name Goes Here';
        }
        
        var wrapper = { 'flow': $scope.flow };

		$http
	 		.put(putURL, wrapper)
			.success(function(data){
				console.log(data);
 			})
            .error(function(data){
                console.log(data)
            })
            ;
	};
}])
;