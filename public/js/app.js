"use strict";
// app.js

var scoutApp = angular.module('scoutApp',['ui','ui.bootstrap','ui.router', 'ngSanitize']);

// function list for working with arrays

// sorts an array of objects by key.
function keysrt(key,desc) {
  return function(a,b){
   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}

function keygen(){
    return Math.round((new Date().valueOf() * Math.random()));
}

// FRONT-END ROUTE CONFIGURATION ================================================
scoutApp.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
	$locationProvider
		.html5Mode(true);

    $stateProvider
        // OVERVIEW AND FLOW CREATION ========================
        .state('home', {
            url: '/',
            templateUrl: 'partials/overview.html'
        })
        .state('flow', {
            url: '/edit/test/:testId/session/:sessionId/flow/:flowId',
            templateUrl: 'partials/flow.html'
        })

        // RUN TEST ==========================================
        .state('run', {
            url: '/run/test/:testId/session/:sessionId',
            templateUrl: 'partials/run.html'
        })

        // SUMMARIZE VIEW ====================================
        .state('summary', {
            url: '/summary/:summaryID/flow/',
            templateUrl: 'partials/summary.html'
        })
        .state('summary.flow', {
            templateUrl: 'partials/summary_flow.html'
        })
        .state('summary.step', {
            templateUrl: 'partials/summary_step.html'
        })
        .state('summary_tags', {
            url: '/summary/:summaryID/tags/',
            templateUrl: 'partials/summary_tags.html'
        })

        // REPORT PAGE WITH NESTED VIEWS =====================
        .state('report', {
            url: '/report/:testKey/',
            templateUrl: 'partials/report.html'
        })
        .state('report.flow', {
            templateUrl: 'partials/report_flow.html'
        })
        .state('report.step', {
            // url: '/report/:testKey/',
            templateUrl: 'partials/report_step.html'
        })

        // REPORT PAGE FOR SINGLE FLOW =======================
        .state('reportflow', {
            url: '/report/:testKey/flow/:flowName',
            templateUrl: 'partials/report.html'
        })
        .state('reportflow.flow', {
            templateUrl: 'partials/report_flow.html'
        })
        .state('reportflow.step', {
            // url: '/report/:testKey/',
            templateUrl: 'partials/report_step.html'
        })
        ;
})


// FILTERS =================================================================
 
.filter('hashtag', ['$sce', function($sce){
        return function(message) {

            var hashCatch = new RegExp(/\S*#\S+/gi); 
            var tagIt = message.match(hashCatch);
            
            var msg = message.replace(hashCatch, "<span class='tag'>$&</span>");

            return $sce.trustAsHtml(msg);
        };
}])

.filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    })

.filter('linebreaker', ['$sce', function($sce){
    return function(text) {
        text = text.replace(/\r?\n/g, '<br />');

        return $sce.trustAsHtml(text);
    }
}])

// CONTROLLERS ========================================================================

// REPORT CONTROLLER ===========================================================
.controller('report', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
    // holds the relevant summary
    $scope.session = {};

    if($stateParams.flowName){
        $http.get('/api/report/'+$stateParams.testKey+'/flow/'+$stateParams.flowName)
            .success(function(data){
              $scope.session = data;
              console.log('the report object', $scope.session);
              $scope.selected = data.summaries[0];

              console.log($scope.selected);
        })
    } else {
        $http.get('/api/report/'+$stateParams.testKey)
            .success(function(data){
              $scope.session = data;
              console.log('the report object', $scope.session);
              $scope.selected = data.summaries[0];

              console.log($scope.selected);
            })
        }
    $scope.select = function(selector){
        $scope.selected = selector;
        

        console.log($scope.selected);

        selector.favs = []

        for(var i in selector.session_by_user){
            for (var k in selector.session_by_user[i].messages){
                var msg = selector.session_by_user[i].messages[k];
                if (msg.fav==true){
                    selector.favs.push(msg);
                }
            }
        }

        console.log(selector.favs);

    }

}])


