'use strict';
// app.js

var field_guide_app = angular.module('field_guide_app',['ui','ui.router', 'ngSanitize','field_guide_controls']);

// function list for working with arrays

// sorts an array of objects by key.
function keysrt(key,desc) {
  return function(a,b){
   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}

function keygen(){
    return Math.round((new Date().valueOf() * Math.random()));
}

// FRONT-END ROUTE CONFIGURATION ================================================
field_guide_app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider) {
	$locationProvider
		.html5Mode(true);

    $httpProvider.defaults.timeout = 3000;
    
    // $httpProvider.interceptors.push(function($q, $location) {
    //     return {
    //         'responseError': function(response) {
    //             if(response.status === 401 || response.status === 403) {
    //                 $location.path('/login');
    //             }
    //             return $q.reject(response);
    //         }
    //     };
    // });

    $stateProvider
        // OVERVIEW AND test CREATION ========================
        .state('home', {
            url: '/',
            controller: 'overview',
            templateUrl: 'partials/overview.html'
        })
        .state('test', {
            url: '/test/:test_id',
            templateUrl: 'partials/test.html'
        })

        // RUN TEST ==========================================
        .state('run', {
            url: '/run/:_id',
            templateUrl: 'partials/run.html'
        })

        // SUMMARIZE VIEW ====================================
        .state('summary', {
            url: '/summary/:_id',
            templateUrl: 'partials/summary.html'
        })
        .state('summary.test', {
            templateUrl: 'partials/summary_test.html'
        })
        .state('summary.task', {
            templateUrl: 'partials/summary_task.html'
        })

        // REPORT PAGE FOR SINGLE test =======================
        .state('report', {
            url: '/report/:test_id',
            templateUrl: 'partials/report.html'
        })
        .state('report.test', {
            templateUrl: 'partials/report_test.html'
        })
        .state('report.task', {
            templateUrl: 'partials/report_task.html'
        });
        // .state('/admin', {
        //     templateUrl: 'partials/admin.post.list.html',
        //     controller: 'AdminPostListCtrl',
        //     access: { requiredAuthentication: true }
        // })
        // .state('/admin/post/create', {
        //     templateUrl: 'partials/admin.post.create.html',
        //     controller: 'AdminPostCreateCtrl',
        //     access: { requiredAuthentication: true }
        // })
        // .state('/admin/post/edit/:id', {
        //     templateUrl: 'partials/admin.post.edit.html',
        //     controller: 'AdminPostEditCtrl',
        //     access: { requiredAuthentication: true }
        // })
        // .state('/admin/register', {
        //     templateUrl: 'partials/admin.register.html',
        //     controller: 'AdminUserCtrl'
        // })
        // .state('/admin/login', {
        //     templateUrl: 'partials/admin.signin.html',
        //     controller: 'AdminUserCtrl'
        // })
        // .state('/admin/logout', {
        //     templateUrl: 'partials/admin.logout.html',
        //     controller: 'AdminUserCtrl',
        //     access: { requiredAuthentication: true }
        // })
        // .otherwise({
        //     redirectTo: '/'
        // })

        // // REPORT PAGE FOR SESSION =====================
        // .state('reporttest', {
        //     url: '/report/session/:session_id',
        //     templateUrl: 'partials/report.html'
        // })
        // .state('reporttest.test', {
        //     templateUrl: 'partials/report_test.html'
        // })
        // .state('reporttest.step', {
        //     // url: '/report/:testKey/',
        //     templateUrl: 'partials/report_step.html'
        // });

    // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
//     $urlRouterProvider.rule(function($injector, $location) {
//         if($location.protocol() === 'file')
//             return;

//         var path = $location.path()
//         // Note: misnomer. This returns a query object, not a search string
//             , search = $location.search()
//             , params
//             ;

//         // check to see if the path already ends in '/'
//         if (path[path.length - 1] === '/') {
//             return;
//         }

//         // If there was no search string / query params, return with a `/`
//         if (Object.keys(search).length === 0) {
//             return path + '/';
//         }

//         // Otherwise build the search string and return a `/?` prefix
//         params = [];
//         angular.forEach(search, function(v, k){
//             params.push(k + '=' + v);
//         });
//         return path + '/?' + params.join('&');
//     });
// })

// .run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

//     $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        
//         if(!('data' in toState) || !('access' in toState.data)){
//             $rootScope.error = "Access undefined for this state";
//             event.preventDefault();
//         }
//         else if (!Auth.authorize(toState.data.access)) {
//             $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
//             event.preventDefault();

//             if(fromState.url === '^') {
//                 if(Auth.isLoggedIn()) {
//                     $state.go('user.home');
//                 } else {
//                     $rootScope.error = null;
//                     $state.go('anon.login');
//                 }
//             }
//         }
//     });

});
// FILTERS ============================================================================
angular.module('field_guide_filters', []);

// CONTROLLERS ========================================================================
angular.module('field_guide_controls', ['ui','ui.router']); 

// names of the modules this module depends on
// go in the square brackets
