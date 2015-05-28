// fg-showdown.js
// a Showdown converter to permit Markdown in key text fields
'use strict';

(function(){
    angular.module('field_guide_controls')
    .directive('markdown', function() {
        // var converter = new showdown.converter();
        var converter = new Showdown.converter();
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                var htmlText = converter.makeHtml(element.text());
                element.html(htmlText);
            }
        }
    });
})();