// keypressControls.js
'use strict';

// A service to make keypress controls consistent across Field Guide.

angular.module('field_guide_controls')
    .factory('keystrokes', ['$interval', '$log', function($interval, $log){
        // on alt-down, move down the left nav.
        // on alt-n, if in Run, launch a new task.
    });