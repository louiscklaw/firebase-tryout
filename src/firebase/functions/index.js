const path = require("path");

const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const env = require(`${__dirname}/env.js`);

var vars = require(`${env.FUNCTION_HOME}/vars.js`);
var common = require(`${env.FUNCTION_HOME}/common.js`);
var db_util = require(`${env.FUNCTION_HOME}/db_util.js`);
var user = require(`${env.FUNCTION_HOME}/user.js`);
var db = vars.db;

const FIGHTS_COLLECTION_NAME = vars.collection_name;

const GET_ENDPOINTS = {
  "/fights": db_util.get_records,
  "/hello_get": hello_get,
  "/echo_get": echo_get
  // '/list_fight': list_record
};

const POST_ENDPOINTS = {
  "/hello_post": echo_post,
  "/create_fight": db_util.create_record,
  "/login": user.login,
  "/logout": user.logout

  // '/query_login_status': user.checkLoginStatus
};

const PUT_ENDPOINTS = {};
const DELETE_ENDPOINTS = {};

const api_js_test = express();
const main = express();

main.use(cors());
main.use("/api/jstest", api_js_test);
main.use(bodyParser.json());

exports.main = functions.https.onRequest(main);
// exports.helloWorld = functions.https.onRequest( say_hello );

function hello_get(req, res) {
  console.log("hello_get");
  res.send(new Date());
}

function echo_get(req, res) {
  // res.send( req.param.test );
  res.send(req.query);
}

function list_record_from_db(req, res) {
  common.debug_print("list record calling");

  let citiesRef = db.collection("fights");
  let allCities = citiesRef
    .get()
    .then(snapshot => {
      let result = {};
      let _ = snapshot.forEach(doc => {
        result[doc.id] = doc.data();
        // console.log( doc.id, '=>', doc.data() );
      });
      res.send(result);
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}

// TODO: delete
function list_record(req, res) {
  res.send(list_record_from_db(req, res));
}

function echo_post(req, res) {
  try {
    res.send(req.body.echo);
  } catch (error) {
    console.error(req.body.echo);
  }
}

async function get_record_by_id(id_in) {
  return await db
    .collection(FIGHTS_COLLECTION_NAME)
    .doc(id_in)
    .get()
    .then(record => {
      console.log("record found outside");
      return {
        _id: record.id,
        value: record.data()
      };
    });
}

async function update_record(id_in, title) {
  var data = { title };
  let _ = await db
    .collection("fights")
    .doc(id_in)
    .set(data, { merge: true });

  return await get_record_by_id(id_in);
}

Object.keys(GET_ENDPOINTS).forEach(endpoint_path => {
  api_js_test.get(endpoint_path, GET_ENDPOINTS[endpoint_path]);
});

api_js_test.get("/fight/:id", async (req, res) => {
  res.send(await get_record_by_id(req.params.id));
});

api_js_test.put("/fights/:id", async (req, res) => {
  res.send(await update_record(req.params.id, req.body.title));
});

api_js_test.delete("/fights/:id", async (req, res) => {
  res.send(await db_util.delete_record(req, res));
});

if (vars.debug) {
  api_js_test.get("/db_util/delete_all", async (req, res) => {
    await db_util.delete_all_record(req, res);
  });
}

Object.keys(POST_ENDPOINTS).forEach(endpoint_path => {
  api_js_test.post(endpoint_path, POST_ENDPOINTS[endpoint_path]);
});

api_js_test.get("/list_user", async (req, res) => {
  user.list_user( req, res );
});

api_js_test.post("/create_user", async (req, res) => {
  await user.create_user(req, res);
});
