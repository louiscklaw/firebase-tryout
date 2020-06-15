#!/usr/bin/env mocha
const path = require("path");

const TEST_HOME = __dirname;
const PROJ_HOME = path.normalize(`${__dirname}/..`);
const SRC_HOME = path.normalize(`${PROJ_HOME}/src`);

const vars = require(path.normalize(`${TEST_HOME}/vars.js`));

var chai = require("chai"),
  chaiHttp = require("chai-http");

var assert = chai.assert; // Using Assert style
var expect = chai.expect; // Using Expect style
var should = chai.should(); // Using Should style

const FIREBASE_HOSTING = "http://localhost:5000";
const FIREBASE_FUNCTIONS = "http://localhost:5001";
const FIREBASE_ENDPOINT = `${FIREBASE_FUNCTIONS}/bulma-crud/us-central1`

const TEST_CALL_STARTTIME = "2019-01-01";
const TEST_CALL_ENDTIME = "2019-01-02";

chai.use(chaiHttp);

function prepare_request(dest_server) {
  return chai.request(dest_server);
}

function prepare_post_request(dest_server, post_end_point) {
  return prepare_request(dest_server).post(post_end_point);
}
function prepare_json_post_request(dest_server, post_end_point, json_body) {
  return prepare_post_request(dest_server, post_end_point).set(
    "content-type",
    "application/json"
  );
}

function prepare_get_request(dest_server, get_end_point) {
  return prepare_request(dest_server).get(get_end_point);
}

function api_server_helloworld() {
  it( "api server hellworld", () => {
    let url_to_test = FIREBASE_ENDPOINT+"/hw/helloworld";
    console.log(url_to_test);
    prepare_get_request(url_to_test,'/').end((err, res) => {
      expect(res).to.have.status(200);
      // assert(res.text == "test OK", "test fail");
      assert.equal(res.text, 'helloworld');
    });
  });
}

function api_server_local_get_loopback() {
  it( "api server local get loopback", () => {
    let url_to_test = FIREBASE_ENDPOINT+"/debug/echo";
    prepare_get_request(url_to_test,'/?q=123').end((err, res) => {
      expect(res).to.have.status(200);
      // assert(res.text == "test OK", "test fail");
      assert.deepEqual(JSON.parse(res.text),{"q":"123"});

    });
  });
}

function prepare_post_request ( dest_server, post_end_point ) {
  return prepare_request( dest_server )
    .post(post_end_point)
}
function prepare_json_post_request ( dest_server, post_end_point, json_body ) {
  return prepare_post_request( dest_server, post_end_point )
    .set( 'content-type', 'application/json' );
}

function api_server_local_post_loopback() {
  it( "api server local get loopback", () => {
    let url_to_test = FIREBASE_ENDPOINT+"/debug/echo";
    prepare_json_post_request(url_to_test,'/')
      .send({q:456})
      .end((err, res) => {
      expect(res).to.have.status(200);
      // assert(res.text == "test OK", "test fail");
      assert.deepEqual(JSON.parse(res.text),{q:456});

    });
  });
}

describe("firebase test helloworld", () => {
  describe("basic loopback", () => {
    api_server_helloworld();
    api_server_local_get_loopback();
    api_server_local_post_loopback();
  });
});
