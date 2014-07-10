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
        	url: '/edit/:sessionId/flow/:flowId',
            templateUrl: 'partials/flow.html'
            // we'll get to this in a bit       
        })
        .state('run', {
        	url: '/run/:sessionId/test/:testId',
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
    $scope.step = {};

    $scope.timeline = []; // holds all messages currently in flow

    // // refresh warning to prevent whoops-I-deleted-the-Session
    // var leavingPageText = "If you refresh, you will lose this test.";
    // window.onbeforeunload = function(){
    //     return leavingPageText;
    // }

    // $scope.$on('$destroy', function() {
    //     window.onbeforeunload = undefined;
    // });

    // $scope.$on('$locationChangeStart', function(event, next, current) {
    //     if(!confirm(leavingPageText + "\n\nAre you sure you want to leave this page?")) {
    //         event.preventDefault();
    //     }
    // });


    // this has to change to get the new session created on the run() command from the main controller
    $http.get('/api/'+$stateParams.sessionId)
        .success(function(data){
            $scope.session = data;
            $scope.flows = $scope.session.flows;
            console.log($scope.flows);

            // set the initial timeline contents
            var message = {};

            message.body = $scope.flows[0].title;
            message.title = 'Starting flow';
            $scope.timeline.push(message);

            // set the initial reporting step
            $scope.step.current = $scope.flows[0].steps[0]._id;
        })

        // select the initial 'activated' values
        $scope.selectedIndex = 0;
        $scope.parentIndex = 0;


        $scope.activate = function (index, parentIndex, step) {
            var stepType = 'Starting flow';
            if (parentIndex == $scope.parentIndex){
                stepType = 'Starting step';
            }

            $scope.selectedIndex = index;
            $scope.parentIndex = parentIndex;

            $scope.step.current = step._id;
            
            var message = {};

            message.body = step.title;
            message.title = stepType;

            $scope.timeline.push(message);

            console.log(step.title);
            console.log(step);

        // this is going to be a find-join in mongoose where we find all TESTS by SESSION_ID 
        // then return that information to the summarize/report function.

        };

        $scope.putMessage = function(message){
            // here we create a note object because message was too confusing.
             var note = {};
             note.body = message;
             note.tags = [];
             note.created = new Date();

             $scope.timeline.push(note);


            var connect = $scope.flows[$scope.parentIndex].steps[$scope.selectedIndex]

            // if message has # with no space, post that to message.tags
            var hashCatch = new RegExp(/\S*#\S+/gi); 
            var tagIt = message.match(hashCatch);
            
            if (tagIt){
                console.log(tagIt);
                for (var i=0; i < tagIt.length; ++i) {
                    note.tags.push(tagIt[i]);
                }                
            }

            connect.messages.push(note);
            console.log(connect);

            // now we put that step's update into its session storage in the db

            var url = '/api/'+$stateParams.sessionId+'/test/'+$stateParams.testId;

            // mongoose does not permid _id queries on grandchildren, only parent.child.id(_id)
            var dataOut = $scope.flows[$scope.parentIndex];


            $http.put(url, dataOut)
                .success(function(data){
                    console.log('Step pushed: ', data);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })


            $scope.message='';
        }
}])


.controller('overview', ['$scope','$http', '$location', function($scope, $http, $location){
	// set up controller-wide variables
	$scope.sessions = {};


	// get all sessions and their flows	on first load
	$http.get('/api/')
		.success(function(data) {
			// flows is *all* flows
			$scope.sessions = data;
			console.log($scope.sessions);            
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

    

    $scope.addAndLaunchNewTest = function(session){
        // var url = '/:sessionId/test/:testId' pseudocode

        var url = '/api/'+session._id+'/test/'+session.testKey;

        var dataOut = session;
        var new_session = [];

        $http.post(url, dataOut)
            .success(function(data){
                console.log(' total number of sessions ', data)
                new_session = data;
                $location.path('/run/'+data._id+'/test/'+data.testKey)
            })
            .error(function(data){
                console.log(data)
        });

        // this changes to the returned session id, which has been newly created.

    }

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
        var testGen =  Math.round((new Date().valueOf() * Math.random()));
                
        
        var dataOut = {
                name    : 'New Session', 
                testKey : testGen
            };        
        
    	$http.post('/api/', dataOut)   
    		.success(function(data){
                console.log(data)
                console.log('success');
    		})
    		.error(function(data){

    		});
        
        $http.get('/api/')
        .success(function(data) {
            // flows is *all* flows
            $scope.sessions = data;
            console.log($scope.sessions);
            console.log($scope.sessions.length);
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

    // $scope.steps = []; // hmm-mm.
    

     // this is wholly structured on the front end, which is weird.
    $scope.flow = [];
    // $scope.flow.steps = $scope.steps;


    $http.get('/api/'+$stateParams.sessionId+'/flow/'+$stateParams.flowId)
        .success(function(data) {
            console.log(data);
            $scope.flow = data;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $scope.selected = $scope.flow.steps;

	$scope.add = function(step) {
        $scope.step = {
        		title	: 'edit me',
        		desc	: '',        		
        		title_edit : false,
        		edit	: false
        	};
	    $scope.flow.steps.push($scope.step);  
        console.log($scope.flow)
    }

    $scope.removeStep = function(step){
    	step.edit=false;
    	step.title_edit=false;
    	var index = $scope.flow.steps.indexOf(step)
  		$scope.flow.steps.splice(index, 1);
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

        var putURL = '/api/'+$stateParams.sessionId+'/flow/'+$stateParams.flowId;

        if (!$scope.flow.title){
            $scope.flow.title = 'New Flow Name Goes Here';
        }
        
        var wrapper = { 'flow': $scope.flow };

        // reminder: this pushes an update to an already-created flow now
		$http
	 		.put(putURL, wrapper)
			.success(function(data){
				console.log('flow has pushed', data);
 			})
            .error(function(data){
                console.log('error', data)

            })
            ;
	};
}])
;