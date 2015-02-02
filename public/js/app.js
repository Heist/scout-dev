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
            console.log('checking logged in identity');
            // Make an AJAX call to check if the user is logged in
            var deferred = $q.defer();
            $http
                .get('/loggedin')
                .success(function(user){
                    // Authenticated
                    if (user !== '0') {
                        console.log('user', user);
                        $rootScope.user = user;
                        deferred.resolve();
                    }
                    // Not Authenticated 
                    else { 
                        console.log('welp, that flunked.');
                        $location.url('/login');
                        deferred.resolve();
                    }
                })
                .error(function(err){
                    console.log(err);
                    $location.url('/login');
                    deferred.resolve();
                });

            return deferred.promise;   
        }
        
        $urlRouterProvider.otherwise("/login");
        // $urlRouterProvider.otherwise("/404");
        // $urlRouterProvider.otherwise("/overview");


        $stateProvider
        // PUBLIC ROUTES ================================================

            // "block screens" ============================================
            .state('404', {
                url: '/404',                
                templateUrl: 'partials/app/404.html',
            })
            .state('upgrade', {
                url: '/upgrade',                
                templateUrl: 'partials/app/upgrade.html',
            })

            // LOGIN AND REGISTRATION PAGES ===================
            //  .state('default', {
            //     url:'/login',
            //     controller: 'login',
            //     templateUrl: 'partials/auth/login.html',
            //     resolve: { loggedin: checkLoggedin }
            // })

            .state('login', {
                url: '/login{acct:(?:/[^/]+)?}',
                controller:'login',
                templateUrl: 'partials/auth/login.html'
            })
           
            .state('register', {
                url: '/register',
                templateUrl: 'partials/auth/register.html'
            })

            .state('reset', {
                url: '/reset',
                controller : 'reset',
                templateUrl: 'partials/auth/reset.html'
            })

            .state('forgot', {
                url: '/forgot{token:(?:/[^/]+)?}',
                controller : 'forgot',
                templateUrl: 'partials/auth/forgot.html'
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
                url: '/',
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
    });

    field_guide_app.directive('ngMatch', ['$parse', function ($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            require: '?ngModel'
        };

        return directive;
         
        function link(scope, elem, attrs, ctrl) {
        // if ngModel is not defined, we don't need to do anything
            if (!ctrl){ return;}
            if (!attrs.ngMatch){ return; }
             
            var firstPassword = $parse(attrs.ngMatch);
             
            var validator = function (value) {
                var temp = firstPassword(scope),
                v = value === temp;
                ctrl.$setValidity('match', v);
                return value;
            };
             
            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attrs.$observe('ngMatch', function () {
                validator(ctrl.$viewValue);
            });
         
        }
    }]);

    field_guide_app.directive('ngCheckStrength', function () {

        return {
            replace: false,
            restrict: 'EACM',
            link: function (scope, iElement, iAttrs) {

                var strength = {
                    colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
                    measureStrength: function (p) {
                        if(p){
                            var _force = 0;                    
                            var _regex = new RegExp('[$-/:-?{-~!"^_`\[\]]','g');
                                                  
                            var _lowerLetters = /[a-z]+/.test(p);                    
                            var _upperLetters = /[A-Z]+/.test(p);
                            var _numbers = /[0-9]+/.test(p);
                            var _symbols = _regex.test(p);
                                                  
                            var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];                    
                            var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;                                          
                            
                            _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                            _force += _passedMatches * 10;
                                
                            // penality (short password)
                            _force = (p.length <= 6) ? Math.min(_force, 10) : _force;                                      
                            
                            // penality (poor variety of characters)
                            _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
                            _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
                            _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;
                            
                            return _force;
                        }

                    },
                    getColor: function (s) {
                        if(s){
                            var idx = 0;
                            if (s <= 10) { idx = 0; }
                            else if (s <= 20) { idx = 1; }
                            else if (s <= 30) { idx = 2; }
                            else if (s <= 40) { idx = 3; }
                            else { idx = 4; }
    
                            return { idx: idx + 1, col: this.colors[idx] };
                        }
                    }
                };

                scope.$watch(iAttrs.ngCheckStrength, function () {
                    console.log('watching');
                    if (!scope.password) {
                        console.log('no pass');
                        iElement.css({ "display": "none"  });
                    } else {
                        console.log(scope.password.length);
                        var c = strength.getColor(strength.measureStrength(scope.password));
                        iElement.css({ "display": "inline" });
                        iElement.children('li')
                            .css({ "background": "#DDD" })
                            .slice(0, c.idx)
                            .css({ "background": c.col });
                    }
                });

            },
            template:   '<li class="pwStrength"></li>'+
                        '<li class="pwStrength"></li>'+
                        '<li class="pwStrength"></li>'+
                        '<li class="pwStrength"></li>'+
                        '<li class="pwStrength"></li>'
        };

    });

    // supply the currently logged-in user to all functions
    field_guide_app.factory('UserService', function() {
        return {
            name : 'anonymous'
        };
    });


    // FILTERS ============================================================================
    angular.module('field_guide_filters', ['ngSanitize', 'ui','ui.router']);

    // CONTROLLERS, DIRECTIVES ============================================================
    angular.module('field_guide_controls', ['ngSanitize', 'ui','ui.router', 'youtube-embed']);

})();