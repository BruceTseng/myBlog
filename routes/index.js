var express = require('express');
var router = express.Router();
var firebaseAdminDb = require('../connection/firebase_admin');
const categoriesRef = firebaseAdminDb.ref('/categories');
const articlesRef = firebaseAdminDb.ref('/articles');
var converPagination = require('../modules/convertPagination');
// const ref = firebaseAdminDb.ref('any');
// ref.once('value', function(snapshot) {
//   console.log(snapshot.val());
// });
var moment = require('moment');
/* GET home page. */

router.get('/', function(req, res, next) {
  let currentPage = Number.parseInt(req.query.page) || 1;
  const status = req.query.status || 'public';
  let categories = {};
  categoriesRef.once('value')
  .then(function(snapshot) {
    categories = snapshot.val();
    return articlesRef.orderByChild('update_time').once('value');
  })
  .then(function(snapshot) {
    const articles = [];
    snapshot.forEach(function(snapshotChild) {
      if (snapshotChild.val().status === 'public') {
        articles.push(snapshotChild.val());
      }
    });
    articles.reverse();
    
    const data = converPagination(articles, currentPage);
    
    // console.log(categories, articles);
    res.render('index', {
      articles: data.data,
      categories,
      status,
      moment,
      page: data.page
    });
  });
});

router.get('/post', function(req, res, next) {
  res.render('post');
});

router.get('/post/:id', function (req, res, next) {
  const id = req.params.id;
  let categories = {};
  categoriesRef.once('value')
    .then(function (snapshot) {
      categories = snapshot.val();
      console.log(categories);
      return articlesRef.child(id).once('value');
    })
    .then(function(snapshot) {
      const article = snapshot.val();
      if (!article) {
        return res.render('error', {
          title: '找不到該文章'
        })
      }
      res.render('post', {
        categories,
        article,
        moment
      });
    });
});

module.exports = router;
