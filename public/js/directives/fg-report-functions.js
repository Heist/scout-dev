// fg-report-functions.js
//  simple functions used in all three report views.

(function() {
    'use strict';

// This module builds out the left navigation used in report and summary controllers.
// It does not require login in order to load information, because it is required for public routes.
    angular.module('field_guide_controls', [])
        .service('reportFunctions', ['$http', function($http) {
            return {
                generateList : function(){},
                moveTask : function(list, old_index, new_index){
                    new_index = old_index + new_index;
                    list.splice(new_index, 0, list.splice(old_index, 1)[0]);
                    return list;
                    // (function(){
                    //     var obj_count=0;
                    //     // set the stored index of the task properly
                    //     _.each(list, function(obj){
                    //         obj.report_index = obj_count;
                    //         obj_count++;
                    //     });
                    // })();
                }
            };
        }]);
})();