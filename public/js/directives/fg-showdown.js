// fg-showdown.js
// a Showdown converter to permit Markdown in key text fields
'use strict';
// kilroy was here

(function(){
    angular.module('field_guide_controls')
    .directive('markdown', function() {
        // var converter = new showdown.converter();
        var converter = new Showdown.converter();
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                // attrs.text comes from the `text="foo"` html attribute, in this example would be the string "foo"
                scope.$watch(attrs.text, function(text) {
                    var htmlText = converter.makeHtml(text);
                    element.html(htmlText);
                });
            }
        }
    });
})();