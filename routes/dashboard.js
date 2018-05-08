var express = require('express');
var router = express.Router();
var firebaseAdminDb = require('../connection/firebase_admin');

router.get('/archives', function(req, res, next) {
  res.render('dashboard/archives');
});

router.get('/article', function(req, res, next) {
  res.render('dashboard/article');
});

router.get('/categories', function(req, res, next) {
  res.render('dashboard/categories');
});

router.get('/signup', function(req, res, next) {
  res.render('dashboard/signup');
});

module.exports = router;
