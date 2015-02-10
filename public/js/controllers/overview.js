// overview.js
(function() {
    'use strict';

    // OVERVIEW CONTROLLER ===========================================================
    angular.module('field_guide_controls')
        .controller('overview', ['$scope','$http', '$location', '$stateParams','$rootScope', function($scope, $http, $location, $stateParams, $rootScope){
        
        // get all sessions and their tests on first load
        $http
            .get('/api/test/', {timeout : 5000})
            .success(function(data) {
                $scope.tests = data;
                console.log('tests', data);
                // initially selected 
                // $scope.selected = data[0];
                if($rootScope.user.onboard === 2){

                }
                if($rootScope.user.onboard === 3 || $rootScope.user.onboard === 4 || $rootScope.user.onboard === 5 ){
                    $location.path('/run/'+$scope.tests[0]._id);
                }
                if($rootScope.user.onboard === 6 && $scope.tests.length > 0){
                    $location.path('/summary/'+$scope.tests[0]._id);
                }
                if($rootScope.user.onboard === 7 && $scope.tests.length > 0){
                    $location.path('/report/'+$scope.tests[0]._id);
                }

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection

        // TODO: check the onboard number
        // if the onboard number requires a route change, change the route.
        // check for the name of the appropriate test, as it may no longer exist in the DB
        // or possibly should have permit locks on it.
        // Tests do not have actual permit locks on them now, do they.
        // else just continue as normal.
        console.log('onboard', $rootScope.user.onboard);

        $scope.changeOnboard = function(num){
            $rootScope.user.onboard = num;

            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = { onboard : $rootScope.user.onboard };

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log(data);
                });
        };
        // SESSION ROUTES =====================================

        $scope.select = function (session){
            console.log('touched session', session);
            $scope.selected = session;
        };

        // edit titles inline.
        $scope.editTitle = function(textfield){
            textfield.editing = 'true';
        };

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
                    });
        };

        $scope.addSession = function(session){
            
            $http.post('/api/session/')
                .success(function(data){

                    console.log('added a new session '+ JSON.stringify(data));
                    
                    $scope.sessions.push(data);

                    // TODO add an auto-select for the new session here
                    $scope.selected = $scope.sessions[$scope.sessions.length-1];
                })
                .error(function(data){
                    console.log('error', data);
                });   
        };
       
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
                    console.log('error', data);
                });
        };

        // ONBOARDING ROUTES ==================================
        // user.onboard = 100 ---> hide onboarding

        $scope.changeOnboard = function(num){
            console.log($rootScope.user);
            // turn off the main user's onboarding and save
            $rootScope.user.onboard = num;

            var url = '/api/user/'+$rootScope.user._id;
            var dataOut = {onboard : $rootScope.user.onboard};

            $http
                .put(url, dataOut)
                .success(function(data){
                    console.log(data);
                });
        };

        // TEST ROUTES ========================================
        $scope.devTest = function(){
            console.log('get me some tests');
            
            $http.post('/api/test/dev_tests/')
                .success(function(data){
                    $scope.tests.push(data);
                });
        };

        $scope.newTest = function(){
                console.log('touched addatest');
                
                var test = {};

                if($rootScope.user){
                    console.log('rootScope user set', $rootScope.user);
                    test.created_by = $rootScope.user;
                   
                    mixpanel.track('Add new test', { 'user' : $rootScope.user });


                }else{
                    console.log('whoops, needs a checkin');
                }

                var url = '/api/test/';
                var data_out = test;
                
                $http
                    .post(url, data_out)
                    .success(function(data){
                        console.log('new test added '+ JSON.stringify(data));
                        $location.path('/edit/test/'+ data._id);
                        $scope.tests.push(data);
                    })
                    .error(function(data){
                        console.log('error', data);
                    });
            };

        $scope.removeTest = function(test){ 
            // delete a test from the database
            // if (confirm("sure to delete") === true) {
                var url = '/api/test/'+test._id,
                index = $scope.tests.indexOf(test);
            
                $scope.tests.splice(index, 1);

                $http
                    .delete(url)
                    .success(function(data){
                        console.log(data);
                    })
                    .error(function(data){
                        console.log('Error: ' + data);
                    });
            // }        
        };

        $scope.dupeTest = function(test){
            console.log('touched dupe test', test._id);

            var url = '/api/test/'+test._id;
            var data_out = test;
            
            $http
                .post(url, data_out)
                .success(function(data){
                    console.log('new test added '+ JSON.stringify(data));
                    $scope.tests.push(data);
                })
                .error(function(data){
                    console.log('error', data);
                });
        };

        $scope.editTest = function(test){
            console.log('touched test', test);
            $location.path('/edit/test/'+ test._id);
        };

        $scope.watchTest = function(test){
            console.log('touched watch', test);
            $location.path('/watch/'+test._id);
        };
         
        $scope.runTest = function(test){
            console.log('touched run', test._id);
            $location.path('/run/'+test._id);
            mixpanel.track('Run test', { 'user': $rootScope.user });
        };

        $scope.summarizeTest = function(test_id){
            console.log('touched summary', test_id);
            $location.path('/summary/'+ test_id);
            mixpanel.track('Summary clicked', {});
        };

        $scope.loadReport = function(test_id){
            console.log('touched a report', test_id);
            $location.path('/report/'+ test_id);
        };

    }]);
})();