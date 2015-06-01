// watch.js
(function() {
    'use strict';
    
    // WATCH CONTROLLER FOR GROUP INTERVIEWS ==================================
        
    angular.module('field_guide_controls')
    .controller('watch', 
               ['$scope','$http','$location','$stateParams','$state','$sanitize','$sce','$window',
        function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize,  $sce,  $window){

        var stream;

    // Polyfill for various browsers - this only works in Chrome, Firefox, and Opera. ========
        var RTCPeerConnection     = window.mozRTCPeerConnection     || window.webkitRTCPeerConnection;
        var RTCIceCandidate       = window.mozRTCIceCandidate       || window.RTCIceCandidate;
        var RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        var v = document.createElement("video");
        var SRC_OBJECT = 'srcObject' in v ? "srcObject" :
                         'mozSrcObject' in v ? "mozSrcObject" :
                         'webkitSrcObject' in v ? "webkitSrcObject" : "srcObject";
     
     // ======================================================================================

        var offer = getOfferFromFriend();
        
        navigator.getUserMedia({video: true}, function(stream) {
          pc.onaddstream({stream: stream});
          pc.addStream(stream);

          pc.setRemoteDescription(new RTCSessionDescription(offer), function() {
            pc.createAnswer(function(answer) {
              pc.setLocalDescription(new RTCSessionDescription(answer), function() {
                // send the answer to a server to be forwarded back to the caller (you)
              }, error);
            }, error);
          }, error);
        });

     // =========================================

        var constraints = {video: true, audio: true};

        var pc = new RTCPeerConnection();
        pc.onaddstream = function(obj) {
          var vid = document.createElement("video");
          document.appendChild(vid);
          vid.srcObject = obj.stream;
        }

        // Helper functions
        function endCall() {
          var videos = document.getElementsByTagName("video");
          for (var i = 0; i < videos.length; i++) {
            videos[i].pause();
          }

          pc.close();
        }

        function error(err) { endCall(); }



        navigator.getUserMedia(constraints, 
            function (s) {
                stream = s;
                $window.stream = stream; // stream available to console
                var video = document.querySelector("video");
                video.src = $window.URL.createObjectURL(stream);
                video.play();

                // $scope.getLocalVideo = function () {
                //   return $sce.trustAsResourceUrl(stream);
                // };

            }, function (e) {
                console.log("navigator.getUserMedia error: ", e);
            });

    }]);
})();