// SUMMARY CONTROLLER - TAGS  ========================================================
.controller('summary_tags', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
    // holds main flow structure
    $scope.flow = {};

   // for summarizing tags
    $scope.summary = {};

    // on load, get our information
    $http.get('/api/summary/'+$stateParams.summaryID+'/flow/')
        .success(function(data){
          $scope.flow = data;
        })

    // Return to summarizing steps
    $scope.summarizeSteps = function(summary){
        
        // upsert summary to DB
        
        var url = '/api/summary/'+ $stateParams.summaryID +'/flow/';
        var dataOut = summary;

        // console.log('put', summary);
        // console.log('post route',  url);
        
        $http.put(url, dataOut)   
            .success(function(data){
                console.log('sent a summary upsert - tags '+ JSON.stringify(data));
            })
            .error(function(data){

            });

        $location.path('/summary/'+ $stateParams.summaryID +'/flow/');
        
        // this shit needs to forcibly reapply/maintain the existing [flow] - at present it does not

    }

    // complete the Summary
    $scope.completeSummary = function(summary){
        // this is the Save A New Summary button
        // it saves a summary in complete mode when done writing it up
        // then returns you to /
        // this runs on a really weird, delayed time cycle! I do not know why.
        
        var url = '/api/summary/'+ $stateParams.summaryID +'/flow/';
        var dataOut = summary;

         $http.put(url, dataOut)   
            .success(function(data){
                // console.log('sent a new summary '+ JSON.stringify(data));
            })
            .error(function(data){
                console.log('error', data);
            });        

        $location.path('/');
    }

    // Summarize Tags controller functions
    $scope.selectTag = function (tag){
        $scope.selectedTag = tag;
        $scope.summary.text = $scope.selectedTag.summary;
    }

    $scope.clearTagSummary = function(summary){
        summary.text = '';
        $scope.selectedTag.summary = summary.text;
    }

    $scope.saveTagSummary = function(summary){
        console.log('touched save summary', summary);
        $scope.selectedTag.summary = summary.text;
    }

}])


// SUMMARY CONTROLLER - STEPS/FLOW  ==========================================

.controller('summary', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
	$scope.flow = {};
    $scope.timeline = [];

    // set selected step for main flow
    $scope.step = {};

    // for summarizing tags
    $scope.summary = {};

    // a function to return the steps from a set of flows
    // the scan those steps for their tags
    // then return that matched set to the step
    // this could possibly be done on the back end
    // console.log('summaryID', $stateParams.summaryID)
    $http.get('/api/summary/'+$stateParams.summaryID+'/flow/')
        .success(function(data){
          $scope.flow = data;
          console.log('the flow object', $scope.flow);
        })

    $scope.activate = function (index, parentIndex, step) {
        $scope.selectedIndex = index;
        $scope.parentIndex = parentIndex;

        // passes the step title to the global variable from flows[0].steps[step]
        $scope.step = step;

        //pass all of the tags inside of flows[allflows].steps[step] to an array 
    };

    // Switch to tag summary view
    $scope.summary_tags = function(summary){
        // upsert summary to DB

        var url = '/api/summary/'+ $stateParams.summaryID +'/flow/';
        var dataOut = summary;
        
         $http.put(url, dataOut)   
            .success(function(data){
                // console.log('sent a summary upsert - steps '+ JSON.stringify(data));
            })
            .error(function(data){
            });

        $location.path('/summary/'+ $stateParams.summaryID +'/tags/');
        $scope.flow = summary;
    }

    $scope.completeSummary = function(summary){
        // this is the Save A New Summary button
        // it saves a summary in complete mode when done writing it up
        // then returns you to /
        // this runs on a really weird, delayed time cycle! I do not know why.
        var url = '/api/summary/'+ $stateParams.summaryID +'/flow/';
        var dataOut = summary;

        
         $http.put(url, dataOut)   
            .success(function(data){
                // console.log('sent a new summary '+ JSON.stringify(data));
            })
            .error(function(data){
                console.log('error', data);
            });        

        $location.path('/');
    }

    // Summarize Steps controller functions 
    $scope.showHideTag = function(tag, index){
        // this sets visible/not visible on the repeated tags in steps.tags_single
        // it should also propagate to steps.tags
        // console.log(tag);
        if(tag.visible){
            tag.visible=false;
            // $scope.step.tags_single[index].visible = false;
        } else if (!tag.visible){
            tag.visible=true;
            // $scope.step.tags_single[index].visible = true;
        }
    }    
        
    $scope.saveFav = function(message){
        console.log('touched fav');
        if(message.fav){
            message.fav = false;
        } else if (!message.fav){
            message.fav = true;
        }
        // when we save the summary, it will save all messages with message.fav = true
        // to the summary file. 
    }

    $scope.passFail = function(step){
        console.log('touched pass-fail')
        if(step.pass_fail){
            step.pass_fail = false;
        } else if (!step.fail){
            step.pass_fail = true;
        }
        console.log($scope.step);
    }  

   
}])

