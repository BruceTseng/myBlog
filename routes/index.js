var express = require('express');
var router = express.Router();
var firebaseAdminDb = require('../connection/firebase_admin');

const ref = firebaseAdminDb.ref('any');
ref.once('value', function(snapshot) {
  console.log(snapshot.val());
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/post', function(req, res, next) {
  res.render('post');
});

module.exports = router;
