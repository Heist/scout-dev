// app.js
'use strict';

var field_guide_app = angular.module('field_guide_app',['ui','ui.router', 'ngSanitize', 'youtube-embed', 'field_guide_controls','field_guide_filters']);

// function list for working with arrays

// sorts an array of objects by key.
function keysrt(key,desc) {
        return function(a,b){
            return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
        };
    }

function keygen(){
    return Math.round((new Date().valueOf() * Math.random()));
}

// FRONT-END ROUTE CONFIGURATION ==============================================
field_guide_app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider) {
	
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.timeout = 3000;

    // TODO: this should probably be an Interceptor, but it works on load for now.
    function checkLoggedin($q, $timeout, $http, $location, $rootScope){ 
        // console.log('checking logged in identity');
        // Make an AJAX call to check if the user is logged in
        var deferred = $q.defer(); 

        $http
            .get('/loggedin')
            .success(function(user){
                // Authenticated
                if (user !== '0') {
                    console.log('this user successfully logged in', user);
                    $rootScope.user = user;
                    $timeout(deferred.resolve, 0);
                }

                // Not Authenticated 
                else { 
                    console.log('welp, that flunked', user);
                    $rootScope.userNote = 'You need to log in.'; 
                    $timeout(function(){deferred.reject();}, 0);

                    $location.url('/login');
                }
            })
            .error(function(err){
                console.log(err);
            });
        // }
        
    }

    $urlRouterProvider.otherwise("/login");
    // $urlRouterProvider.otherwise("/overview");


    $stateProvider
    // PUBLIC ROUTES ================================================
        
        // CANVAS SOCKETS TESTING ===================================
        // .state('canvas', {
        //     // url: '/canvas/',
        //     url: '/canvas/:_id',
        //     controller:'canvas',
        //     templateUrl: 'partials/app/testCanvas.html'
        // })
        
        // LOGIN AND REGISTRATION PAGES ===================
        .state('/login', {
            url: '/login{acct:(?:/[^/]+)?}',
            controller:'login',
            templateUrl: 'partials/auth/login.html',
        })

        // PUBLIC REPORTS ===========================================
        .state('report_public', {
            url: '/p/report/:test_id',
            controller:'reportPublic',
            templateUrl: 'partials/app/report_public.html'
        })

    // PRIVATE ROUTES ===============================================

        // REPORT PAGE FOR SINGLE TEST ====================
        .state('report', {
            url: '/report/:test_id',
            controller:'reportPrivate',
            templateUrl: 'partials/app/report_private.html',
            resolve: { loggedin: checkLoggedin }
        })

        // ACCOUNT MANAGEMENT =============================
        .state('account', {
            url: '/account',
            controller: 'account',
            templateUrl : 'partials/app/account.html',
            resolve: { loggedin: checkLoggedin }
        })

        // OVERVIEW AND test CREATION =====================
        .state('default', {
            url:'/',
            controller: 'overview',
            templateUrl: 'partials/app/overview.html',
            resolve: { loggedin: checkLoggedin }
        })

        .state('overview', {
            url: '/overview',
            controller: 'overview',
            templateUrl: 'partials/app/overview.html',
            resolve: { loggedin: checkLoggedin }
        })
        .state('test', {
            url: '/edit/test/:test_id',
            controller:'test',
            templateUrl: 'partials/app/test.html',
            resolve: { loggedin: checkLoggedin }
        })

        // RUN TEST =======================================
        .state('run', {
            url: '/run/:_id',
            controller:'run',
            templateUrl: 'partials/app/run.html',
            resolve: { loggedin: checkLoggedin }
        })

        // SUMMARIZE VIEW =================================
        .state('summary', {
            url: '/summary/:_id',
            controller:'summary',
            templateUrl: 'partials/app/summary.html',
            resolve: { loggedin: checkLoggedin }
        })
        .state('summary.test', {
            templateUrl: 'partials/app/summary_test.html'
        })
        .state('summary.task', {
            templateUrl: 'partials/app/summary_task.html'
        });

});

// SERVICES (factories, etc) ==================================================
// a factory to provide sockets to the app
// http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
// this should be a straight-up feed from that site

field_guide_app.factory('socket', function ($rootScope, $location) {
    

    // for live... $location.protocol()+'://'+$location.host()+':8080/'
    // var socket = io.connect('http://127.0.0.1:8080/');
    
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        removeAllListeners: function (eventName, callback) {
            socket.removeAllListeners(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }); 
        }
    };
});
// KEYPRESS CONTROLLER ====================================
// TODO Make this work to smell combos on ctrl.

// $scope.keyboard = {
//   var buffer: [], 
//   detectCombination : function() {
//     var codes = {};
//     this.buffer.forEach(function(code) {
//       codes['key_' + code] = 1;
//     })

