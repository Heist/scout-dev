// fg-report-functions.js
//  simple functions used in all three report views.

(function() {
    'use strict';

// This module builds out the left navigation used in report and summary controllers.
// It does not require login in order to load information, because it is required for public routes.
    angular.module('field_guide_controls')
        .factory('reportFunctions', ['$http', '$sce', function($http, $sce) {
            return {
                videoRender : function(embed){
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

                        return {embed : $sce.trustAsHtml(res)};
                    } else {
                        return {youtube: embed};
                    }
                },
                moveTask : function(list, old_index, new_index){
                    new_index = old_index + new_index;
                    list.splice(new_index, 0, list.splice(old_index, 1)[0]);
                    
                    (function(){
                        var obj_count=0;
                        // set the stored index of the task properly
                        _.each(list, function(obj){
                            obj.report_index = obj_count;
                            obj_count++;
                        });
                    })();
                    return list;
                }
            };
        }]);
})();