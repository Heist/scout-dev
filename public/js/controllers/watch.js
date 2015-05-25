// watch.js
(function() {
    'use strict';
    
    // WATCH CONTROLLER FOR GROUP INTERVIEWS ==================================
        
    angular.module('field_guide_controls')
    .controller('watch', 
               ['$scope','$http','$location','$stateParams','$state','$sanitize','VideoStream',
        function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize,  VideoStream){

        // Do we have WebRTC?
        function hasGetUserMedia() {
          return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia || !window.RTCPeerConnection );
        }

        if (hasGetUserMedia()) {
          $scope.error = 'WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.';
          return;
        }

        var stream;

    }]);
})();
