// app.js
(function() {
    'use strict';

    var field_guide_app = angular.module('field_guide_app',['ui','ui.router', 'ngSanitize', 'youtube-embed', 'field_guide_controls','field_guide_filters']);

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

                        $location.url('/login');
                    }
                })
                .error(function(err){
                    console.log(err);
                });
            // }
            
        }

        // $urlRouterProvider.otherwise("/login");
        $urlRouterProvider.otherwise("/404");
        // $urlRouterProvider.otherwise("/overview");


        $stateProvider
        // PUBLIC ROUTES ================================================
            
            // CANVAS SOCKETS TESTING ===================================
            // .state('canvas', {
            //     // url: '/canvas/',
            //     url: '/canvas/:_id',
            //     controller:'canvas',
            //     templateUrl: 'partials/app/testCanvas.html'
            // })
            
            // "block screens" ============================================
            .state('/404', {
                url: '/404',                
                templateUrl: 'partials/app/404.html',
            })
            .state('/upgrade', {
                url: '/upgrade',                
                templateUrl: 'partials/app/upgrade.html',
            })

            // LOGIN AND REGISTRATION PAGES ===================
            .state('/login', {
                url: '/login{acct:(?:/[^/]+)?}',
                controller:'login',
                templateUrl: 'partials/auth/login.html',
            })

            // PUBLIC REPORTS ===========================================
            .state('report_public', {
                url: '/p/report/:test_id',
                controller:'reportPublic',
                templateUrl: 'partials/app/report_public.html'
            })

        // PRIVATE ROUTES ===============================================

            // REPORT PAGE FOR SINGLE TEST ====================
            .state('report', {
                url: '/report/:test_id',
                controller:'reportPrivate',
                templateUrl: 'partials/app/report_private.html',
                resolve: { loggedin: checkLoggedin }
            })

            // ACCOUNT MANAGEMENT =============================
            .state('account', {
                url: '/account',
                controller: 'account',
                templateUrl : 'partials/app/account.html',
                resolve: { loggedin: checkLoggedin }
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
            })
    });

    field_guide_app.factory('socket', function ($rootScope, $location) {

        // for live... $location.protocol()+'://'+$location.host()+':8080/'
        var socket = io.connect();
        
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

    // youtube-embed.js
    field_guide_app.directive('youtube', function($window) {
        return {
            restrict: "E",

            scope: {
                height:   "@",
                width:    "@",
                videoId:  "@"  
            },

            template: '<div></div>',

            link: function(scope, element) {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                var player;

                $window.onYouTubeIframeAPIReady = function() {
                    player = new YT.Player(element.children()[0], {
                        playerVars: {
                            autoplay: 0,
                            html5: 1,
                            theme: "light",
                            modesbranding: 0,
                            color: "white",
                            iv_load_policy: 3,
                            showinfo: 1,
                            controls: 1,
                        },
                        height: scope.height,
                        width: scope.width,
                        videoId: scope.videoid
                    });
                };
            },  
        };
    })

    // FILTERS ============================================================================
    angular.module('field_guide_filters', ['ngSanitize', 'ui','ui.router']);

    // CONTROLLERS, DIRECTIVES ============================================================
    angular.module('field_guide_controls', ['ngSanitize', 'ui','ui.router', 'youtube-embed']);

})();