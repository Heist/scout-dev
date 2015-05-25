// watch.js
(function() {
    'use strict';
    
    // WATCH CONTROLLER FOR GROUP INTERVIEWS ==================================
        
    angular.module('field_guide_controls')
    .controller('watch', 
               ['$scope','$http','$location','$stateParams','$state','$sanitize','$sce','$window',
        function($scope,  $http,  $location,  $stateParams,  $state,  $sanitize,  $sce,  $window){

        var stream;

        var RTCPeerConnection     = window.mozRTCPeerConnection     || window.webkitRTCPeerConnection;
        var RTCIceCandidate       = window.mozRTCIceCandidate       || window.RTCIceCandidate;
        var RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
        var getUserMedia          = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        var constraints           = {video: true, audio: true};

         getUserMedia(constraints, 
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

         var localStream, localPeerConnection, remotePeerConnection;

        var localVideo = document.getElementById("localVideo");
        var remoteVideo = document.getElementById("remoteVideo");

        var startButton = document.getElementById("startButton");
        var callButton = document.getElementById("callButton");
        var hangupButton = document.getElementById("hangupButton");

        function trace(text) {
          console.log((performance.now() / 1000).toFixed(3) + ": " + text);
        }

        function gotStream(stream){
          trace("Received local stream");
          localVideo.src = URL.createObjectURL(stream);
          localStream = stream;
          callButton.disabled = false;
        }

        function start() {
          trace("Requesting local stream");
          startButton.disabled = true;
          getUserMedia({audio:true, video:true}, gotStream,
            function(error) {
              trace("getUserMedia error: ", error);
            });
        }

        function call() {
          callButton.disabled = true;
          hangupButton.disabled = false;
          trace("Starting call");

          if (localStream.getVideoTracks().length > 0) {
            trace('Using video device: ' + localStream.getVideoTracks()[0].label);
          }
          if (localStream.getAudioTracks().length > 0) {
            trace('Using audio device: ' + localStream.getAudioTracks()[0].label);
          }
        }

        function hangup() {
          trace("Ending call");
          localPeerConnection.close();
          remotePeerConnection.close();
          localPeerConnection = null;
          remotePeerConnection = null;
          hangupButton.disabled = true;
          callButton.disabled = false;
        }

        function gotLocalDescription(description){
          localPeerConnection.setLocalDescription(description);
          trace("Offer from localPeerConnection: \n" + description.sdp);
          remotePeerConnection.setRemoteDescription(description);
          remotePeerConnection.createAnswer(gotRemoteDescription,handleError);
        }

        function gotRemoteDescription(description){
          remotePeerConnection.setLocalDescription(description);
          trace("Answer from remotePeerConnection: \n" + description.sdp);
          localPeerConnection.setRemoteDescription(description);
        }

        function gotRemoteStream(event){
          remoteVideo.src = URL.createObjectURL(event.stream);
          trace("Received remote stream");
        }

        function gotLocalIceCandidate(event){
          if (event.candidate) {
            remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
            trace("Local ICE candidate: \n" + event.candidate.candidate);
          }
        }

        function gotRemoteIceCandidate(event){
          if (event.candidate) {
            localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
            trace("Remote ICE candidate: \n " + event.candidate.candidate);
          }
        }

        function handleError(){
          var servers = null;

          localPeerConnection = new RTCPeerConnection(servers);
          trace("Created local peer connection object localPeerConnection");
          localPeerConnection.onicecandidate = gotLocalIceCandidate;

          remotePeerConnection = new RTCPeerConnection(servers);
          trace("Created remote peer connection object remotePeerConnection");
          remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
          remotePeerConnection.onaddstream = gotRemoteStream;

          localPeerConnection.addStream(localStream);
          trace("Added localStream to localPeerConnection");
          localPeerConnection.createOffer(gotLocalDescription,handleError);
        }

        startButton.disabled = false;
        callButton.disabled = true;
        hangupButton.disabled = true;
        startButton.onclick = start;
        callButton.onclick = call;
        hangupButton.onclick = hangup;

    }]);
})();
