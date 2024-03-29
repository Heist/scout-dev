// run.js
(function() {
    'use strict';
    // RUN CONTROLLER ===========================================================

    angular.module('field_guide_controls').controller('run', 
    [ 'loadData', 'testBuildFunctions', 'postMessage', '$scope','$http', '$location','$stateParams','$state', '$rootScope', 'socket', '$timeout',
    function(loadData, testBuildFunctions, postMessage, $scope,  $http ,  $location , $stateParams , $state , $rootScope, socket, $timeout){

        // removes the body scroll overflow hidden
        var bodyScroll = angular.element(document.querySelector('body'));
        bodyScroll.removeClass('overflow-hidden');

       // get the starting data from resolve
        var data     = loadData.data;
        var startTest = '';
        
        var tagSort  = function(tags){
         return _.filter(tags, function(n){
                if(n.name){
                    var nameCheck = n.name.toLowerCase();
                    return nameCheck !== 'summary';
                } else {
                    return
                }
            });
        };

        var summaryTagId = function(tags){
            return _.filter(loadData.data._tags, function(n){
                if(n.name){
                    var nameCheck = n.name.toLowerCase();
                    return nameCheck !== 'summary';
                } else {
                    return
                }
            })[0]._id;
        };

        $scope.test = data;
        $scope.kind = data.kind;
        $scope.navlist = data._tasks;
        
        $scope.tags = tagSort(data._tags);
    
    // set up and reset variables to clear cache from state changes.
        $scope.update = [];
        $scope.task = {};
        var message = {};
        
    // holds all messages currently in test
        $scope.timeline = []; 

    // make sure the scroll works
        $scope.glued = true;

    // JS Warning on Back button ==========================
    $scope.$on('$destroy', function() {
       window.onbeforeunload = undefined;
    });
    
    $scope.$on('$locationChangeStart', function(event, next, current) {
       if(!confirm("Are you sure you want to leave this page?")) {
          event.preventDefault();
       }
    });

    // ANGULAR ROUTES ===================================================
        $scope.cancelRun = function(){
            $location.path('/overview');
        };

        $scope.summarizeTest = false;

        $scope.summarizeModalToggle = function(){
            if($scope.summarizeTest || $scope.summarizeTest === true) {
                $scope.summarizeTest = false;
                return;
            }
            if($scope.summarizeTest || $scope.summarizeTest === false) {
                $scope.summarizeTest = true;
                return;
            }
        };

        $scope.addTask = function(task){
            $scope.adding_task = $scope.adding_task ? false : $scope.adding_task;
            
            testBuildFunctions.addTask($stateParams._id, task)
                .success(function(data){
                    $scope.test._tasks.push(data);
                });
        };

        $scope.select = function(index) {
            $scope.selected = $scope.navlist[index];

            $scope.timeline.push({ 
                title: 'Starting task', 
                body: $scope.selected.name,
                _id : 123
            });

            // get the id of the selected object, 
            // update it with the new subject when we finish the test.
            var arr = _.pluck($scope.update, '_id');
            var id = $scope.selected._id;

            if(arr.indexOf($scope.test._id) === -1){
                $scope.update
                    .push({ 
                    '_id' : $scope.selected._id, 
                    '_subject' : $scope.subject._id,
                    'doctype' : 'task',
                });
            }

            if($scope.test.kind === "prototype"){
                $timeout(function() {$('textarea#prototypeInput').focus() }, 150);
            } else {
                $timeout(function() {$('textarea#messageInput').focus() }, 150);
            }
        };


        $scope.addSubject = function(subject){

            subject.name     = subject.name;
            subject.testroom = subject.testroom || '';
            subject.test     = $stateParams._id;

            startTest = new Date();

            var intercom = {
                created_at : startTest.getHours()+':'+startTest.getMinutes(),
                test_kind : $scope.test.kind
            } ;
            
            Intercom('trackEvent', 'started-test', intercom );
            $timeout(function() { Intercom('update'); }, 1000, false);

            $http
                .post('api/subject/', subject)
                .success(function(data){
                    $scope.subject = data;
                    $scope.live = true;
                    $scope.select(0,0);

                    if($scope.test.kind === "prototype"){
                        $timeout(function() {$('textarea#prototypeInput').focus() }, 150);
                    } else {
                        $timeout(function() {$('textarea#messageInput').focus() }, 150);
                    }

                    // Avatar initials
                    // TODO: refactor into service or add to check in process
                    // This might be a good refactored into a directive,
                    // that gives you an avatar bubble

                    var firstInitial = '';
                    var firstLastInitials = '';

                    // user's entered words changes to an array of strings separated by commas
                    var participantName = data.name.split(' ');

                    for(var i = 0; i < participantName.length; i++){

                        if (i === 0){
                            // set firstInitial to equal participant's name first letter
                            firstInitial = participantName[i].substr(0,1);
                        }  else {

                            // create a new variable to set participant's first initial
                            var secondInitial = participantName[i].substr(0,1);

                            // concat's first initial with second initial
                            firstLastInitials = firstInitial.concat(secondInitial);
                        }
                    }

                    // if first initial's length is greater than 0, have directive set to firstLastInitials which concats two initials
                    if (firstLastInitials.length > 0){
                        $scope.subject.initials = firstLastInitials;
                    } else  {
                        $scope.subject.initials = firstInitial;
                    }

                    socket.emit('channel', {room : subject.testroom, test: subject.test});
                });
        };

         // MESSAGE FUNCTIONS ==================================
        $scope.messageEditToggle = '';

        $scope.editMessage = function(message){
            // clear this on blur to block weird toggle bug
            $scope.messageEditToggle = message._id;
            $timeout(function() {$('textarea#editMessage').focus() }, 150);
        };

        $scope.saveEdit = function(message){
            $scope.messageEditToggle = '';
            if($scope.test.kind === "prototype"){
                $timeout(function() {$('textarea#prototypeInput').focus() }, 150);
            } else {
                $timeout(function() {$('textarea#messageInput').focus() }, 150);
            }
            
            $http.put('/api/message/', message)
                .success(function(data){                 
                    

                 // remove the previous message and insert the new one
                    $scope.tags = tagSort(data.tags);

                    var arr = $scope.timeline;
                    var item;

                   for(var i = 0; i < arr.length; i++){
                        if(arr[i]._id && arr[i]._id === message._id){
                            item = i
                        }
                    }
                    
                    arr.splice(item, 1, data.msg);

                    $scope.timeline = arr;
                });
        };

        // this is a detection from the message emitter directive.
        $scope.$on('message', function(e, data){
            e.stopPropagation();
            if(data.length <= 0){
                return ;
            } else {
                postMessage(data, $scope.selected._id, $scope.selected._test, $scope.subject._id )
                    .then(function(data){
                        
                        $scope.timeline.push(data.msg);
                        $scope.tags = tagSort(data.tags);
                    });
            }
        })

        // SUMMARY MESSAGES =====================
        $scope.addMessageToSummaryTag = function(message){
            var duration = new Date();
            if (duration < startTest) {
                duration.setDate(duration.getDate() + 1);
            }

            var diff = duration - startTest;

            var msec = diff;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;

             var intercom = {
                test_kind : $scope.test.kind,
                created_at : startTest.getHours()+':'+startTest.getMinutes(),
                duration  : mm+"min"
            } ;
            
            Intercom('trackEvent', 'ended-test', intercom );
            $timeout(function() { Intercom('update'); }, 1000, false);
            // on creation of test, there is a tag created called Summary.
            // find that message and post to it.
            //  loadData.data._tags
            if(message){
                postMessage(message+' #Summary', summaryTagId, $stateParams._id, $scope.subject._id)
                        .then(function(msg){
                            console.log('message posted to summary', msg)
                            $location.path('/overview');
                        });
            } else {
                
                return;
            }

        }

        // END TEST =============================
        $scope.postTest = function(){
            // Send tasks that have had a subject added to the DB.

            $http
                .post('/api/run/', $scope.update)
                .success(function(data){
                    $location.path('/overview');
                });

        };
    }]);
})();