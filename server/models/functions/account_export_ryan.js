// account_export_2.js
'use strict';

var mongoose = require('mongoose');  // SOMETIMES WE NEED OBJECTIDS
var _ = require('lodash');
var async = require('async');
var Promise = require('bluebird');

// load data storage models
var Comment = require('../data/comment');
var Message = require('../data/message');
var Task    = require('../data/task');
var Test    = require('../data/test');
var Tag     = require('../data/tag');
var Subject = require('../data/subject');
var User    = require('../auth/user');
var Invitation = require('../auth/invitation');

var getUser = function (account) {
    return User.find({'_account': account}).select('name local.email');
};

var getTest = function (account) {
    return Test.find({'created_by_account': account})
        .populate('created_by_user')
        .select('name platform desc updated created created_by_user');
};

var getTask = function (argument) {
    return Task.find({'_test' : argument._id})
        .populate('_test _messages')
        .select('_messages created desc name pass_fail index report_index updated visible');
};

var getTasks = function (args) {
    return Promise.all(args, getTask);
};

var getMessage = function (message) {
    return Message.findOne({'_id': message._id}).populate('_comments');
};

var getMessages = function (object) {
    return Promise.all(object._messages, getMessage)
        .then(function (results) {
            object._messages = results;
            return object._messages;
        });
};

var parseTasks = function (objects) {
    return Promise.all(objects, getMessages);
};

var getTests = function (account) {
    return getTest(account).then(getTasks).then(parseTasks);
};

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