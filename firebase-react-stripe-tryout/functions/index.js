const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");

// const test_app = express();
// test_app.use(cookieParser());

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
