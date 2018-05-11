var express = require('express');
var router = express.Router();
var firebaseAdminDb = require('../connection/firebase_admin');
const categoriesRef = firebaseAdminDb.ref('/categories');
const articlesRef = firebaseAdminDb.ref('/articles');
var moment = require('moment');

router.get('/', function (req, res, next) {
  const messages = req.flash('error');
  res.render('dashboard/index', {
    messages,
    currentPage: '/',
    hasErrors: messages.length > 0,
  });
});


router.get('/archives', function (req, res, next) {
  const status = req.query.status || 'public';
  console.log(status);
  let categories = {};
  categoriesRef.once('value')
    .then(function (snapshot) {
      categories = snapshot.val();
      return articlesRef.orderByChild('update_time').once('value');
    })
    .then(function (snapshot) {
      const articles = [];
      snapshot.forEach(function (snapshotChild) {
        if (status === snapshotChild.val().status) {
          articles.push(snapshotChild.val());
        }
      });
      articles.reverse();
      // console.log(categories, articles);
      res.render('dashboard/archives', {
        articles,
        categories,
        status,
        moment
      });
    });
});

router.get('/article/create', function (req, res, next) {
  categoriesRef.once('value')
    .then(function (snapshot) {
      const categories = snapshot.val();
      res.render('dashboard/article', {
        categories
      });
    });
});

router.get('/categories', function (req, res, next) {
  const messages = req.flash('info');
  categoriesRef.once('value')
    .then(function (snapshot) {
      const categories = snapshot.val();
      res.render('dashboard/categories', {
        categories,
        messages,
        hasInfo: messages.length > 0
      });
    });
});

router.get('/signup', function (req, res, next) {
  res.render('dashboard/signup');
});

router.get('/article/:id', function (req, res, next) {
  const id = req.params.id;
  let categories = {};
  categoriesRef.once('value')
    .then(function (snapshot) {
      categories = snapshot.val();
      return articlesRef.child(id).once('value');
    })
    .then(function (snapshot) {
      const article = snapshot.val();
      res.render('dashboard/article', {
        categories,
        article
      });
    });
});

router.post('/article/create', function (req, res) {
  const data = req.body;
  const articleRef = articlesRef.push();
  const key = articleRef.key;
  const updateTime = Math.floor(Date.now() / 1000);
  data.id = key;
  data.update_time = updateTime;
  articleRef.set(data)
    .then(function () {
      res.redirect(`/dashboard/article/${key}`);
    });
});

router.post('/article/update/:id', function (req, res) {
  const data = req.body;
  const id = req.params.id;
  articlesRef.child(id).update(data)
    .then(function () {
      res.redirect(`/dashboard/article/${id}`);
    });
});

router.post('/article/delete/:id', function (req, res) {
  const id = req.params.id;
  req.flash('info', '文章已刪除');
  articlesRef.child(id).remove();
  res.send('文章已刪除')
  res.end(); // ajax行為結束
  // res.redirect('/dashboard/categories');
});


router.post('/categories/create', function (req, res) {
  const data = req.body;
  const categoryRef = categoriesRef.push();
  const key = categoryRef.key;
  data.id = key;

  categoriesRef.orderByChild('path').equalTo(data.path).once('value')
    .then(function (snapshot) {
      if (snapshot.val() != null) {
        req.flash('info', '已有相同路徑');
        res.redirect('/dashboard/categories');
      } else {
        categoryRef.set(data)
          .then(function (params) {
            res.redirect('/dashboard/categories');
          });
      }
    });
});

router.post('/categories/delete/:id', function (req, res, next) {
  const id = req.params.id;
  req.flash('info', '欄位已刪除')
  categoriesRef.child(id).remove();
  res.redirect('/dashboard/categories');
});

module.exports = router;