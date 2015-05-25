// watch.js
(function() {
    'use strict';
    
    // WATCH CONTROLLER FOR GROUP INTERVIEWS ==================================
        
    angular.module('field_guide_controls')
    .controller('watch', 
               ['$scope','$http','$location','$stateParams','$state','$sanitize','$sce','$window',
        function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize,  $sce,  $window){

        // Do we have WebRTC?
        // function hasGetUserMedia() {
        //   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        //             navigator.mozGetUserMedia || navigator.msGetUserMedia || window.RTCPeerConnection );
        // }

        // if (hasGetUserMedia()) {
        //   $scope.error = 'WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.';
        //   return;
        // }

        var stream;
        // function VideoStream(){
        //         var stream;
        //         return {
        //         get: function () {
        //             if (stream) {
        //                 return $q.when(stream);
        //             } else {
        //                 navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        //                 var constraints = {video: true, audio: true};
        //                 var d = $q.defer();

        //                 navigator.getUserMedia({
        //                     video: true,
        //                     audio: true
        //                 }, function (s) {
        //                     stream = s;
        //                     d.resolve(stream);
        //                 }, function (e) {
        //                     d.reject(e);
        //                     console.log("navigator.getUserMedia error: ", e);
        //                 });
        //                 return d.promise;
        //             }
        //         }
        // };

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        var constraints = {video: true, audio: true};

         navigator.getUserMedia(constraints, 
            function (s) {
                stream = s;
                $window.stream = stream; // stream available to console
                var video = document.querySelector("video");
                video.src = $window.URL.createObjectURL(stream);
                video.play();

                $scope.getLocalVideo = function () {
                  return $sce.trustAsResourceUrl(stream);
                };

            }, function (e) {
                console.log("navigator.getUserMedia error: ", e);
            });
    }]);
})();
