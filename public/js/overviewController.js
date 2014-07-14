'use strict';

// overviewController.js

angular.module('scoutApp.controllers').controller('overview', ['$scope','$http', '$location', function($scope, $http, $location){
	// set up controller-wide variables
	$scope.sessions = {};
    $scope.tests = {};

	// get all sessions and their flows	on first load
	$http.get('/api/test/')
		.success(function(data) {
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
                // console.log ($scope.sessions[i].ismodel);
                console.log (i +' '+ data[i].testKey);
                    if (data[i + 1].testKey == data[i].testKey) {
                        ssincount++
                        console.log('ssincount'+ssincount);
                    }else{
                        ssin.push({'testKey' : data[i].testKey, 'ssincount' : ssincount});
                        console.log(JSON.stringify(ssin));
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

            // TODO clarify nomenclature around tests/sessions/wfte
            // TODO fuck it this can go in reporting and I'll fix later.
            $scope.tests = ssin;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

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
   

    $scope.addAndLaunchNewTest = function(session){
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
                $location.path('/run/'+data._id+'/test/'+data.testKey);
            })
            .error(function(data){
                console.log(JSON.stringify(data))
        });

        // this changes to the returned session id, which has been newly created.

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


        var url = '/api/'+$scope.sessions[session]._id+'/flow/'+$scope.sessions[session].flows[flow]._id;
        
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
}]);