// check-password-strength.js
// check the strength of a password.
'use strict';

(function() {
    angular.module('field_guide_controls')
    .directive('ngCheckStrength', function () {

        // return {
        //     replace: false,
        //     restrict: 'EACM',
        //     link: function (scope, iElement, iAttrs) {

        //         var strength = {
        //             colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
        //             measureStrength: function (p) {
        //                 if(p){
        //                     var _force = 0;                    
        //                     var _regex = new RegExp('[$-/:-?{-~!"^_`\[\]]','g');
                                                  
        //                     var _lowerLetters = /[a-z]+/.test(p);                    
        //                     var _upperLetters = /[A-Z]+/.test(p);
        //                     var _numbers = /[0-9]+/.test(p);
        //                     var _symbols = _regex.test(p);
                                                  
        //                     var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];                    
        //                     var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;                                          
                            
        //                     _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        //                     _force += _passedMatches * 10;
                                
        //                     // penality (short password)
        //                     _force = (p.length <= 6) ? Math.min(_force, 10) : _force;                                      
                            
        //                     // penality (poor variety of characters)
        //                     _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
        //                     _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
        //                     _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;
                            
        //                     return _force;
        //                 }

        //             },
        //             getColor: function (s) {
        //                 if(s){
        //                     var idx = 0;
        //                     if (s <= 10) { idx = 0; }
        //                     else if (s <= 20) { idx = 1; }
        //                     else if (s <= 30) { idx = 2; }
        //                     else if (s <= 40) { idx = 3; }
        //                     else { idx = 4; }
    
        //                     return { idx: idx + 1, col: this.colors[idx] };
        //                 }
        //             }
        //         };

        //         scope.$watch(iAttrs.ngCheckStrength, function () {
        //             // console.log('watching');
        //             if (!scope.user) {
        //                 // console.log('no user');
        //                 iElement.css({ "display": "none"  });
        //             } else {
        //                 // console.log(scope.user.password.length);
        //                 var c = strength.getColor(strength.measureStrength(scope.user.password));
        //                 iElement.css({ "display": "inline" });
        //                 iElement.children('li')
        //                     .css({ "background": "#DDD" })
        //                     .slice(0, c.idx)
        //                     .css({ "background": c.col });
        //             }
        //         });

        //     },
        //     template:   '<li class="pwStrength"></li>'+
        //                 '<li class="pwStrength"></li>'+
        //                 '<li class="pwStrength"></li>'+
        //                 '<li class="pwStrength"></li>'+
        //                 '<li class="pwStrength"></li>'
        // };

    });
})();

    
