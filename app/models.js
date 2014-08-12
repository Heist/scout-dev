'use strict';
// models.js

var models = ['./models/message', './models/step', './models/flow', './models/session','./models/summary'];

exports.initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i])();
    }
};