var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/post', function(req, res, next) {
  res.render('post');
});

router.get('/dashboard/archives', function(req, res, next) {
  res.render('dashboard/archives');
});

router.get('/dashboard/article', function(req, res, next) {
  res.render('dashboard/article');
});

router.get('/dashboard/categories', function(req, res, next) {
  res.render('dashboard/categories');
});

router.get('/dashboard/signup', function(req, res, next) {
  res.render('dashboard/signup');
});

module.exports = router;
