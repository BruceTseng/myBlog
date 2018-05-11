var firebase = require("firebase");

require('dotenv').config();

var config = {
    "apiKey": process.env.FIREBASE_API_KEY,
    "authDomain": process.env.FIREBASE_AUTH_DOMAIN,
    "databaseURL": process.env.FIREBASE_DATABASEURL,
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "storageBucket": "my-blog-a29d3.appspot.com",
    "messagingSenderId": "409213532321"
};
firebase.initializeApp(config);
module.exports = firebase;