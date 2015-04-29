// account_export.js
'use strict';
module.exports = function(app){

    //Module dependencies
    var mongoose = require('mongoose');  // SOMETIMES WE NEED OBJECTIDS
    var _ = require('lodash');
    var async = require('async');

    //load data storage models 
    var models = require('../models/');


    app.route('/api/export/account/:_account')
        .get(function(req,res){
            // 
            // get all users who have the same account number as this user
            // get all tests with that account number
            // populate that test with tasks and messages
            // populate that test with tags and messages

        });
};