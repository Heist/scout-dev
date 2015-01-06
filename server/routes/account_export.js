// account_export.js
'use strict';
module.exports = function(app){

    //Module dependencies
    var mongoose = require('mongoose');  // SOMETIMES WE NEED OBJECTIDS
    var _ = require('underscore');
    var async = require('async');

    //load data storage models
    var Message = require('../models/data/message');
    var Task    = require('../models/data/task');
    var Test    = require('../models/data/test');
    var Tag     = require('../models/data/tag');
    var Session = require('../models/data/session');
    var Subject = require('../models/data/subject');


    app.route('/api/export/account/:_account')
        .get(function(req,res){
            console.log('account get user', req.user);
            // get all users who have the same account number as this user
            // get all tests with that account number
            // populate that test with tasks and messages
            // populate that test with tags and messages

        });
};