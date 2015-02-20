// Account_wrangle_async_bluebird.js
'use strict';

var mongoose = require('mongoose');  // SOMETIMES WE NEED OBJECTIDS
var _ = require('lodash');
var async = require('async');
var Promise = require('bluebird');

// load data storage models
var User    = require('../auth/user');
var Invitation = require('../auth/invitation');


  // TODO: Async refactor =================================
    // if there is a user with that name already,
    // add them to your account? << this needs its own route.
    // throw an error and block a signup

    // else find an invitation and pass it along
    // if the invitation has been found, send an error that it has already been found
    // if no invitation exists, and no user exists, then create a new invitation
    // then e-mail that invitation to the relevant user


var getUser = function (address) {
    return User.findOne({'local.email' : address });
};

var getInvite = function(address){
    return Invitation.findOne({'invite_email' : address});
};

// .then(function () { throw... }) -> this promise will be rejected
// 4:10 PM <myndzi> Promise.reject('foo') will create a rejected promise, but that's not something you would use in a chain


module.exports = function (account) {  
    return getUser(account).then(function (user) {
        return getTests(account).then(function (tests) {
            return {
                user: user,
                tests: tests
            };
        });
    }).catch(function (error) {
        return error;
    });
};