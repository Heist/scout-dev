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
        	url: '/flow/:sessionId/:flowId',
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

    $scope.timeline = []; // holds all messages currently in flow

    $http.get('/api/'+$stateParams.sessionId)
        .success(function(data){
            $scope.session = data;
            $scope.flows = $scope.session.flows;
            console.log($scope.flows);
        })

        $scope.selectedIndex = 0;
        $scope.parentIndex = 0;

        $scope.activate = function (index, parentIndex, step) {
            $scope.selectedIndex = index;
            $scope.parentIndex = parentIndex;

            console.log(step.title);
            var message = step.title;

            $scope.timeline.push(message)

            // write message to $scope.timeline
            // on parent index change
            // var message.title = 'Starting flow'
            // var message.body  = 
            // message is 
            // starting flow
            // next message posted is 
            // starting step

// this is going to be a find-join in mongoose where we find all TESTS by SESSION_ID 
// then return that information to the summarize/report function.

        };

        $scope.putMessage = function (post){
            // write .put message to database
            // send .put contents to $scope.timeline


        }
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
        $http.get('/api/')
        .success(function(data) {
            // flows is *all* flows
            $scope.sessions = data;
            console.log($scope.sessions);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.addSession = function(session){
        var dataOut = {name:'New Session'}        

    	$http.post('/api/', dataOut)   
    		.success(function(data){        		
                $scope.sessions.push(data);
                console.log(data)
    		})
    		.error(function(data){

    		});
        $http.get('/api/')
        .success(function(data) {
            // flows is *all* flows
            $scope.sessions = data;
            console.log($scope.sessions);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
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

      $scope.addAFlow = function(session){
            // this adds a flow to the session selectied
            var putURL = '/api/'+session._id;
            console.log(putURL);

            $scope.flow = []
            $scope.flow.title = 'New Flow Name Goes Here';

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

            $http.get('/api/')
            .success(function(data) {
                // flows is *all* flows
                $scope.sessions = data;
                console.log($scope.sessions);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

            };
	
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

    $http.get('/api/'+$stateParams.sessionId+'/'+$stateParams.flowId)
        .success(function(data) {
            $scope.flow = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

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

    $scope.updateFlow = function(){
        // Put to this URL the entire data object from this controller
        // technically this is created when we hit Add on prev. page

        var putURL = '/api/'+$stateParams.sessionId+'/'+$stateParams.flowId;

        if (!$scope.flow.title){
            $scope.flow.title = 'New Flow Name Goes Here';
        }
        
        var wrapper = { 'flow': $scope.flow };

        // reminder: this pushes an update to an already-created flow now
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