//     if ((codes.key_91 || codes.key_93) && codes.key_8) {
//       // I'm looking for 'command + delete'
//     }
//   },
//   keydown: function($event) {
//     this.buffer.push($event.keyCode);
//     this.detectCombination()
//   },
//   keyup: function($event, week) {
//     this.buffer = [];
//   }
// }


// DIRECTIVES =============================================
field_guide_app
.directive('youtube', function($window) {
    return {
        restrict: "E",

        scope: {
            height:   "@",
            width:    "@",
            videoId:  "@"  
        },

        template: '<div></div>',

        link: function(scope, element) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player;

            $window.onYouTubeIframeAPIReady = function() {
                player = new YT.Player(element.children()[0], {
                    playerVars: {
                        autoplay: 0,
                        html5: 1,
                        theme: "light",
                        modesbranding: 0,
                        color: "white",
                        iv_load_policy: 3,
                        showinfo: 1,
                        controls: 1,
                    },
                    height: scope.height,
                    width: scope.width,
                    videoId: scope.videoid
                });
            };
        },  
    };
})
.directive('scrollGlue', ['$parse', function($parse){
    // via https://github.com/Luegg/angularjs-scroll-glue/blob/master/src/scrollglue.js
        function unboundState(initValue){
            var activated = initValue;
            return {
                getValue: function(){
                    return activated;
                },
                setValue: function(value){
                    activated = value;
                }
            };
        }

        function oneWayBindingState(getter, scope){
            return {
                getValue: function(){
                    return getter(scope);
                },
                setValue: function(){}
            };
        }

        function twoWayBindingState(getter, setter, scope){
            return {
                getValue: function(){
                    return getter(scope);
                },
                setValue: function(value){
                    if(value !== getter(scope)){
                        scope.$apply(function(){
                            setter(scope, value);
                        });
                    }
                }
            };
        }

        function createActivationState(attr, scope){
            if(attr !== ""){
                var getter = $parse(attr);
                if(getter.assign !== undefined){
                    return twoWayBindingState(getter, getter.assign, scope);
                } else {
                    return oneWayBindingState(getter, scope);
                }
            } else {
                return unboundState(true);
            }
        }

        return {
            priority: 1,
            restrict: 'A',
            link: function(scope, $el, attrs){
                var el = $el[0],
                    activationState = createActivationState(attrs.scrollGlue, scope);

                function scrollToBottom(){
                    el.scrollTop = el.scrollHeight;
                }

                function onScopeChanges(scope){
                    if(activationState.getValue()){
                        scrollToBottom();
                    }
                }

                function shouldActivateAutoScroll(){
                    // + 1 catches off by one errors in chrome
                    return el.scrollTop + el.clientHeight + 1 >= el.scrollHeight;
                }

                function onScroll(){
                    activationState.setValue(shouldActivateAutoScroll());
                }

                scope.$watch(onScopeChanges);
                $el.bind('scroll', onScroll);
            }
        };
    }])
