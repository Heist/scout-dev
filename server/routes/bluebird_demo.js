// Account_wrangle_async_bluebird.js
'use strict';

var mongoose = require('mongoose');  // SOMETIMES WE NEED OBJECTIDS
var _ = require('lodash');
var async = require('async');
var Promise = require('bluebird');

// load data storage models
var User    = require('../auth/user');
var Invite = require('../auth/Invite');


  // TODO: Async refactor =================================
    // if there is a user with that name already,
    // add them to your account? << this needs its own route.
    // throw an error and block a signup

    // else find an Invite and pass it along
    // if the Invite has been found, send an error that it has already been found
    // if no Invite exists, and no user exists, then create a new Invite
    // then e-mail that Invite to the relevant user


var getUser = function (address) {
    return User.findOne({'local.email' : address });
};

var getInvite = function(address){
    return Invite.findOne({'invite_email' : address});
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