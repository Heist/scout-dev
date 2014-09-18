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
        })

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
        // })
        ;
})


// FILTERS =================================================================
 
.filter('hashtag', ['$sce', function($sce){
        return function(message) {
            // TODO : this runs on users? Fix.
            var hashCatch = new RegExp(/\S*#\S+/gi); 
            var tagIt = message.match(hashCatch);
            
            var msg = message.replace(hashCatch, "<span class='tag'>$&</span>");

            return $sce.trustAsHtml(msg);
        };
}])

.filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    })

.filter('linebreaker', ['$sce', function($sce){
    return function(text) {
        text = text.replace(/\r?\n/g, '<br />');

        return $sce.trustAsHtml(text);
    }
}]);

// CONTROLLERS ========================================================================

angular.module('field_guide_controls', []);
