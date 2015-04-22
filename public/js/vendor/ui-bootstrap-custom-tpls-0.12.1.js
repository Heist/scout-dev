/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.1 - 2015-02-20
 * License: MIT
 */

 'use strict';
angular.module("ui.bootstrap", ["ui.bootstrap.tpls","ui.bootstrap.typeahead","ui.bootstrap.position","ui.bootstrap.bindHtml"]);
angular.module("ui.bootstrap.tpls", ["template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]);
angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
.factory('typeaheadParser', ['$parse', function ($parse) {
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
        parse:function (input) {
            var match = input.match(TYPEAHEAD_REGEXP);
            if (!match) {
                throw new Error(
                    'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
                        ' but got "' + input + '".');
            }

            return {
                itemName:match[3],
                source:$parse(match[4]),
                viewMapper:$parse(match[2] || match[1]),
                modelMapper:$parse(match[1])
            };
        }
    };
}])

.factory('postMessage', ['$http', function($http) {
            var postMessage = function(message, task, test, subject_id){

                    var note = {};
                    note.body = message;
                    note.created = new Date();
                     
                    note._task = task;
                    note._test = test;
                    note._subject = subject_id;

                    var promise = $http.post('/api/message/', note).then(function(response) {
                        // console.log('new reply', response);
                        return response.data;
                    });

                    return promise;
                };
            return postMessage;
        }])

.directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
    function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

    var HOT_KEYS = [9, 13, 27, 38, 40];

    return {
        require:'ngModel',
        link:function (originalScope, element, attrs, modelCtrl) {

            //SUPPORTED ATTRIBUTES (OPTIONS)

            //minimal no of characters that needs to be entered before typeahead kicks-in
            var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

            //minimal wait time after last character typed before typehead kicks-in
            var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

            //should it restrict model values to the ones selected from the popup only?
            var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

            //binding to a variable that indicates if matches are being retrieved asynchronously
            var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

            //a callback executed when a match is selected
            var onSelectCallback = $parse(attrs.typeaheadOnSelect);

            var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

            var appendToBody =    attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

            var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

    // INTERNAL VARIABLES =======================

            // where to insert the new element inside the original type-area
            var insertionModelVariable = $parse(attrs.ngModel);
            var insertionIndex;
            
            //expressions used by typeahead
            var parserResult = typeaheadParser.parse(attrs.typeahead);

            //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
            var hasFocus, timeoutPromise;


            //create a child scope for the typeahead directive so we are not polluting original scope
            //with typeahead-specific data (matches, query etc.)
            var scope = originalScope.$new();
                scope.activeIdx = -1;

            // WAI-ARIA
            var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);

            element.attr({
                'aria-autocomplete': 'list',
                'aria-expanded': false,
                'aria-owns': popupId
            });

            //pop-up element used to display matches
            var popUpEl = angular.element('<div typeahead-popup></div>');
            popUpEl.attr({
                id: popupId,
                matches: 'matches',
                active: 'activeIdx',
                select: 'select(activeIdx)',
                query: 'query',
                position: 'position'
            });

            //custom item template
            if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
                popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
            }

    // FUNCTIONS LIST ===========================

            var resetMatches = function() {
                scope.matches = [];
                scope.activeIdx = -1;
                element.attr('aria-expanded', false);
                console.log('reset index', scope.activeIdx);
            };


            var scheduleSearchWithTimeout = function(inputValue) {
                console.log('searching without timeout');
                timeoutPromise = $timeout(function () {
                    getMatchesAsync(inputValue);
                }, waitTime);
            };

            var cancelPreviousTimeout = function() {
                console.log('prev timeout cancelled');
                if (timeoutPromise) {
                    $timeout.cancel(timeoutPromise);
                }
            };

            var dismissClickHandler = function (evt) {
                // Keep reference to click handler to unbind it.
                console.log('clickhandler dismissed');
                if (element[0] !== evt.target) {
                    resetMatches();
                    evt.stopPropagation();
                }
            };

            var getMatchId = function(index) {
                return popupId + '-option-' + index;
            };

            var getMatchesAsync = function(inputValue) {
                // APRIL 22 WORK 
                var locals = {$viewValue: inputValue};
                isLoadingSetter(originalScope, true);

                $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
                    //it might happen that several async queries were in progress if a user were typing fast
                    //but we are interested only in responses that correspond to the current view value

                    // this doesn't work because it doesn't parse the current view value properly.
                    console.log( 'checking model.$viewValue.index', modelCtrl.$viewValue.indexOf(inputValue) );
                    
                    var onCurrentRequest = modelCtrl.$viewValue.indexOf(inputValue) > -1;

                    if (onCurrentRequest && hasFocus) {
                        if (matches.length > 0) {
                            scope.activeIdx = focusFirst ? 0 : -1;
                            scope.matches.length = 0;

                            console.log('focusFirst activeIdx', scope.activeIdx);

                            //transform labels
                            for(var i=0; i<matches.length; i++) {
                                locals[parserResult.itemName] = matches[i];
                                scope.matches.push({
                                    id: getMatchId(i),
                                    label: parserResult.viewMapper(scope, locals),
                                    model: matches[i]
                                });
                            }

                            scope.query = inputValue;

                            //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                            //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                            //due to other elements being rendered
                            scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                            scope.position.top = scope.position.top + element.prop('offsetHeight');

                            element.attr('aria-expanded', true);
                        } else {
                            resetMatches();
                        }
                    }
                    if (onCurrentRequest) {
                        isLoadingSetter(originalScope, false);
                    }

                }, function(){
                    resetMatches();
                    isLoadingSetter(originalScope, false);
                });
            };
            
            var modelParser = function (inputValue) {
                // Step through the model and do things with the input value
                // begin parsing an entry on a hashtag
                // if you want to do a separate type of input, match on @?

                // TODO: Abstract so there can be preferred variables set above to load different data sets.
                var tester = inputValue.match(/\S*#\S+/gi);
                var tag_body; 
                
                console.log('parsing model');

                if(!tester || tester.length === -1){
                    return;
                }

                if(tester && tester.length > 0){
                    tag_body = tester[tester.length -1].replace(/#/gi,'');
                }            
                
                hasFocus = true;

                // if we have a match on a hashtag
                // and the length of the newest hashtag value is greater than zero
                // get matches 

                if (tag_body && tag_body.length >= minSearch) {
                    // in here check matches on latest message
                    if (waitTime > 0) {
                        cancelPreviousTimeout();
                        scheduleSearchWithTimeout(tag_body);
                    } else {
                        getMatchesAsync(tag_body);
                    }
                } else {
                    isLoadingSetter(originalScope, false);
                    cancelPreviousTimeout();
                    resetMatches();
                }

                if (isEditable) {
                    return tag_body;
                } else {
                    if (!tag_body) {
                        // Reset in case user had typed something previously.
                        modelCtrl.$setValidity('editable', true);
                        return tag_body;
                    } else {
                        modelCtrl.$setValidity('editable', false);
                        return undefined;
                    }
                }
            };

            var modelFormatters = function (modelValue) {
                var candidateViewValue, emptyViewValue;
                var locals = {};

                if (inputFormatter) {

                    locals.$model = modelValue;
                    return inputFormatter(originalScope, locals);

                } else {

                    //it might happen that we don't have enough info to properly render input value
                    //we need to check for this situation and simply return model value if we can't apply custom formatting
                    locals[parserResult.itemName] = modelValue;
                    candidateViewValue = parserResult.viewMapper(originalScope, locals);
                    locals[parserResult.itemName] = undefined;
                    emptyViewValue = parserResult.viewMapper(originalScope, locals);

                    return candidateViewValue!== emptyViewValue ? candidateViewValue : modelValue;
                }
            };

        // ACTUAL FUNCTION ======================
            // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
            // This attribute is added or removed automatically when the `activeIdx` changes.
            scope.$watch('activeIdx', function(index) {
                console.log('inside watch', index);
                if (index < 0) {
                    element.removeAttr('aria-activedescendant');
                } else {
                    element.attr('aria-activedescendant', getMatchId(index));
                }
            });

            // As we get started, clear the match index.
            resetMatches();

            //we need to propagate user's query so we can highlight matches.
            scope.query = undefined;

            //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
            //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue

            // the function which parses the model
            modelCtrl.$parsers.unshift(function (inputValue){
                modelParser(inputValue);
            });

            modelCtrl.$formatters.push(function (modelValue) {
                modelFormatters(modelValue);
            });

            HOT_KEYS.push(32); // add spacebar to hot keys;
            element.bind('keydown', function (evt) {
                //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
                //typeahead is open and an "interesting" key was pressed
                // console.log('check the index on keypress', scope.activeIdx, evt.which);

                if(scope.activeIdx === -1 && evt.which === 13){
                    console.log('adding some keydown things', modelCtrl.$viewValue);
                    // postMessage(message);

                }

                if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                    return;
                }

                // if there's nothing selected (i.e. focusFirst) and enter is hit, don't do anything
                if (scope.activeIdx === -1 && (evt.which === 13 || evt.which === 9)) {
                    console.log('working as intended');
                    return;
                }

                if (evt.which === 32) {
                    // add a space to the model and cancel the dropdown
                    console.log('touched space 1', scope.activeIdx, modelCtrl.$viewValue);
                    var newValue = modelCtrl.$viewValue + ' ';
                    console.log(newValue,'.');

                    modelCtrl.$setViewValue = newValue;
                    modelCtrl.$render();

                    evt.stopPropagation();
                    resetMatches();
                    scope.$digest();
                    console.log('touched space 2', scope.activeIdx);
                } else {

                    evt.preventDefault();

                    if (evt.which === 40) {
                        // down arrow key
                        console.log('down arrow', evt.which)
                        scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                        console.log('down arrow selection', (scope.activeIdx + 1) % scope.matches.length);
                        scope.$digest();

                    } else if (evt.which === 38) {
                        console.log('up arrow', evt.which)
                        scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
                        scope.$digest();

                    } else if (evt.which === 13 || evt.which === 9) {
                        
                        console.log('enter or tab', evt.which)
                        scope.$apply(function() {
                            scope.select(scope.activeIdx);
                            resetMatches();
                            // console.log('check the index after pressing enter', scope.activeIdx);
                        })
                    } else if (evt.which === 27) {
                        console.log('escape', evt.which)
                        evt.stopPropagation();
                        resetMatches();
                        scope.$digest(); // here, this makes esc work.
                    } 
                }
            });

            element.bind('blur', function (evt) {
                hasFocus = false;
            });

            scope.select = function (activeIdx) {
                // this is how we pick a matched tag and insert it into the message. 
                // called from within the $digest() cycle
                console.log(activeIdx);
                var locals = {};
                var model, item;

                locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                model = parserResult.modelMapper(originalScope, locals);
                
                // TODO: Make this match only the +current+ scope.query
                // this is rough because it will replace all hashes that match the scope.query, 
                // not _just_ the scope.query.

                // insert the new tag into the input box
                var newValue = modelCtrl.$viewValue.replace('#'+scope.query, '#'+model);

                modelCtrl.$setViewValue(newValue);
                modelCtrl.$render();

                modelCtrl.$setValidity('editable', true);
                
                onSelectCallback(originalScope, {
                    $item: item,
                    $model: model,
                    $label: parserResult.viewMapper(originalScope, locals)
                });
                
                //return focus to the input element if a match was selected via a mouse click event
                // use timeout to avoid $rootScope:inprog error
                $timeout(function() { element[0].focus(); console.log('timeout fired') }, 0, false);
            };

            // Dismiss click handlers on the click of a general document click
            // or on the original scope being clicked.
            $document.bind('click', dismissClickHandler);

            originalScope.$on('$destroy', function(){
                $document.unbind('click', dismissClickHandler);
                if (appendToBody) {
                    $popup.remove();
                }
                scope.$destroy();
            });

            var $popup = $compile(popUpEl)(scope);

            if (appendToBody) {
                $document.find('body').append($popup);
            } else {
                element.after($popup);
            }
        }
    };

}])

    .directive('typeaheadPopup', function () {
        return {
            restrict:'EA',
            scope:{
                matches:'=',
                query:'=',
                active:'=',
                position:'=',
                select:'&'
            },
            replace:true,
            templateUrl:'template/typeahead/typeahead-popup.html',
            link:function (scope, element, attrs) {

                scope.templateUrl = attrs.templateUrl;

                scope.isOpen = function () {
                    return scope.matches.length > 0;
                };

                scope.isActive = function (matchIdx) {
                    return scope.active === matchIdx;
                };

                scope.selectActive = function (matchIdx) {
                    console.log('selecting active', matchIdx);
                    scope.active = matchIdx;
                };

                scope.selectMatch = function (activeIdx) {
                    console.log('click select', activeIdx);
                    scope.select({activeIdx:activeIdx});
                };
            }
        };
    })

    .directive('typeaheadMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
        return {
            restrict:'EA',
            scope:{
                index:'=',
                match:'=',
                query:'='
            },
            link:function (scope, element, attrs) {
                var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
                $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
                     element.replaceWith($compile(tplContent.trim())(scope));
                });
            }
        };
    }])

    .filter('typeaheadHighlight', function() {

        function escapeRegexp(queryToEscape) {
            return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        }

        return function(matchItem, query) {
            return query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
        };
    });

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
    .factory('$position', ['$document', '$window', function ($document, $window) {

        function getStyle(el, cssprop) {
            if (el.currentStyle) { //IE
                return el.currentStyle[cssprop];
            } else if ($window.getComputedStyle) {
                return $window.getComputedStyle(el)[cssprop];
            }
            // finally try and get inline style
            return el.style[cssprop];
        }

        /**
         * Checks if a given element is statically positioned
         * @param element - raw DOM element
         */
        function isStaticPositioned(element) {
            return (getStyle(element, 'position') || 'static' ) === 'static';
        }

        /**
         * returns the closest, non-statically positioned parentOffset of a given element
         * @param element
         */
        var parentOffsetEl = function (element) {
            var docDomEl = $document[0];
            var offsetParent = element.offsetParent || docDomEl;
            while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || docDomEl;
        };

        return {
            /**
             * Provides read-only equivalent of jQuery's position function:
             * http://api.jquery.com/position/
             */
            position: function (element) {
                var elBCR = this.offset(element);
                var offsetParentBCR = { top: 0, left: 0 };
                var offsetParentEl = parentOffsetEl(element[0]);
                if (offsetParentEl != $document[0]) {
                    offsetParentBCR = this.offset(angular.element(offsetParentEl));
                    offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                    offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
                }

                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop('offsetWidth'),
                    height: boundingClientRect.height || element.prop('offsetHeight'),
                    top: elBCR.top - offsetParentBCR.top,
                    left: elBCR.left - offsetParentBCR.left
                };
            },

            /**
             * Provides read-only equivalent of jQuery's offset function:
             * http://api.jquery.com/offset/
             */
            offset: function (element) {
                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop('offsetWidth'),
                    height: boundingClientRect.height || element.prop('offsetHeight'),
                    top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
                    left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
                };
            },

            /**
             * Provides coordinates for the targetEl in relation to hostEl
             */
            positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

                var positionStrParts = positionStr.split('-');
                var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

                var hostElPos,
                    targetElWidth,
                    targetElHeight,
                    targetElPos;

                hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

                targetElWidth = targetEl.prop('offsetWidth');
                targetElHeight = targetEl.prop('offsetHeight');

                var shiftWidth = {
                    center: function () {
                        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
                    },
                    left: function () {
                        return hostElPos.left;
                    },
                    right: function () {
                        return hostElPos.left + hostElPos.width;
                    }
                };

                var shiftHeight = {
                    center: function () {
                        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
                    },
                    top: function () {
                        return hostElPos.top;
                    },
                    bottom: function () {
                        return hostElPos.top + hostElPos.height;
                    }
                };

                switch (pos0) {
                    case 'right':
                        targetElPos = {
                            top: shiftHeight[pos1](),
                            left: shiftWidth[pos0]()
                        };
                        break;
                    case 'left':
                        targetElPos = {
                            top: shiftHeight[pos1](),
                            left: hostElPos.left - targetElWidth
                        };
                        break;
                    case 'bottom':
                        targetElPos = {
                            top: shiftHeight[pos0](),
                            left: shiftWidth[pos1]()
                        };
                        break;
                    default:
                        targetElPos = {
                            top: hostElPos.top - targetElHeight,
                            left: shiftWidth[pos1]()
                        };
                        break;
                }

                return targetElPos;
            }
        };
    }]);

angular.module('ui.bootstrap.bindHtml', [])

    .directive('bindHtmlUnsafe', function () {
        return function (scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
            scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
                element.html(value || '');
            });
        };
    });

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/typeahead/typeahead-match.html",
        "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/typeahead/typeahead-popup.html",
        "<ul class=\"dropdown-menu\" ng-show=\"isOpen()\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
        "        <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{match.id}}\">\n" +
        "                <div typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>{{$index}}\n" +
        "        </li>\n" +
        "</ul>\n" +
        "");
}]);
