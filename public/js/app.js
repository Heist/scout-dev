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

/// app list
scoutApp.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
	$locationProvider
		.html5Mode(true);

    $stateProvider        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partials/overview.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('flow', {
        	url: '/edit/test/:testId/session/:sessionId/flow/:flowId',
            templateUrl: 'partials/flow.html'
        })
        .state('run', {
        	url: '/run/test/:testId/session/:sessionId',
            templateUrl: 'partials/run.html'
        })
        .state('summarizeFlow', {
            url: '/summarizeFlow/:sessionKey/flow/:flowname',
            templateUrl: 'partials/summarizeFlow.html'
        })
        .state('summarizeTags', {
            url: '/summarizeFlow/:sessionKey/tags/:flowname',
            templateUrl: 'partials/summarizeTags.html'
        })
        ;

})

 
.filter('htmlize', ['$sce', function($sce){
        return function(message) {

            var hashCatch = new RegExp(/\S*#\S+/gi); 
            var tagIt = message.match(hashCatch);
            
            var msg = message.replace(hashCatch, "<span class='tag'>$&</span>");

            return $sce.trustAsHtml(msg);
        };
}])

// SUMMARIZE CONTROLLER ========================================================
.controller('summarizeFlow', ['$scope','$http', '$location', '$stateParams','$state','$sanitize', function($scope, $http, $location,$stateParams,$state, $sanitize){
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
    
    $http.get('/api/summary/'+$stateParams.sessionKey+'/flow/'+$stateParams.flowname)
        .success(function(data){
            
            // early experiments in appropriate data structures.

            function step(name, messages){
                this.name = name;
                this.messages = messages;
            }

            var stepcollector = [];
            var stepnamecheck = [];
            var counter;
            var flowname = data.flows[0].title;
            
            // this finds all messages in all steps in the stack and pushes them up
            for (var j = 0; j < data.flows.length; j++){
                var name = data.flows[j].title;
                name = name.replace(/ /g,'');

                for (var k = 0;  k < data.flows[j].steps.length; k++){
                    var step = data.flows[j].steps[k];
                    var name = step.title;                    
                    if (!(stepnamecheck.indexOf(name) != -1)){
                        stepnamecheck.push(name);
                        stepcollector.push({name : name, session_by_user : [], pass_fail : false });
                    } else if (stepnamecheck.indexOf(name) != -1){
                        for ( var l in stepcollector){
                            if (name == stepcollector[l].name){

                                var pusher = {'user' : data.flows[j].user_id, 'messages' : data.flows[j].steps[k].messages }
                                stepcollector[l].session_by_user.push(pusher);
                            };
                        }
                    }
                }
            }

            // console.log('stepcollector after message collection', stepcollector )

            // the tagstripper and reorganizer
            var tagcollector = [];
            var tagnamecheck = [];
            for (var i in stepcollector){
                for (var j = 0 ; j < stepcollector[i].session_by_user.length; j ++){
                    for (var k = 0 ; k < stepcollector[i].session_by_user[j].messages.length; k++){
                        for (var l = 0; l < stepcollector[i].session_by_user[j].messages[k].tags.length; l++){
                            if(!(tagnamecheck.indexOf(stepcollector[i].name) != -1)){
                                tagnamecheck.push(stepcollector[i].name);

                                // console.log('checking to see if tags are already visible/no', stepcollector[i].session_by_user[j].messages[k].tags[l] )
                                
                                var tagMaker = stepcollector[i].session_by_user[j].messages[k].tags[l];
                                tagcollector.push({name : stepcollector[i].name, tags : [ tagMaker ] });
                                
                            }else if (tagnamecheck.indexOf(stepcollector[i].name) != -1){
                                for (var m in tagcollector){
                                    if (stepcollector[i].name == tagcollector[m].name){

                                        var tagMaker = stepcollector[i].session_by_user[j].messages[k].tags[l];
                                        tagcollector[m].tags.push(tagMaker);
                                    }
                                }
                            }
                        }    
                    }
                }
            }

            var tags_for_flow = [];
            // integrate tags to stepcollector for a clean object
            for (var i in stepcollector){
                for (var j in tagcollector){
                    if (stepcollector[i].name == tagcollector[j].name ){
                        // get all tags per step and post to stepcollector.tags
                        // this should push to the flow itself for a count later on.
                        // console.log('tagcollector j', tagcollector[j])

                        var tags = tagcollector[j].tags;
                        tags.sort();
                        // console.log('tags', tags.length ,JSON.stringify(tags));
                        // stepcollector[i].tags = tags;

                        // de-dupe array, then post to tags_single
                        //  so we summarize and visible.
                        var tagDupe = [];
                        var tagCount = 0;
                        var curTag = null;

                        for (var k = 0; k < tags.length +1; k++){
                            if (tags[k] != curTag){     
                                if (tagCount > 0) {
                                    tagDupe.push({body: curTag.replace(/#/gi,''), count : tagCount});
                                }

                                curTag = tags[k];
                                tagCount = 1;
                            } else {
                                tagCount++;
                            }
                        }

                        // weirdly, this returns an object into tagDupe.
                        // console.log('tagDupe', tagDupe);

                        tags = [];
                        for ( var key in tagDupe ){
                            tags.push({body: tagDupe[key].body, count : tagDupe[key].count, visible: true});
                            tags_for_flow.push({body: tagDupe[key].body, count : tagDupe[key].count, summary :''});
                        }

                        // push single tags to each flow step
                        stepcollector[i].tags_single = tags;
                    }
                }
            }

            tags_for_flow.sort(keysrt('body'));
            
            for (var i = 0; i < tags_for_flow.length -1 ; i++){
                    
                if ( tags_for_flow[i].body == tags_for_flow[i+1].body ){
                    
                    var total = tags_for_flow[i].count + tags_for_flow[i+1].count;
                    tags_for_flow.splice(i, 1);
                    tags_for_flow[i].count = total;
                    console.log(tags_for_flow[i].count);
                }
            }

            $scope.flow = {'title': flowname, 'steps' : stepcollector, 'tags': tags_for_flow } ;
            console.log('flow', $scope.flow);
        })

    $scope.activate = function (index, parentIndex, step) {
        $scope.selectedIndex = index;
        $scope.parentIndex = parentIndex;

        // passes the step title to the global variable from flows[0].steps[step]
        // $scope.step.title = step.name;
        $scope.step = step;
        console.log('step', $scope.step);

        //pass all of the tags inside of flows[allflows].steps[step] to an array 
    };

    $scope.summarizeTags = function (flow){
        $location.path('/summarizeFlow/'+ $stateParams.sessionKey +'/tags/'+$stateParams.flowname);
    }

    $scope.selectTag = function (tag){
        $scope.selectedTag = tag;
        console.log('touched selectTag', tag.body);
    }

    $scope.clearSummary = function(summary){
        summary.text = '';
    }

    $scope.completeSummary = function(summary){
        // this is the Save A New Summary button
        // it saves a summary in complete mode when done writing it up
        // then returns you to /
        var url = '/api/summary/'+ $stateParams.sessionKey +'/flow/'+ $stateParams.flowname;
        var dataOut = summary;

        console.log('post route',  url);
        
         $http.post(url, dataOut)   
            .success(function(data){
                console.log('added a new summary '+ JSON.stringify(data));
            })
            .error(function(data){

            });        

        $location.path('/');
    }

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
        console.log('step for checking step object contents', $scope.step);
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

        console.log('step for checking step object contents', $scope.step);
    }

   
}])

// OVERVIEW CONTROLLER ========================================================
.controller('overview', ['$scope','$http', '$location', function($scope, $http, $location){
    // set up controller-wide variables
    $scope.sessions = {};
    $scope.tests = {};

    // get all sessions and their flows on first load
    $http.get('/api/test/')
        .success(function(data) {
            // debug: this fixes the undefined headers error
            // $scope.sessions = data;

            // flows is *all* flows
            data.sort(keysrt('testKey'));
            
            // count up and post the number of ssins 
            var models = 0;
            var ssin = [];
            var tests = []; //for pushing tests to scope.sessions?
            

            var ssincount = 0;
                // for each model where ismodel is true

            // for each session with test number x
            // push it to a new ssins object in $scope
            for (var i = 0; i<data.length -1; i++){
                    if (data[i + 1].testKey == data[i].testKey) {
                        ssincount++
                    }else{
                        ssin.push({'testKey' : data[i].testKey, 'ssincount' : ssincount});
                        ssincount=0;
                    }
            }
            console.log(JSON.stringify(ssin));

            // return model sessions to the sessions scope for display and control
            for(var i =0; i<data.length; i++){
                if (data[i].ismodel){
                    tests.push(data[i]);
                }
            }
            // because we use sessions as a unit everywhere else
            $scope.sessions = tests;
            $scope.tests = ssin;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // edit titles inline.
    $scope.editTitle = function(textfield){
        textfield.editing = 'true';
        

        // Clone the original item to restore it on demand.
        // $scope.originalTitle = angular.extend({}, session);
    }

    $scope.blurTitle= function(session){
        session.editing ='false';
        $scope.editedTitle = null;
        
        // var index = $scope.session.flows.indexOf(flow);
        var url = '/api/'+session._id;
        
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
            })
            .error(function(data){

            });
        
        $http.get('/api/test/')
            .success(function(data) {
                // flows is *all* flows
                $scope.sessions = data;
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
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
    $scope.addAFlow = function(index, test){
            // this adds a flow to the test selectied
            // important because tests model sessions

            $scope.flow = {}
            $scope.flow.title = 'New Flow Name Goes Here';
            $scope.flow.steps = [];

            $scope.sessions[index].flows.push($scope.flow);

            // this is so .put can sniff what's going on
            var wrapper = { 'flow': $scope.flow };
            
            
            var url = '/api/test/'+test.testKey;
            console.log(url);
            
            $http
                .put(url, wrapper)
                .success(function(data){
                    console.log('new flow added '+ JSON.stringify(data));
                    $scope.sessions[index].flows = data.flows;
                    $scope.$apply;
                })
                .error(function(data){
                    console.log(JSON.stringify(data))
                })
                ;
    };
    
    $scope.removeFlow = function(session, flow){ 
        // this is probably fine once we're only returning sessions
        // with ismodel : true
        // because the session we're selecting is the test session, not
        // any sub-sessions.

        console.log('session, flow '+ session+' '+ flow);


        var url = '/api/test/'+$scope.sessions[session].testKey+'/session/'+$scope.sessions[session]._id+'/flow/'+$scope.sessions[session].flows[flow]._id;
        
        $scope.sessions[session].flows.splice(flow, 1);
        
        var dataOut = $scope.sessions[session];

        console.log(url);
        console.log(dataOut);

        $http.delete(url,dataOut)
            .success(function(data){
                console.log(JSON.stringify(data))
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

    // add a new summarizeFlow and launch summary
    $scope.summarizeFlow = function(session, flow){
        // strip flowname's whitespace
        
        flow = flow.replace(/ /g,''); 
        console.log(session, flow);

        // set new location path
        $location.path('/summarizeFlow/'+session+'/flow/'+flow);

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
    $http.get('/api/test/'+$stateParams.testKey+'/session/'+$stateParams.sessionId)
        .success(function(data){
            $scope.session = data;
            $scope.flows = $scope.session.flows;
            
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
            $scope.user.name = textfield;
            $scope.user.toggle = true;
            
            $scope.$apply

            // $scope.session.user = textfield;
            var wrapper = { 'user': textfield };

            var url = '/api/test/'+ $scope.session.testKey+'/session/'+ $scope.session._id;
            var dataOut = wrapper;

            
            $http.put(url, dataOut)
                .success(function(data){
                    console.log('New user pushed: ', data);
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
        $scope.step = {
        		title	: 'edit me',
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
	
	// what is our drag handle
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