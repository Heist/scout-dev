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
        // OVERVIEW AND FLOW CREATION ========================
        .state('home', {
            url: '/',
            controller: 'overview',
            templateUrl: 'partials/overview.html'
        })
        .state('flow', {
            url: '/edit/flow/:flow_id',
            controller:'flow',
            templateUrl: 'partials/flow.html'
        })

        // RUN TEST ==========================================
        .state('run', {
            url: '/run/:sessionId',
            controller: 'run',
            templateUrl: 'partials/run.html'
        })

        // SUMMARIZE VIEW ====================================
        .state('summary', {
            url: '/summary/:flow_id',
            controller:'summary',
            templateUrl: 'partials/summary.html'
        })
        .state('summary.flow', {
            templateUrl: 'partials/summary_flow.html'
        })
        .state('summary.step', {
            templateUrl: 'partials/summary_step.html'
        })

        // REPORT PAGE FOR SINGLE FLOW =======================
        .state('report', {
            url: '/report/flow/:flow_id',
            controller:'report',
            templateUrl: 'partials/report.html'
        })
        .state('report.flow', {
            templateUrl: 'partials/report_flow.html'
        })
        .state('report.step', {
            templateUrl: 'partials/report_step.html'
        })

        // // REPORT PAGE FOR SESSION =====================
        // .state('reportflow', {
        //     url: '/report/session/:session_id',
        //     templateUrl: 'partials/report.html'
        // })
        // .state('reportflow.flow', {
        //     templateUrl: 'partials/report_flow.html'
        // })
        // .state('reportflow.step', {
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
