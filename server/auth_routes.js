// auth_routes.js
'use strict';

var express  = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var router 	 = express.Router();

// MIDDLEWARE FOR AUTHENTICATION ==========================
router.use(function (req, res, next) {

  if (req.method === 'POST' && req.url === '/login') {
    // Log #1
    console.log(passport);

    passport.authenticate('login', { 
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true 
    });

  } else {

    next();

  }
});

// ACTUAL ROUTES ==========================================
router.route('/')
      .get(function (req, res) {
        res.render('index');
      });

router.route('/login')
      .post(function (req, res) {
        console.log('Post on /login');
      })
      .get(function (req, res) {
        res.render('login', {
          message: req.flash('loginMessage')
        });
      });

// app.use('/', router);

module.exports = router;