.constant('msdElasticConfig', {
    append: ''
  })

  .directive('msdElastic', [
    '$timeout', '$window', 'msdElasticConfig',
    function($timeout, $window, config) {
      'use strict';

      return {
        require: 'ngModel',
        restrict: 'A, C',
        link: function(scope, element, attrs, ngModel) {

          // cache a reference to the DOM element
          var ta = element[0],
              $ta = element;

          // ensure the element is a textarea, and browser is capable
          if (ta.nodeName !== 'TEXTAREA' || !$window.getComputedStyle) {
            return;
          }

          // set these properties before measuring dimensions
          $ta.css({
            'overflow': 'hidden',
            'overflow-y': 'hidden',
            'word-wrap': 'break-word'
          });

          // force text reflow
          var text = ta.value;
          ta.value = '';
          ta.value = text;

          var append = attrs.msdElastic ? attrs.msdElastic.replace(/\\n/g, '\n') : config.append,
              $win = angular.element($window),
              mirrorInitStyle = 'position: absolute; top: -999px; right: auto; bottom: auto;' +
                                'left: 0; overflow: hidden; -webkit-box-sizing: content-box;' +
                                '-moz-box-sizing: content-box; box-sizing: content-box;' +
                                'min-height: 0 !important; height: 0 !important; padding: 0;' +
                                'word-wrap: break-word; border: 0;',
              $mirror = angular.element('<textarea tabindex="-1" ' +
                                        'style="' + mirrorInitStyle + '"/>').data('elastic', true),
              mirror = $mirror[0],
              taStyle = getComputedStyle(ta),
              resize = taStyle.getPropertyValue('resize'),
              borderBox = taStyle.getPropertyValue('box-sizing') === 'border-box' ||
                          taStyle.getPropertyValue('-moz-box-sizing') === 'border-box' ||
                          taStyle.getPropertyValue('-webkit-box-sizing') === 'border-box',
              boxOuter = !borderBox ? {width: 0, height: 0} : {
                            width:  parseInt(taStyle.getPropertyValue('border-right-width'), 10) +
                                    parseInt(taStyle.getPropertyValue('padding-right'), 10) +
                                    parseInt(taStyle.getPropertyValue('padding-left'), 10) +
                                    parseInt(taStyle.getPropertyValue('border-left-width'), 10),
                            height: parseInt(taStyle.getPropertyValue('border-top-width'), 10) +
                                    parseInt(taStyle.getPropertyValue('padding-top'), 10) +
                                    parseInt(taStyle.getPropertyValue('padding-bottom'), 10) +
                                    parseInt(taStyle.getPropertyValue('border-bottom-width'), 10)
                          },
              minHeightValue = parseInt(taStyle.getPropertyValue('min-height'), 10),
              heightValue = parseInt(taStyle.getPropertyValue('height'), 10),
              minHeight = Math.max(minHeightValue, heightValue) - boxOuter.height,
              maxHeight = parseInt(taStyle.getPropertyValue('max-height'), 10),
              mirrored,
              active,
              copyStyle = ['font-family',
                           'font-size',
                           'font-weight',
                           'font-style',
                           'letter-spacing',
                           'line-height',
                           'text-transform',
                           'word-spacing',
                           'text-indent'];

          // exit if elastic already applied (or is the mirror element)
          if ($ta.data('elastic')) {
            return;
          }

          // Opera returns max-height of -1 if not set
          maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

          // append mirror to the DOM
          if (mirror.parentNode !== document.body) {
            angular.element(document.body).append(mirror);
          }

          // set resize and apply elastic
          $ta.css({
            'resize': (resize === 'none' || resize === 'vertical') ? 'none' : 'horizontal'
          }).data('elastic', true);

          /*
           * methods
           */

          function initMirror() {
            var mirrorStyle = mirrorInitStyle;

            mirrored = ta;
            // copy the essential styles from the textarea to the mirror
            taStyle = getComputedStyle(ta);
            angular.forEach(copyStyle, function(val) {
              mirrorStyle += val + ':' + taStyle.getPropertyValue(val) + ';';
            });
            mirror.setAttribute('style', mirrorStyle);
          }

          function adjust() {
            var taHeight,
                taComputedStyleWidth,
                mirrorHeight,
                width,
                overflow;

            if (mirrored !== ta) {
              initMirror();
            }

            // active flag prevents actions in function from calling adjust again
            if (!active) {
              active = true;

              mirror.value = ta.value + append; // optional whitespace to improve animation
              mirror.style.overflowY = ta.style.overflowY;

              taHeight = ta.style.height === '' ? 'auto' : parseInt(ta.style.height, 10);

              taComputedStyleWidth = getComputedStyle(ta).getPropertyValue('width');

              // ensure getComputedStyle has returned a readable 'used value' pixel width
              if (taComputedStyleWidth.substr(taComputedStyleWidth.length - 2, 2) === 'px') {
                // update mirror width in case the textarea width has changed
                width = parseInt(taComputedStyleWidth, 10) - boxOuter.width;
                mirror.style.width = width + 'px';
              }

              mirrorHeight = mirror.scrollHeight;

              if (mirrorHeight > maxHeight) {
                mirrorHeight = maxHeight;
                overflow = 'scroll';
              } else if (mirrorHeight < minHeight) {
                mirrorHeight = minHeight;
              }
              mirrorHeight += boxOuter.height;
              ta.style.overflowY = overflow || 'hidden';

              if (taHeight !== mirrorHeight) {
                ta.style.height = mirrorHeight + 'px';
                scope.$emit('elastic:resize', $ta);
              }

              // small delay to prevent an infinite loop
              $timeout(function() {
                active = false;
              }, 1);

            }
          }

          function forceAdjust() {
            active = false;
            adjust();
          }

          /*
           * initialise
           */

          // listen
          if ('onpropertychange' in ta && 'oninput' in ta) {
            // IE9
            ta['oninput'] = ta.onkeyup = adjust;
          } else {
            ta['oninput'] = adjust;
          }

          $win.bind('resize', forceAdjust);
          $win.bind('click', forceAdjust);

          scope.$watch(function() {
            return ngModel.$modelValue;
          }, function(newValue) {
            forceAdjust();
          });

          scope.$on('elastic:adjust', function() {
            initMirror();
            forceAdjust();
          });

          $timeout(adjust);
          
          /*
           * destroy
           */

          scope.$on('$destroy', function() {
            $mirror.remove();
            $win.unbind('resize', forceAdjust);
          });
          
        }
      };
    }
  ]);
      
    

// FILTERS ============================================================================
angular.module('field_guide_filters', ['ngSanitize', 'ui','ui.router']);

// CONTROLLERS ================================================================
angular.module('field_guide_controls', ['ui','ui.router']);
