const firebase = require("firebase");
const admin = require("firebase-admin");

const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");

const vars = require(`${__dirname}/vars.js`);
var db = vars.db;
const FIGHTS_COLLECTION_NAME = vars.collection_name;

firebase.initializeApp({
  apiKey: "AIzaSyAOmYuIlaPJw_m7BmfoGsY9JWDNdgqqpmc",
  authDomain: "test-hosting-ffbe0.firebaseapp.com"
});

const user_app = express();
user_app.use(cors({ origin: true }));
user_app.use(cookieParser());

function cookieContainsIdToken(req, res) {
  res.set({ "Access-Control-Allow-Credentials": true });
  return req.cookies._idToken != null;
}

user_app.use((req, res, next) => {
  if (cookieContainsIdToken(req, res)) {
    let idToken_in = req.cookies._idToken;
    decodeToken(idToken_in).then(decodedToken => {
      if (check_user_exist(decodedToken.email)) {
        console.log(`${decodedToken.email} user found`);
        next();
      } else {
        res.send(JSON.stringify({ result: "user not found in our db" }));
      }
    });
  }else{
    console.log('cookie not containing token');
  }
});

// check user by user email
function check_user_exist(user_email) {
  return db
    .collection(vars.USER_COLLECTION)
    .where("email", "==", user_email)
    .get()
    .then(ss => {
      if (ss.empty) {
        // user record not exist in our database
        return false;
      } else {
        // user record exist in our database
        return true;
      }
    });
}

async function decodeToken(token_in) {
  return admin.auth().verifyIdToken(token_in);
}

user_app.get("/helloworld", async (req, res) => {
  let idToken_in = req.cookies._idToken;

  decodeToken(idToken_in).then(decodedToken => {
    res.set({ "Access-Control-Allow-Credentials": true });
    res.send(decodedToken.email);
  });
});

user_app.get("/link_test", (req, res) => {
  res.send("link_test");
});

user_app.post("/verifyIdToken", (req, res) => {
  console.log("verifyIdToken calling");
  let idToken = req.body.token;
  getEmailFromIdToken(idToken);
});

user_app.post("/user", async (req, res) => {
  let user_email = req.body.email;
  await db
    .collection(vars.USER_COLLECTION)
    .add({ email: user_email })
    .then(userRef => {
      res.json({
        result: "done",
        _id: userRef.id
      });
    });
});

user_app.get("/users", async (req, res) => {
  let user_list = {};
  await db
    .collection(vars.USER_COLLECTION)
    .get()
    .then(ss => {
      ss.forEach(s => {
        user_list[s.id] = s.data();
      });
    });
  res.send(user_list);
});

user_app.get("/user", (req, res) => {});

user_app.put("/user/:id", (req, res) => {});

user_app.delete("/user/:id", (req, res) => {
  let id_to_delete = req.params.id;
  db.collection(vars.USER_COLLECTION)
    .doc(id_to_delete)
    .delete()
    .then(() => {
      res.send({ result: "done" });
    });
});

// to check if the user exist in our db
user_app.get("/check_user/:email", async (req, res) => {
  let user_email = req.params.email;
  console.log(user_email);
  await check_user_exist(user_email).then(result => {
    console.log(result);
  });

  res.send("helloworld");
});

module.exports = user_app;
