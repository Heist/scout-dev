// run.js
(function() {
    'use strict';
    // RUN CONTROLLER ===========================================================

    angular.module('field_guide_controls').controller('run', 
    ['$scope','$http', '$location','$stateParams','$state', '$rootScope', 'socket', 
    function($scope,  $http ,  $location , $stateParams , $state , $rootScope, socket){
        
        // set up controller-wide variables
        $scope.update = {};
        $scope.update.tasks = [];

        $scope.timeline = []; // holds all messages currently in test
        $scope.glued = true;

        console.log('user', $rootScope.user);

        $http
            .get('/api/run/'+$stateParams._id)
            .success(function(data){
                $scope.test = data;
                $scope.kind = data[0].kind;

                // reset variables to clear cache from state changes.
                $scope.task = {};
                var message = {};

                // Subject has been created, now open a room with that subject_id
            });

    // ONBOARDING =========================================
        // TODO: Abstract into service for dependency injection

        $scope.changeOnboard = function(num){
            if($rootScope.user.onboard !== 100){
                $rootScope.user.onboard = num;
    
                var url = '/api/user/'+$rootScope.user._id;
                var dataOut = {onboard : $rootScope.user.onboard};
    
                $http
                    .put(url, dataOut)
                    .success(function(data){
                        console.log($rootScope.user);
                        if($rootScope.user.onboard === 6 ){
                            $location.path('/summary/'+$scope.test._id);
                        }
                    });
            } else {
                return; 
            }
        };


    // SOCKET ROUTES - 0.9 ============================================== 
    // for 1.0 check socket_routes_1.js in /server/
        
    // RECIEVE SCREENCAPS FROM THE SOCKET ===============================
        var canvas = document.getElementById('feed'),
            image = document.getElementById('ia'),
            context = canvas.getContext('2d');

        $scope.connect = {};
        $scope.connect.text = '71b';

        $scope.subscription = function(chan){
            // console.log('touched a channel', chan);
            // socket.emit('subscribe', { room: chan, test: $stateParams._id });
            // socket.emit('channel', { room: chan, test: $stateParams._id });
        };

        socket.on('connect_failed', function(data)
        {
            // console.log('connect_failed');
        });

        socket.on('connecting', function(data)
        {
            // console.log('connecting');
        });
        socket.on('disconnect', function(data)
        {
            // console.log('disconnect');

            // image.src = "/layout/assets/avatar-binocs.jpg";
            // canvas.width = 358;
            // canvas.height = 358 * image.height / image.width;

            // context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);

            // socket.socket.disconnect();
        });

        socket.on('error', function(reason)
        {
            // console.log('error', reason);
        });
        socket.on('reconnect_failed', function(data)
        {
            // console.log('reconnect_failed');
        });
        socket.on('reconnect', function(data)
        {
            // console.log('reconnect');
            // socket.emit('channel', {room : $scope.subject.testroom, test: $stateParams._id});
        });
        socket.on('reconnecting', function(data)
        {
            // console.log('reconnecting');
        });

        socket.on('announce', function(data){
            // console.log('announce', data);
        });

        socket.on('joined_channel', function(data){ 
            // console.log('joined_channel', data);
        });

        socket.on('note', function(data){
            // console.log('note', data);
            $scope.timeline.push(data.note.msg);
            $scope.$apply();
        });

        socket.on('subject', function(data){
            socket.emit('join_subject_test', data);
        });

        socket.on('message',function(data) {
            // console.log('message');
            image.src = "data:image/jpg;base64,"+data;
            canvas.width = 358;
            canvas.height = 358 * image.height / image.width;

            context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
            // context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
        });


    // ANGULAR ROUTES ===================================================
        $scope.addTask = function(task){
            if($scope.adding_task){
                $scope.adding_task=false;
            }

            var dataOut = { 
                name : task.name,
                desc : task.desc,
                _test : $stateParams._id,
                index : $scope.test._tasks.length
            };
            
            $http
                .post('/api/task/', dataOut)
                .success(function(data){
                    $scope.test._tasks.push(data);
                });

        };

        $scope.select = function(testIndex, taskIndex) {
            var test = $scope.test;
            $scope.selected = test._tasks[taskIndex];

            mixpanel.track('Task changed', {});

            // select
            // pushes the identity of a test or task
            // to the update array
            // which is then output to server when things are updated
            // this prevents the session from bulk-updating everything onscreen
            // if it has not in fact been touched.

            if(taskIndex === 0){
            
                var m   = {};
                m.title = 'Starting test';
                m.body  = test.name;

                $scope.timeline.push(m);

                if($scope.update.tests.indexOf(test._id) === -1){
                    $scope.update.tests.push(test._id);
                    $scope.subject._tests.push(test._id);
                }
            }

            var em   = {};
            em.title = 'Starting task';
            em.body  = test._tasks[taskIndex].name;

            $scope.timeline.push(em);

            if($scope.update.tasks.indexOf(test._tasks[taskIndex]._id) === -1){
                $scope.update.tasks.push(test._tasks[taskIndex]._id);
            }
        };


        $scope.addSubject = function(subject){
            $scope.subject = subject;

            var url = 'api/subject/';
            var data_out = {name : subject.name, testroom: subject.testroom, test: $stateParams._id};

            $http
                .post(url, data_out)
                .success(function(subject){
                    $scope.subject = subject;
                    $scope.live = true;
                    $scope.select(0,0);

                    mixpanel.track('Add Participant Name', {});
                    socket.emit('channel', {room : $scope.subject.testroom, test: $stateParams._id});
        
                })
                .error(function(data){
            });
        };

        $scope.postMessage = function(message){
            // here we create a note object
            if(message.length <= 0){
                return;
            } else {
                var note = {};

                note.body = message;
                note.tags = [];
                note.created = new Date();
                 
                note._task = $scope.selected._id;
                note._test = $scope.selected._test;
                note._subject = $scope.subject._id;

                $scope.timeline.push(note);

                // TODO: this will catch things on both sides of the hash. 
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


                var url = '/api/message/';
                var data_out = note;

                $http
                    .post(url, data_out)
                    .success(function(data){
                        $scope.message='';
                    });
            }
        };

        $scope.postTest = function(){
            // collects all the tests and steps and outputs them as a collected object
            // to the session api link
            // where they are parsed 
            // and their individual subject lists are updated.
            
            var url = '/api/run/';
            var data_out = {test: $scope.test, tasks: $scope.update.tasks, subject: $scope.subject._id};
            mixpanel.track('Test completed', {});

            $http
                .post(url, data_out)
                .success(function(data){
                    console.log('Updated tests', data);
                    $location.path('/overview');
                });

        };
    }]);
})();