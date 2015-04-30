// fg-check-login.js
// Make an AJAX call to check if the user is logged in.

'use strict';
(function(){
    angular.module('field_guide_controls')
        .factory('checkLoggedin', ['$q', '$http', '$location', '$rootScope', '$window',
            function($q, $http, $location, $rootScope, $window) {

            var checkLoggedin = function(user){

                    var deferred = $q.defer();
                    var promise = $http.get('/loggedin')
                        .success(function(user){
                        // Authenticated
                        var interBoot = '';
                            if (user !== '0' && interBoot !== '1') {
                                console.log('user', user);
                                console.log($window.Intercom);
                                $rootScope.user = user;
                                interBoot = '1';
                                $window.Intercom("boot", {
                                    app_id: "YOURAPPID",
                                    email: user.email,
                                    created_at: user.created,
                                    name: user.name,
                                    user_id: user._id,
                                    widget: {
                                      activator: "#IntercomDefaultWidget"
                                    }
                                });

                                deferred.resolve();
                            } else if (user !== '0' && interBoot !== '1') {
                                $rootScope.user = user;
                                $window.Intercom("update", {
                                    app_id: "YOURAPPID",
                                    email: user.email,
                                    created_at: user.created,
                                    name: user.name,
                                    user_id: user._id,
                                    widget: {
                                      activator: "#IntercomDefaultWidget"
                                    }
                                });
                                deferred.resolve();
                            }
                            // Not Authenticated 
                            else { 
                                // console.log('welp, that flunked.');
                                $location.url('/login');
                                $window.Intercom("shutdown");
                                deferred.resolve();
                            }
                        }).error(function(err){
                            $location.url('/login');
                            deferred.resolve();
                        });

                    return deferred.promise;
                };
            // console.log('checkLoggedin', checkLoggedin());
            return checkLoggedin;
        }]);
})();