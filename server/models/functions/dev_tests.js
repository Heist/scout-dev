// dev_tests.js - generates first-time signup tests
'use strict';

module.exports = function(account, id){
    // on first login via signup, create a test for this user.
    var Test    = require('../data/test');
    var Task    = require('../data/task');
    var Tag     = require('../data/tag');

    var Message = require('../data/message');
    var Subject = require('../data/subject');
    

    var async   = require('async');
    var _ = require('underscore');

    
};