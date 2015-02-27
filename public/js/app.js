// app.js
(function() {
    'use strict';

    var field_guide_app = angular.module('field_guide_app',['ui','ui.router', 'ngSanitize', 'youtube-embed', 'field_guide_controls','field_guide_filters']);

    // FRONT-END ROUTE CONFIGURATION ==============================================
    field_guide_app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider) {

        $locationProvider.html5Mode(true);

        $httpProvider.defaults.timeout = 3000;
        
        $urlRouterProvider.otherwise("/login");

    // APP ROUTING ====================================================================
        $stateProvider
        // PUBLIC ROUTES ======================================================

            // BLOCK SCREENS ============================================
            .state('404', {
                url: '/404',                
                templateUrl: 'partials/app/404.html',
            })
            .state('upgrade', {
                url: '/upgrade',                
                templateUrl: 'partials/app/upgrade.html',
            })

            // LOGIN AND REGISTRATION PAGES =============================
            
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
                url: '/p/report/:_id',
                controller:'reportPublic',
                templateUrl: 'partials/app/report_public.html',
                resolve: { 
                    loadData: ['$http','$stateParams', function($http, $stateParams) {
                        return $http.get('/api/public/report/'+$stateParams._id)
                                    .success(function(data) {
                                        return data;
                                    });
                    }]
                }
            })

        // PRIVATE ROUTES ===============================================
            // SUMMARIZE VIEW =============================
            .state('summary', {
                url: '/summary/:_id',
                controller:'summary',
                templateUrl: 'partials/app/summary.html',
                resolve: { 
                    mixpanel : function(){ mixpanel.track('Summary clicked', {}); },
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }],
                    loadData: ['$http','$stateParams', function($http, $stateParams) {
                        return $http.get('/api/summary/'+$stateParams._id)
                                    .success(function(data) {
                                        return data;
                                    });
                    }]
                }
            })
            .state('summary.test', {
                templateUrl: 'partials/app/summary_test.html'
            })
            .state('summary.task', {
                templateUrl: 'partials/app/summary_task.html'
            })

            // REPORT PREVIEW =============================
            .state('report', {
                url: '/report/:_id',
                controller:'summary',
                templateUrl: 'partials/app/report_private.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }],
                    loadData: ['$http','$stateParams', function($http, $stateParams) {
                        return $http.get('/api/summary/'+$stateParams._id)
                                    .success(function(data) {
                                        return data;
                                    });
                    }]
                }
            })

            // ACCOUNT MANAGEMENT =============================
            .state('account', {
                url: '/account',
                controller: 'account',
                templateUrl : 'partials/app/account.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }]
                }
            })

            // OVERVIEW AND test CREATION =====================
            .state('default', {
                url: '/',
                controller: 'overview',
                templateUrl: 'partials/app/overview.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }]
                }
            })
            .state('overview', {
                url: '/overview',
                controller: 'overview',
                templateUrl: 'partials/app/overview.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }]
                }
            })
            .state('test', {
                url: '/edit/test/:test_id',
                controller:'test',
                templateUrl: 'partials/app/test.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                            return checkLoggedin();
                        }]
                }
            })

            // RUN TEST =======================================
            .state('run', {
                url: '/run/:_id',
                controller:'run',
                templateUrl: 'partials/app/run.html',
                resolve: { 
                    loggedin: ['checkLoggedin', function(checkLoggedin) {
                        return checkLoggedin();
                    }],
                    loadData : ['$http','$stateParams', function($http, $stateParams) {
                        return $http.get('/api/run/'+$stateParams._id).success(function(data){
                                    return data;
                                });
                    }]
                }
            });
    });

    // FILTERS ============================================================================
    angular.module('field_guide_filters', ['ngSanitize', 'ui','ui.router']);

    // CONTROLLERS, DIRECTIVES ============================================================
    angular.module('field_guide_controls', ['ngSanitize', 'ui','ui.router', 'youtube-embed']);

})();