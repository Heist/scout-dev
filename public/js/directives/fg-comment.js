// fg-comment.js
// add comments to mesages 
'use strict';

(function(){

angular.module('field_guide_controls')
    .factory('postComment', ['$http', function($http) {
        var postComment = function(comment, msg_id){
        // if there's a comment, edit the comment
                var out = {
                    body : comment.body,
                    msg  : msg_id
                };
            
                var promise = $http.post('/api/comment/', out).then(function (response) {
                        return response.data;
                    });

                return promise;
            };
        return postComment;
    }]);
})();