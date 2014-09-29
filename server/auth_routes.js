// auth_routes.js
'use strict';

var express  = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var router 	 = express.Router();

var User = require('../server/models/auth/user');

// Below from @artcommacode
router.routes.get('/auth/login', function (req, res, next) {
  res.render('authentication/views/login', {
    controller: 'authentication',
    action: 'login'
  });
});
 
router.routes.post('/auth/login', function (req, res, next) {
  mongoose.model('User').login(req.body.user, function (error, user) {
    if (error) {
      req.flash('error', error.message);
      res.redirect('back');
    } else {
      req.session.user = user;
      res.redirect('/admin/pages');
    }
  });
});
 
router.routes.get('*', function (req, res, next) {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    req.flash('error', 'Please log in.');
    res.redirect('/admin/auth/login');
  }
});

module.exports = router;