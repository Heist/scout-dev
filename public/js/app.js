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

    // New interceptor from http://stackoverflow.com/questions/21230417/capture-http-401-with-angular-js-interceptor
    var interceptor = function ($q) {
        return {
            'response': function (response) {
                //Will only be called for HTTP up to 300
                // console.log('response', response);
                return response;
            },
            'responseError': function (rejection) {
                if(rejection.status === 401) {
                    window.location = '/login';
                }
                return $q.reject(rejection);
            }
        };
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){ 
        // Initialize a new promise 
        // This is going to need to check in with Express to see if someone's session
        // is still active. How?

        var deferred = $q.defer(); 
        // Make an AJAX call to check if the user is logged in 
        $http
            .get('/loggedin')
            .success(function(user){
                // Authenticated 
                if (user !== '0') {
                    console.log('yeah you logged in', user);
                    $timeout(deferred.resolve, 0);
                    $rootScope.user = user.replace(/(^"|"$)/g, '');
                }

                // Not Authenticated 
                else { 
                    console.log('welp, that flunked');
                    $rootScope.message = 'You need to log in.'; 
                    $timeout(function(){deferred.reject();}, 0);
                    $location.url('/login');
                }
            });
        };

    $httpProvider.interceptors.push(interceptor);

    $urlRouterProvider.otherwise("/login");
    // $urlRouterProvider.otherwise("/overview");


    $stateProvider
        // OVERVIEW AND test CREATION =====================
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

        // REPORT PAGE FOR SINGLE test ====================
        .state('report', {
            url: '/report/:test_id',
            controller:'report',
            templateUrl: 'partials/app/report.html'
        })
        .state('report.test', {
            templateUrl: 'partials/app/report_test.html'
        })
        .state('report.task', {
            templateUrl: 'partials/app/report_task.html'
        })

        // LOGIN AND REGISTRATION PAGES ===================
        .state('/login', {
            url: '/login',
            controller:'login',
            templateUrl: 'partials/auth/login.html',
        });
    

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

// SERVICES (factories, etc) ==================================================
// demo from http://stackoverflow.com/questions/18880737/how-do-i-use-rootscope-in-angular-to-store-variables
// app.factory('items', function() {
//     var items = [];
//     var itemsService = {};

//     itemsService.add = function(item) {
//         items.push(item);
//     };
//     itemsService.list = function() {
//         return items;
//     };

//     return itemsService;
// });

// function Ctrl1($scope,items) {
//     $scope.list = items.list; 
// }

// function Ctrl2($scope, items) {
//     $scope.add = items.add;
// }

// a factory to provide sockets to the app
// http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
// this should be a straight-up feed from that site
// field_guide_app.factory('socket', function ($rootScope) {
//   var socket = io.connect();
//   return {
//     on: function (eventName, callback) {
//       socket.on(eventName, function () {  
//         var args = arguments;
//         $rootScope.$apply(function () {
//           callback.apply(socket, args);
//         });
//       });
//     },
//     emit: function (eventName, data, callback) {
//       socket.emit(eventName, data, function () {
//         var args = arguments;
//         $rootScope.$apply(function () {
//           if (callback) {
//             callback.apply(socket, args);
//           }
//         });
//       })
//     }
//   };
// });

// DIRECTIVES
 field_guide_app.directive('scrollItem',function(){
    return{
    restrict: "A",
    link: function(scope, element, attributes) {
        if (scope.$last){
           scope.$emit("Finished");
       }
    }
   }
})
.directive('scrollIf', function() {
return{
    restrict: "A",
    link: function(scope, element, attributes) {
        scope.$on("Finished",function(){
            var chat_height = element.outerHeight();
            console.log(chat_height);
            element.scrollTop(chat_height); 
        });
    }
   }
  });

// FILTERS ============================================================================
angular.module('field_guide_filters', ['ngSanitize', 'ui','ui.router']);

// CONTROLLERS ================================================================
angular.module('field_guide_controls', ['ui','ui.router']); 