// OVERVIEW CONTROLLER ========================================================
.controller('overview', ['$scope','$http', '$location', function($scope, $http, $location){
    // set up controller-wide variables
    $scope.sessions = {};
    $scope.tests = {};
    $scope.summaries = {};
    $scope.experiment = {};

    // get all sessions and their flows on first load
    $http.get('/api/test/')
        .success(function(data) {
            console.log('data log', data);


            // for each test in data.tests
            // match to its relevant flowKey
            // count each test by flowKey
            // attach the number of times that flow has been run to the flow

            // make the object we're counting
            var flowcount = [];
            for(var i = 0; i < data.tests.length; i++){
                for (var j = 0 ; j < data.tests[i].flows.length; j++){
                    flowcount.push(data.tests[i].flows[j].flowKey);
                }
            }
            flowcount.sort();
            // how many of each flow number do we have?

            // this makes an object with a key of the flow and a count as the property.
            var flow_index = [];
            var flow_ct = [];
            var ct = 0;
            for(var i = 0; i < flowcount.length; i++){
                if(!(flow_index.indexOf(flowcount[i]) != -1)){
                    ct = 1;
                    flow_index.push(flowcount[i]);
                    flow_ct.push({flow: flowcount[i], count: ct});
                
                } else if (flow_index.indexOf(flowcount[i]) != -1){
                    ct++
                    flow_ct[flow_index.indexOf(flowcount[i])].count = ct;   
                }
            }
            
            console.log('flow_ct new', flow_ct);

            // Association scrape - count of run tests to their flows
            for (var i = 0; i < data.sessions.length; i++){
                for (var j = 0; j < data.sessions[i].flows.length; j++){
                    console.log('flows', data.sessions[i].flows[j]);
                    for(var k = 0; k < Object.keys(count).length;k++){
                        console.log(count)
                    }
                }
            }

            // Association scrape - summaries to their flows
            for(var i = 0; i < data.summaries.length; i++){
                for (var j = 0; j < data.sessions.length; j++){
                    if (data.summaries[i].testKey == data.sessions[j].testKey){
                        for(var k = 0; k < data.sessions[j].flows.length; k++){
                            if(data.summaries[i].flowKey == data.sessions[j].flows[k].flowKey){
                                data.sessions[j].flows[k].summary = data.summaries[i].summary;
                                data.sessions[j].report = true;
                            }
                        }
                    }
                }
            }


            // because we use sessions as a unit everywhere else
            $scope.sessions = data.sessions;
            $scope.tests = data.tests;

            console.log('check for session models - do these have session summaries saved? Summarizing', data.sessions);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $scope.select = function (session, index){
        console.log('touched session', index, session)
        $scope.selected = session;
        $scope.selectedIndex = index;
    }

    // edit titles inline.
    $scope.editTitle = function(textfield){
        textfield.editing = 'true';
    }

    $scope.blurTitle= function(session){
        session.editing ='false';
        $scope.editedTitle = null;
        
        // var index = $scope.session.flows.indexOf(flow);
        var url = '/api/test/'+session.testKey+'/session/'+session._id;
        
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

    // Add and remove tests
    $scope.addTest = function(test){
        var testGen = Math.round((new Date().valueOf() * Math.random()));
        var dataOut = {
                ismodel : true,
                testKey : testGen 
            };        
        
        $http.post('/api/test/', dataOut)   
            .success(function(data){
                console.log('added a new test '+ JSON.stringify(data));
                $scope.sessions = data;
            })
            .error(function(data){

            });
        
    }
   
    $scope.removeTest = function(session){
        var url = '/api/test/'+session.testKey;
        var index = $scope.sessions.indexOf(session);

        $scope.sessions.splice(index, 1);

        $http.delete(url)
            .success(function(data){
                
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }

    // Add and remove flows from tests.
    $scope.addAFlow = function(session){
            // this adds a flow to the test selectied
            // important because tests model sessions


            console.log('touched addaflow ', session);
            $scope.flow = {}
            $scope.flow.title = 'New Flow Name Goes Here';
            $scope.flow.flowKey = keygen();
            $scope.flow.steps = [];

            session.flows.push($scope.flow);

            // this is so .put can sniff what's going on
            var wrapper = { 'flow': $scope.flow };
            
            var url = '/api/test/'+session.testKey;
            console.log(url);
            
            $http
                .put(url, wrapper)
                .success(function(data){
                    console.log('new flow added '+ JSON.stringify(data));
                    session.flows = data.flows;
                    $scope.$apply;
                })
                .error(function(data){
                    console.log(JSON.stringify(data))
                })
                ;
    };

    $scope.editFlow = function(session, flow){
        $location.path('/edit/test/'+session.testKey+'/session/'+session._id+'/flow/'+flow._id);
    }
    
    $scope.removeFlow = function(session, flow){ 
        // this is probably fine once we're only returning sessions
        // with ismodel : true
        // because the session we're selecting is the test session, not
        // any sub-sessions.

        console.log('session, flow '+ session+' '+ flow);


        var url = '/api/test/'+session.testKey+'/session/'+session._id+'/flow/'+flow._id;
        
        var dataOut = session;

        console.log(url);
        console.log(dataOut);

        $http.delete(url,dataOut)
            .success(function(data){
                console.log(JSON.stringify(data))
                $scope.selected = data;

            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }

    // Add a new session and return the new session run page
    $scope.addAndLaunchNewSession = function(session){
        // var url = '/:sessionId/test/:testId' pseudocode
        console.log('touchedNewTest');
        var url = '/api/test/'+session.testKey;

        var dataOut = {
                ismodel : false
            };

        $http.post(url, dataOut)
            .success(function(data){
                console.log('returned new session '+ data._id +" "+data.testKey);
                console.log('new session steps ' + data.flows[0].steps.length);
                $location.path('/run/test/'+data.testKey+'/session/'+data._id);
            })
            .error(function(data){
                console.log(JSON.stringify(data))
        });

        // this changes to the returned session id, which has been newly created.
    }

    // add a new summary and launch summary
    $scope.summarizeFlow = function(testKey, flowKey){

        console.log('touched key', flowKey)
        
        var url = '/api/test/'+ testKey +'/flow/'+flowKey;

        console.log(url);

        $http.post(url)
        .success(function(data){
          console.log('the flow object from overview', data);
            // set new location path
            $location.path('/summary/'+data._id+'/flow/');
        })
        .error(function(data){
            console.log('touched error message');
        })
    }

    $scope.editSummary = function(summary){
        // this is going to require some thinks!
        // we do not currently Get things by Summary so.
        // $location.path('/summary/'+summary._id+'/flow/');
    }

    // Launch the current report
    $scope.loadReport = function(testKey){
        console.log('touched a report', testKey);
        $location.path('/report/'+ testKey +'/');
    }

    $scope.viewFlowReport = function(flow, testKey){
        console.log('touched a flow report', testKey,flow);
        $location.path('/report/'+ testKey +'/flow/'+flow.title);
    }
}])

// ACTIVE TEST CONTROLLER =====================================================
.controller('run', ['$scope','$http', '$stateParams','$state', function($scope, $http,$stateParams,$state){
    // set up controller-wide variables
    $scope.session = {};
    $scope.flows = {};
    $scope.step = {};
    $scope.user = {};

    $scope.timeline = []; // holds all messages currently in flow

    // refresh warning to prevent whoops-I-deleted-the-Session
    var leavingPageText = "If you refresh, you will lose this test.";
    window.onbeforeunload = function(){
        return leavingPageText;
    }

    $scope.$on('$destroy', function() {
        window.onbeforeunload = undefined;
    });

    $scope.$on('$locationChangeStart', function(event, next, current) {
        if(!confirm(leavingPageText + "\n\nAre you sure you want to leave this page?")) {
            event.preventDefault();
        }
    });


    // this has to change to get the new session created on the run() command from the main controller
    $http.get('/api/test/'+$stateParams.testKey+'/session/'+$stateParams.sessionId)
        .success(function(data){
            $scope.session = data;

            var flows = [];
            for (var i in data.flows){
                if(data.flows[i].steps.length > 0){
                    flows.push(data.flows[i]);
                }
            }

            $scope.flows = flows;
            
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

        $scope.addUser = function(textfield){

            console.log(textfield);
            var url = '/api/test/'+ $scope.session.testKey+'/session/'+ $scope.session._id;
            var dataOut = { 'user': textfield };
            
            $http.put(url, dataOut)
                .success(function(data){
                    console.log('New user pushed: ', data);
                    $scope.user.name = textfield;
                    $scope.user.toggle = true;
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })

        }

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


        // this is going to be a find-join in mongoose where we find all TESTS by SESSION_ID 
        // then return that information to the summarize/report function.

        };

        $scope.putMessage = function(message){
            // here we create a note object because message was too confusing.
             var note = {};
             note.body = message;
             note.tags = [];
             note.created = new Date();
             note.session_id = $stateParams.sessionId;
             note.user_id = $scope.user.name;

             $scope.timeline.push(note);

            $scope.flows[$scope.parentIndex].user_id = $scope.user.name;
            var connect = $scope.flows[$scope.parentIndex].steps[$scope.selectedIndex]

            // if message has # with no space, post that to message.tags
            var hashCatch = new RegExp(/\S*#\S+/gi);
            var hashPull = new RegExp(/#/gi);
            var tagIt = message.match(hashCatch);          
            
            if (tagIt){
                for (var i=0; i < tagIt.length; ++i) {
                    var msg = tagIt[i].replace(hashPull,'');
                    note.tags.push(msg);
                }                
            }

            connect.messages.push(note);
            console.log(connect);
            // now we put that step's update into its session storage in the db

            var url = '/api/test/'+$stateParams.testId+'/session/'+$stateParams.sessionId;

            // mongoose does not permid _id queries on grandchildren, only parent.child.id(_id)
            var dataOut = $scope.flows[$scope.parentIndex];


            $http.put(url, dataOut)
                .success(function(data){
                    console.log('Message pushed: ', data);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })


            $scope.message='';
        }
}])

// EDIT A FLOW CONTROLLER =====================================================
.controller('flow', ['$scope','$http', '$stateParams','$state', function($scope, $http,$stateParams,$state){

    $scope.flow = [];

    $http.get('/api/test/'+$stateParams.testId+'/session/'+$stateParams.sessionId+'/flow/'+$stateParams.flowId)
        .success(function(data) {
            $scope.flow = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $scope.selected = $scope.flow.steps;

	$scope.add = function(step) {
        var keyGen = Math.round((new Date().valueOf() * Math.random()));

        $scope.step = {
        		title	: 'edit me',
                key     : keyGen,
        		desc	: '',        		
        		title_edit : false,
        		edit	: false
        	};
	    $scope.flow.steps.push($scope.step);  
    }
    
    $scope.removeStep = function(step){
    	step.edit=false;
    	step.title_edit=false;
    	var index = $scope.flow.steps.indexOf(step)
  		$scope.flow.steps.splice(index, 1);
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
	};

	$scope.blurTitle = function (step){
		// on losing the focus, save the name of the step
		step.title_edit = false;

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

    // $scope.doneEditing= function(step){
        
    // }

    $scope.select= function(step) {
       $scope.selected = step;
    };
    
    $scope.isActive = function(step) {
       return $scope.selected === step;
    };

    $scope.updateFlow = function(){
        // Put to this URL the entire data object from this controller
        // technically this is created when we hit Add on prev. page

        var putURL = '/api/test/'+$stateParams.testId+'/session/'+$stateParams.sessionId+'/flow/'+$stateParams.flowId;

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