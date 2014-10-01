'use strict';
// overview.js

// OVERVIEW CONTROLLER ===========================================================
angular.module('field_guide_controls')
    .controller('overview', ['$scope','$http', '$location', '$stateParams', function($scope, $http, $location, $stateParams){
    
    // get all sessions and their tests on first load
    $http
        .get('/api/test/', {timeout : 5000})
        .success(function(data) {
            $scope.tests = data;
            console.log('tests', data)
            // initially selected 
            // $scope.selected = data[0];
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    // SESSION ROUTES =====================================

    $scope.select = function (session){
        console.log('touched session', session)
        $scope.selected = session;
    }

    // edit titles inline.
    $scope.editTitle = function(textfield){
        textfield.editing = 'true';
    }

    $scope.blurTitle = function(session){
        
        $scope.editedTitle = null;
        session.editing ='false';
        
        
        var url = '/api/session/'+session._id;
        
        if (!session.name) {
            session.name = 'New Session';
        }

        var data_out = {name : session.name};

        $http.put(url, data_out)
                .success(function(data){
                    console.log('sent new title : ', data);
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
    }

    $scope.addSession = function(session){
        
        $http.post('/api/session/')
            .success(function(data){

                console.log('added a new session '+ JSON.stringify(data));
                
                $scope.sessions.push(data);

                // TODO add an auto-select for the new session here
                 $scope.selected = $scope.sessions[$scope.sessions.length-1];
            })
            .error(function(data){
                console.log('error', data)
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
                console.log('error', data)
            })
    }

    // TEST ROUTES ========================================
    $scope.newTest = function(){
            // console.log('touched addatest', $stateParams.user_id );

            var test = {};

            test.name = 'New test name';
            // test.created_by = $stateParams.user_id;

            var url = '/api/test/';
            var data_out = test;
            
            $http
                .post(url, data_out)
                .success(function(data){
                    console.log('new test added '+ JSON.stringify(data));
                    $scope.tests.push(data);
                })
                .error(function(data){
                    console.log('error', data)
                })
    }

    $scope.removeTest = function(test){ 
        // delete a test from the database
        var url = '/api/test/'+test._id;

        var index = $scope.tests.indexOf(test);
        $scope.tests.splice(index, 1);

        $http
            .delete(url)
            .success(function(data){
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }

    $scope.editTest = function(test){
        console.log('touched test', test)
        $location.path('/edit/test/'+ test._id);        
    }
     
    $scope.runTest = function(test){
        console.log('touched run', test._id)
        $location.path('/run/'+test._id);
    }

    $scope.summarizeTest = function(test_id){
        console.log('touched summary', test_id)
        $location.path('/summary/'+ test_id);
    }

    $scope.loadReport = function(test_id){
        console.log('touched a report', test_id);
        $location.path('/report/'+ test_id);
    }


}])