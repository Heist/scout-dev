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
            url: '/edit/flow/:flow_id',
            templateUrl: 'partials/flow.html'
        })

        // RUN TEST ==========================================
        .state('run', {
            url: '/run/:sessionId',
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
    $http.get('/api/session/')
        .success(function(data) {
            console.log('data log', data);
            $scope.sessions = data;
            // $scope.selected = data[0];
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $scope.select = function (session){
        console.log('touched session', session)
        $scope.selected = session;
    }

    // edit titles inline.
    $scope.editTitle = function(textfield){
        textfield.editing = 'true';
    }

    $scope.blurTitle= function(session){
        session.editing ='false';
        $scope.editedTitle = null;
        
        // var index = $scope.session.flows.indexOf(flow);
        var url = '/api/session/'+session._id;
        
        if (!session.name) {
            session.name = 'New Session';
        }

        var dataOut = {name:session.name};

        $http.put(url, dataOut)
                .success(function(data){
                    console.log('sent new title : ', data);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
    }

    // Add and remove tests
    $scope.addSession = function(test){
        
        $http.post('/api/session/')
            .success(function(data){
                console.log('added a new session '+ JSON.stringify(data));
                $scope.sessions = data;
            })
            .error(function(data){

            });
        
    }
   
    $scope.removeSession = function(session){
        var url = '/api/session/'+session._id;
        var index = $scope.sessions.indexOf(session);

        $http.delete(url)
            .success(function(data){
                console.log(data);
                $scope.sessions.splice(index, 1);
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }

    // Add and remove flows from tests.
    $scope.addAFlow = function(session){
            console.log('touched addaflow ', session);

            var url = '/api/session/'+session._id+'/flow/';
            
            $http
                .post(url)
                .success(function(data){
                    console.log('new flow added '+ JSON.stringify(data));
                    // $scope.selected = data;
                    session.flows.push(data);

                })
                .error(function(data){
                    console.log(JSON.stringify(data))
                })
                ;
    };

    $scope.removeFlow = function(flow){ 
        // delete a flow from the database
        
        var index = $scope.selected.flows.indexOf(flow);
        var url = '/api/flow/'+flow._id;
        

        console.log('delete flow', url);
        console.log('index', index);
        console.log($scope.selected.flows[index])
        
        $scope.selected.flows.splice(index, 1);

        $http
            .delete(url)
            .success(function(data){
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }

    // move to the flow edit screen
    $scope.editFlow = function(flow){
        $location.path('/edit/flow/'+ flow._id);
    }
    
    $scope.runTest = function(session){
        $location.path('/run/'+session._id);
        // pass the session_id to the test screen, which
        // generates an id by user for messages
        // loads the relevant flows, in order
        // and their steps
        // and gets a user
        // and begins recording messages for that user_id
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


// EDIT FLOW CONTROLLER =====================================================
.controller('flow', ['$scope','$http', '$stateParams','$state', '$location', function($scope, $http,$stateParams,$state, $location){

    $scope.flow = [];

    $http.get('/api/flow/'+$stateParams.flow_id)
        .success(function(data) {
            $scope.flow = data;
            console.log('flow', $scope.flow)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

	$scope.addStep = function() {
        console.log('touched add a step');

        var url = '/api/flow/'+$stateParams.flow_id+'/step/';
        
        $http
            .post(url)
            .success(function(data){
                console.log('new step added '+ JSON.stringify(data));

                $scope.flow.steps.push(data);
            })
            .error(function(data){
                console.log(JSON.stringify(data))
            })
            ;
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

    $scope.updateFlow = function(){
        // Put to this URL the entire data object from this controller
        // technically this is created when we hit Add on prev. page
        console.log('touched update flow')

        var url = '/api/flow/'+$stateParams.flow_id;
        var data_out = $scope.flow;

        if (!$scope.flow.title){
            $scope.flow.title = 'New Flow Name Goes Here';
        }

        // reminder: this pushes an update to an already-created flow now
		$http
            .put(url, data_out)
            .success(function(data){
                console.log('flow has pushed', data);
             })
            .error(function(data){
                console.log('error', data)
            });

        $location.path('/');
	};
}])



// RUN CONTROLLER - RUNS A TEST =====================================================
.controller('run', ['$scope','$http', '$stateParams','$state', function($scope, $http,$stateParams,$state){
    // set up controller-wide variables
    $scope.session = {};
    $scope.flows = {};
    $scope.step = {};
    $scope.user = {};

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


    // TODO this has to change to get the new session created on the run() command from the main controller
    $http
        .get('/api/run/'+$stateParams.sessionId)
        .success(function(data){
            console.log('session', data)
            
            $scope.session = data;
            $scope.flows = data.flows;

            // // set the initial timeline contents
            var message = {};

            message.body = $scope.flows[0].title;
            message.title = 'Starting flow';
            $scope.timeline.push(message);

            // // set the initial reporting step
            $scope.step.current = $scope.flows[0].steps[0]._id;
        })

        // select the initial 'activated' values
        $scope.selectedIndex = 0;
        $scope.parentIndex = 0;

        $scope.addUser = function(textfield){
            console.log(textfield);            
            $scope.user.name = textfield;
            $scope.user.toggle = true;
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
}]);