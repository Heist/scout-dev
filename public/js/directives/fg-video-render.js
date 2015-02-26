// fg-video-render.js
// render a video embed for an object
'use strict';

(function(){
    angular.module('field_guide_controls')
        .factory('objectEmbed', ['$http', '$sce', function($http, $sce) {
            var objectEmbed = function(embed){

                var utest = /usabilitytestresults/i;
                var ut = utest.test(embed);

                if(ut){
                    var w1 = /width='\d+'/i;
                    var h1 = /height='\d+'/i;
                    var w2 = /"width":"\d+"/i;
                    var h2 = /"height":"\d+"/i;
                    
                    var res = embed.replace(w1, "width='574'");
                    res = res.replace(w2, '"width":"574"');
                    res = res.replace(h1, "height='380'");
                    res = res.replace(h2, '"height":"380"');

                    return {ut : $sce.trustAsHtml(res)};
                } else {
                    return {youtube: embed};
                }
            };
            return objectEmbed;
        }]);
})();