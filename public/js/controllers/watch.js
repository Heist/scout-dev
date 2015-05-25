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

        VideoStream.get()
            .then(function (s) {
                stream = s;
                Room.init(stream);
                stream = URL.createObjectURL(stream);
                
                if (!$routeParams.roomId) {
                    Room.createRoom().then(function (roomId) {
                        $location.path('/room/' + roomId);
                    });
                } else {
                    Room.joinRoom($routeParams.roomId);
                }
            }, function () {
                $scope.error = 'No audio/video permissions. Please refresh your browser and allow the audio/video capturing.';
            });

            $scope.peers = [];
    
            Room.on('peer.stream', function (peer) {
                console.log('Client connected, adding new stream');
                    $scope.peers.push({
                    id: peer.id,
                    stream: URL.createObjectURL(peer.stream)
                });
            });
    
            Room.on('peer.disconnected', function (peer) {
                console.log('Client disconnected, removing stream');

                $scope.peers = $scope.peers.filter(function (p) {
                    return p.id !== peer.id;
                });
            });

        $scope.getLocalVideo = function () {
          return $sce.trustAsResourceUrl(stream);
        };

    }]);
})();
