// run.js
(function() {
    'use strict';
    // RUN CONTROLLER ===========================================================

    angular.module('field_guide_controls').controller('run', 
    ['$scope','$http', '$location','$stateParams','$state', '$rootScope', 'socket', 
    function($scope,  $http ,  $location , $stateParams , $state , $rootScope, socket){
        
        // set up controller-wide variables
        $scope.update = [];
        
        $scope.timeline = []; // holds all messages currently in test
        $scope.glued = true;

        console.log('user', $rootScope.user);

        $http
            .get('/api/run/'+$stateParams._id)
            .success(function(data){
                // this should return an ordered nav list
                // with a test at position 0

                $scope.navlist = data;
                $scope.kind = data[0].kind;

                // reset variables to clear cache from state changes.
                $scope.task = {};
                var message = {};
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

            $scope.adding_task = $scope.adding_task ? false : $scope.adding_task;

            task._test = $stateParams._id;
            task._index = $scope.test._tasks.length;
            
            $http
                .post('/api/task/', task)
                .success(function(data){
                    $scope.test._tasks.push(data);
                });

        };

        $scope.select = function(index) {
            $scope.selected = $scope.navlist[index];

            mixpanel.track('Task changed', {});

            var m   = ( index === 0 ) ? 
                    { title: 'Starting test', body: $scope.test.name } :
                    { title: 'Starting task', body: $scope.selected.name };

            $scope.timeline.push(m);

            // get the id of the selected object, 
            // update it with the new subject when we finish the test.
            var arr = _.pluck($scope.update, '_id');
            var id = $scope.selected._id;

            if(arr.indexOf($scope.test._id) === -1){
                $scope.update
                    .push({ 
                    '_id' : $scope.selected._id, 
                    '_subject' : $scope.subject._id 
                });
            }
        };


        $scope.addSubject = function(subject){
            subject.name     = subject.name;
            subject.testroom = subject.testroom || '';
            subject.test     = $stateParams._id;

            $http
                .post('api/subject/', subject)
                .success(function(data){
                    $scope.subject = data;
                    $scope.live = true;
                    $scope.select(0,0);

                    socket.emit('channel', {room : subject.testroom, test: subject.test});
                    mixpanel.track('Add Participant Name', {});
                });
        };

        $scope.postMessage = function(message){
            // here we create a note object
            if(message.length <= 0){
                return ;
            } else {
                var note = {};

                note.body = message;

                note.created = new Date();
                note._task = $scope.selected._id;
                note._test = $scope.selected._test;
                note._subject = $scope.subject._id;

                $scope.timeline.push(note);

                $http
                    .post('/api/message/', note)
                    .success(function(data){
                        $scope.message='';
                    });
            }
        };

        $scope.postTest = function(){
            // Send tasks that have had a subject added to the DB.
            mixpanel.track('Test completed', {});

            $http
                .post('/api/run/', $scope.update)
                .success(function(data){
                    $location.path('/overview');
                });

        };
    }]);
})();