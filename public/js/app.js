// app.js
'use strict';

var field_guide_app = angular.module('field_guide_app',['ui','ui.router', 'ngSanitize','field_guide_controls','field_guide_filters']);

// function list for working with arrays

// sorts an array of objects by key.
function keysrt(key,desc) {
        return function(a,b){
            return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
        };
    }

function keygen(){
    return Math.round((new Date().valueOf() * Math.random()));
}

// FRONT-END ROUTE CONFIGURATION ==============================================
field_guide_app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider) {
	
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.timeout = 3000;

    // TODO: this should probably be an Interceptor, but it works on load for now.
    function checkLoggedin($q, $timeout, $http, $location, $rootScope){ 
        // console.log('checking logged in identity');
        // Make an AJAX call to check if the user is logged in
        var deferred = $q.defer(); 

        $http
            .get('/loggedin')
            .success(function(user){
                // Authenticated
                if (user !== '0') {
                    console.log('this user successfully logged in', user);
                    $rootScope.user = user;
                    $timeout(deferred.resolve, 0);
                }

                // Not Authenticated 
                else { 
                    console.log('welp, that flunked', user);
                    $rootScope.userNote = 'You need to log in.'; 
                    $timeout(function(){deferred.reject();}, 0);

                    var loc = $location.url();
                    var patt = new RegExp(/\/report/i);
                    var isReport = patt.test(loc);

                    if( !isReport){
                        $location.url('/login');
                    }
                }
            })
            .error(function(err){
                console.log(err);
            });
        // }
        
    }

    $urlRouterProvider.otherwise("/login");
    // $urlRouterProvider.otherwise("/overview");


    $stateProvider
    // PUBLIC ROUTES ================================================
        
        // WATCH A TEST ===================================
        // .state('watch', {
        //     // url: '/watch/',
        //     url: '/watch/:_id',
        //     controller:'watch',
        //     templateUrl: 'partials/app/watch.html'
        // })
        
    // PRIVATE ROUTES ===============================================

        // REPORT PAGE FOR SINGLE TEST ====================
        .state('report', {
            url: '/report/:test_id',
            controller:'report',
            templateUrl: 'partials/app/report.html',
            resolve: { loggedin: checkLoggedin }
        })

        // ACCOUNT MANAGEMENT =============================
        .state('account', {
            url: '/account',
            controller: 'account',
            templateUrl : 'partials/app/account.html',
            resolve: { loggedin: checkLoggedin }
        })

        // LOGIN AND REGISTRATION PAGES ===================
        .state('/login', {
            url: '/login{acct:(?:/[^/]+)?}',
            controller:'login',
            templateUrl: 'partials/auth/login.html',
        })

        // OVERVIEW AND test CREATION =====================
        .state('default', {
            url:'/',
            controller: 'overview',
            templateUrl: 'partials/app/overview.html',
            resolve: { loggedin: checkLoggedin }
        })

        .state('overview', {
            url: '/overview',
            controller: 'overview',
            templateUrl: 'partials/app/overview.html',
            resolve: { loggedin: checkLoggedin }
        })
        .state('test', {
            url: '/edit/test/:test_id',
            controller:'test',
            templateUrl: 'partials/app/test.html',
            resolve: { loggedin: checkLoggedin }
        })

        // RUN TEST =======================================
        .state('run', {
            url: '/run/:_id',
            controller:'run',
            templateUrl: 'partials/app/run.html',
            resolve: { loggedin: checkLoggedin }
        })

        // SUMMARIZE VIEW =================================
        .state('summary', {
            url: '/summary/:_id',
            controller:'summary',
            templateUrl: 'partials/app/summary.html',
            resolve: { loggedin: checkLoggedin }
        })
        .state('summary.test', {
            templateUrl: 'partials/app/summary_test.html'
        })
        .state('summary.task', {
            templateUrl: 'partials/app/summary_task.html'
        });

});

// SERVICES (factories, etc) ==================================================
// a factory to provide sockets to the app
// http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
// this should be a straight-up feed from that site

field_guide_app.factory('socket', function ($rootScope, $location) {
    

    // for live... $location.protocol()+'://'+$location.host()+':8080/'
    // var socket = io.connect('http://127.0.0.1:8080/');
    
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        removeAllListeners: function (eventName, callback) {
            socket.removeAllListeners(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }); 
        }
    };
});


// DIRECTIVES =============================================
field_guide_app
.directive('scrollGlue', ['$parse', function($parse){
    // via https://github.com/Luegg/angularjs-scroll-glue/blob/master/src/scrollglue.js
        function unboundState(initValue){
            var activated = initValue;
            return {
                getValue: function(){
                    return activated;
                },
                setValue: function(value){
                    activated = value;
                }
            };
        }

        function oneWayBindingState(getter, scope){
            return {
                getValue: function(){
                    return getter(scope);
                },
                setValue: function(){}
            };
        }

        function twoWayBindingState(getter, setter, scope){
            return {
                getValue: function(){
                    return getter(scope);
                },
                setValue: function(value){
                    if(value !== getter(scope)){
                        scope.$apply(function(){
                            setter(scope, value);
                        });
                    }
                }
            };
        }

        function createActivationState(attr, scope){
            if(attr !== ""){
                var getter = $parse(attr);
                if(getter.assign !== undefined){
                    return twoWayBindingState(getter, getter.assign, scope);
                } else {
                    return oneWayBindingState(getter, scope);
                }
            } else {
                return unboundState(true);
            }
        }

        return {
            priority: 1,
            restrict: 'A',
            link: function(scope, $el, attrs){
                var el = $el[0],
                    activationState = createActivationState(attrs.scrollGlue, scope);

                function scrollToBottom(){
                    el.scrollTop = el.scrollHeight;
                }

                function onScopeChanges(scope){
                    if(activationState.getValue()){
                        scrollToBottom();
                    }
                }

                function shouldActivateAutoScroll(){
                    // + 1 catches off by one errors in chrome
                    return el.scrollTop + el.clientHeight + 1 >= el.scrollHeight;
                }

                function onScroll(){
                    activationState.setValue(shouldActivateAutoScroll());
                }

                scope.$watch(onScopeChanges);
                $el.bind('scroll', onScroll);
            }
        };
    }]);

// FILTERS ============================================================================
angular.module('field_guide_filters', ['ngSanitize', 'ui','ui.router']);

// CONTROLLERS ================================================================
angular.module('field_guide_controls', ['ui','ui.router']); 
