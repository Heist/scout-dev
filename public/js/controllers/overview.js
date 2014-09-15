'use strict';
// overview.js

// OVERVIEW CONTROLLER ===========================================================
angular.module('field_guide_controls').controller('overview', ['$scope','$http', '$location', '$stateParams', function($scope, $http, $location, $stateParams){
    
    // get all sessions and their flows on first load
    $http.get('/api/session/', {timeout : 5000})
        .success(function(data) {
            $scope.sessions = data;
            
            // select the default active session, if there is one.
            if($stateParams.session_id){
                for (var i = 0; i < data.length; i++){
                    console.log(data[i]._id, $stateParams.session_id)
                    if(data[i]._id == $stateParams.session_id){
                        $scope.selected = data[i];
                    }    
                }
                
            } else {
                $scope.selected = data[0]
            }
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

        var data_out = {name:session.name};

        $http.put(url, data_out)
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
                // TODO add an auto-select for the new session here
                 $scope.selected = data[data.length-1];
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
                $scope.selected = $scope.sessions[$scope.sessions.length-1];
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }

    // Add and remove flows from tests.
    $scope.postFlow = function(session){
            console.log('touched addaflow ', session);

            var flow = {};

            flow.name = 'New flow name';
            flow._session = session._id;

            var url = '/api/flow/';
            var data_out = flow
            
            $http
                .post(url, data_out)
                .success(function(data){
                    console.log('new flow added '+ JSON.stringify(data));
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
        console.log('touched flow', flow)
        $location.path('/edit/flow/'+ flow._id);        
    }
     
    $scope.runTest = function(session){
        $location.path('/run/'+session._id);
    }

    // add a new summary and launch summary
    $scope.summarizeFlow = function(flow_id){

        console.log('touched key', flow_id)
        $location.path('/summary/'+ flow_id);
    }

    // Launch the current report
    $scope.loadReport = function(session_id){
        console.log('touched a report', session_id);
        $location.path('/report/session/'+ session_id );
    }

    $scope.viewFlowReport = function(flow_id){
        console.log('touched a flow report', flow_id);
        $location.path('/report/flow/'+flow_id);
    }
}])