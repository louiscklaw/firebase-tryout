const functions = require('firebase-functions');

const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const vars = require(`${__dirname}/vars.js`);
var db = vars.db;

const crud_app = require(`${__dirname}/crud_app.js`);
// const user_app = require(`${__dirname}/user_app.js`);
// const debug_app = require(`${__dirname}/debug_app.js`);
const hw_app = require(`${__dirname}/hw_app.js`);


const test_app = express();
test_app.use(cookieParser());

test_app.get('/test', (req, res)=>{
  res.send('testtesttest');
})
exports.test = functions.https.onRequest(test_app);

// Expose Express API as a single Cloud Function:
exports.hw = functions.https.onRequest(hw_app);
exports.crud = functions.https.onRequest(crud_app);
// exports.user = functions.https.onRequest(user_app);
// exports.debug = functions.https.onRequest(debug_app);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
   });
