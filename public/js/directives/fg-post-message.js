// fg-post-message.js
// post a new note to the database.
'use strict';
(function(){

    angular.module('field_guide_controls', [])
        .factory('postMessage', ['$http', function($http) {
            var postMessage = function(message, task, test, subject_id){
                    var note = {};
                    note.body = message;
                    note.created = new Date();
                     
                    note._task = task;
                    note._test = test;
                    note._subject = subject_id;

                    var promise = $http.post('/api/message/', note).then(function (response) {
                        return response.data;
                    });

                    return promise;
                };
            return postMessage;

        }]);
})();