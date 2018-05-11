var express = require('express');
var router = express.Router();
const firebaseClient = require('../connection/firebase_client');

router.get('/signup', function (req, res, next) {
    const messages = req.flash('error');
    res.render('dashboard/signup', {
        messages,
        hasErrors: messages.length > 0,
    });
});

router.get('/signin', function (req, res, next) {
    const messages = req.flash('error');
    res.render('dashboard/signin', {
        messages,
        hasErrors: messages.length > 0,
    });
});

router.get('/signout', function (req, res, next) {
    req.session.uid = '';
    res.redirect('/auth/signin');
});

router.post('/signup', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;
    if (password !== confirmPassword) {
        req.flash('error', '兩個密碼輸入不符合');
        res.redirect('/auth/signup');
    }
    firebaseClient.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            console.log(req.session.uid);
            res.redirect('/auth/signin');
        })
        .catch(function (error) {
            console.log(error);
            req.flash('error', error.message);
            res.redirect('/auth/signup');
        });
});

router.post('/signin', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(firebaseClient.auth);

    firebaseClient.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            req.session.uid = user.uid;
            req.session.mail = req.body.email;
            console.log(req.session.uid);
            res.redirect('/dashboard');
        })
        .catch((error) => {
            req.flash('error', error.message);
            res.redirect('/auth/signin');
        });
});


module.exports = router;