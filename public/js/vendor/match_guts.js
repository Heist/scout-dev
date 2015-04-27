
      //   var locals = {$viewValue: inputValue};
      //   isLoadingSetter(originalScope, true);
      //   $q.when(parserResult.source(originalScope, locals)).then(function(matches) {

      //     //it might happen that several async queries were in progress if a user were typing fast
      //     //but we are interested only in responses that correspond to the current view value
      //     var onCurrentRequest = (inputValue === modelCtrl.$viewValue);
      //     if (onCurrentRequest && hasFocus) {
      //       if (matches.length > 0) {

      //         scope.activeIdx = focusFirst ? 0 : -1;
      //         scope.matches.length = 0;

      //         //transform labels
      //         for(var i=0; i<matches.length; i++) {
      //           locals[parserResult.itemName] = matches[i];
      //           scope.matches.push({
      //             id: getMatchId(i),
      //             label: parserResult.viewMapper(scope, locals),
      //             model: matches[i]
      //           });
      //         }

      //         scope.query = inputValue;
      //         //position pop-up with matches - we need to re-calculate its position each time we are opening a window
      //         //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
      //         //due to other elements being rendered
      //         scope.position = appendToBody ? $position.offset(element) : $position.position(element);
      //         scope.position.top = scope.position.top + element.prop('offsetHeight');

      //         element.attr('aria-expanded', true);
      //       } else {
      //         resetMatches();
      //       }
      //     }
      //     if (onCurrentRequest) {
      //       isLoadingSetter(originalScope, false);
      //     }
      //   }, function(){
      //     resetMatches();
      //     isLoadingSetter(originalScope, false);
      //   });
      // };

      // resetMatches();

      // //we need to propagate user's query so we can highlight matches
      // scope.query = undefined;

      // //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
      // var timeoutPromise;

      // var scheduleSearchWithTimeout = function(inputValue) {
      //   timeoutPromise = $timeout(function () {
      //     getMatchesAsync(inputValue);
      //   }, waitTime);
      // };

      // var cancelPreviousTimeout = function() {
      //   if (timeoutPromise) {
      //     $timeout.cancel(timeoutPromise);
      //   }
      // };

      // //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      // //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      // modelCtrl.$parsers.unshift(function (inputValue) {

      //   hasFocus = true;

      //   if (inputValue && inputValue.length >= minSearch) {
      //     if (waitTime > 0) {
      //       cancelPreviousTimeout();
      //       scheduleSearchWithTimeout(inputValue);
      //     } else {
      //       getMatchesAsync(inputValue);
      //     }
      //   } else {
      //     isLoadingSetter(originalScope, false);
      //     cancelPreviousTimeout();
      //     resetMatches();
      //   }

      //   if (isEditable) {
      //     return inputValue;
      //   } else {
      //     if (!inputValue) {
      //       // Reset in case user had typed something previously.
      //       modelCtrl.$setValidity('editable', true);
      //       return inputValue;
      //     } else {
      //       modelCtrl.$setValidity('editable', false);
      //       return undefined;
      //     }
      //   }
      // });

      modelCtrl.$formatters.push(function (modelValue) {

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
      });

      scope.select = function (activeIdx) {
        //called from within the $digest() cycle
        var locals = {};
        var model, item;

        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
        model = parserResult.modelMapper(originalScope, locals);
        $setModelValue(originalScope, model);
        modelCtrl.$setValidity('editable', true);

        onSelectCallback(originalScope, {
          $item: item,
          $model: model,
          $label: parserResult.viewMapper(originalScope, locals)
        });

        resetMatches();

        //return focus to the input element if a match was selected via a mouse click event
        // use timeout to avoid $rootScope:inprog error
        $timeout(function() { element[0].focus(); }, 0, false);
      };

      // bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
      element.bind('keydown', function (evt) {
        //typeahead is open and an "interesting" key was pressed
        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
          console.log('these states match the typing', scope.matches); 
          return;
        }

        // if there's nothing selected (i.e. focusFirst) and enter is hit, don't do anything
        if (scope.activeIdx == -1 && (evt.which === 13 || evt.which === 9)) {
          return;
        }

        evt.preventDefault();

        if (evt.which === 40) {
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
          scope.$digest();

        } else if (evt.which === 38) {
          scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
          scope.$digest();

        } else if (evt.which === 13 || evt.which === 9) {
          scope.$apply(function () {
            scope.select(scope.activeIdx);
          });

        } else if (evt.which === 27) {
          evt.stopPropagation();

          resetMatches();
          scope.$digest();
        }
      });

      // element.bind('blur', function (evt) {
      //   hasFocus = false;
      // });

      // // Keep reference to click handler to unbind it.
      // var dismissClickHandler = function (evt) {
      //   if (element[0] !== evt.target) {
      //     resetMatches();
      //     scope.$digest();
      //   }
      // };

      // $document.bind('click', dismissClickHandler);

      // originalScope.$on('$destroy', function(){
      //   $document.unbind('click', dismissClickHandler);
      //   if (appendToBody) {
      //     $popup.remove();
      //   }
      // });

      // var $popup = $compile(popUpEl)(scope);
      // if (appendToBody) {
      //   $document.find('body').append($popup);
      // } else {
      //   element.after($popup);
      // }