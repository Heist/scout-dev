// fg-check-login.js
// Make an AJAX call to check if the user is logged in.

'use strict';
(function(){
    angular.module('field_guide_controls')
        .factory('checkLoggedin', ['$q', '$http', '$location', '$rootScope', 
            function($q, $http, $location, $rootScope) {

            var checkLoggedin = function(user){

                    var deferred = $q.defer();
                    var promise = $http.get('/loggedin')
                        .success(function(user){
                        // Authenticated
                            if (user !== '0') {
                                // console.log('user', user);
                                $rootScope.user = user;
                                deferred.resolve();
                            }
                            // Not Authenticated 
                            else { 
                                // console.log('welp, that flunked.');
                                $location.url('/login');
                                deferred.resolve();
                            }
                        }).error(function(err){
                            $location.url('/login');
                            deferred.resolve();
                        });

                    return deferred.promise;
                };
            console.log('checkLoggedin', checkLoggedin());
            return checkLoggedin;
        }]);
})();