#!/usr/bin/env mocha

const path = require( 'path' );

var chai = require( 'chai' ),
  chaiHttp = require( 'chai-http' );

const TEST_HOME = __dirname;
const PROJ_HOME = path.join( `${__dirname}/..` )
// const SRC_HOME = path.join( PROJ_HOME, 'src' );

var assert = chai.assert; // Using Assert style
var expect = chai.expect; // Using Expect style
var should = chai.should(); // Using Should style

const err_msg = require( `${TEST_HOME}/err_msg.js` );


// const TEST_SERVER_AND_PORT = 'localhost:8082';
const LOCAL_TEST_API_SERVER = 'http://localhost:5000/test-firebase-3a0f6/us-central1'
// const TEST_API_SERVER = 'https://us-central1-test-firebase-3a0f6.cloudfunctions.net';

const TEST_API_SERVER = LOCAL_TEST_API_SERVER;

const API_PATH = '/main/api/jstest';

// const TEST_CALL_STARTTIME = '2019-01-01';
// const TEST_CALL_ENDTIME = '2019-01-02';
// const TEST_CALL_GEO = 'HK';
// const TEST_CALL_KEYWORD = 'apple';

chai.use( chaiHttp );

function get_endpoint( subpath_in ) {
  return API_PATH + subpath_in;
}

function prepare_request( dest_server ) {
  return chai.request( dest_server );
}

function prepare_post_request( dest_server, post_end_point ) {
  return prepare_request( dest_server )
    .post( post_end_point )
}

function prepare_json_post_request( dest_server, post_end_point, json_body ) {
  return prepare_post_request( dest_server, post_end_point )
    .set( 'content-type', 'application/json' );
}

function prepare_get_request( dest_server, get_end_point ) {
  return prepare_request( dest_server )
    .get( get_end_point );
}

function prepare_delete_request ( dest_server, delete_end_point ) {
  return prepare_request( dest_server )
    .delete( delete_end_point );
}

function api_server_hello_get() {
  it( 'api server local get loopback', () => {
    prepare_get_request( TEST_API_SERVER, get_endpoint( '/hello_get' ) )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );

      } )
  } )
}

function api_server_local_get_loopback() {
  it( 'api server local get loopback', () => {
    prepare_get_request( TEST_API_SERVER, API_PATH + '/echo_get?echo=foobar' )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        assert.equal( res.text, 'foobar' );
      } )
  } )
}

function api_server_local_post_loopback() {
  it( 'api server local post loopback', () => {
    prepare_json_post_request( TEST_API_SERVER, API_PATH + '/hello_post' )
      .send( {
        echo: 'foobar'
      } )
      .end( ( err, res ) => {
        assert.equal( 'foobar', res.text );
      } )
  } )
}

function create_record() {
  var id = '';
  return prepare_json_post_request( TEST_API_SERVER, API_PATH + '/create_fight' )
    .send( { "winner": "levi", "losser": "henry", "title": "fight1" } )

}

function api_test_create() {
  it( 'test create record', () => {
    create_record()
      .end( ( err, res ) => {
        expect( res ).to.be.json;
        var res_json = JSON.parse( res.text );

        assert.equal( res_json[ 'result' ], 'done' );
        assert.containsAllKeys( res_json, [ 'result', '_id' ], err_msg.KEY_NOT_FOUND_IN_RESPONSE );

        console.log( res.text );

      } )
  } )
}

function delete_record_by_id ( id_in ) {
  return prepare_delete_request( TEST_API_SERVER, `${API_PATH}/fights/${id_in}` )

}

function api_test_delete () {
  it( 'test delete record', () => {
    create_record()
      .then( res => {
        var _id = JSON.parse( res.text )['_id'];
        delete_record_by_id( _id )
          .end( ( err, res ) => {
            console.log(res.text);
            expect( res ).to.be.json;
          })
      })
  })
}

function api_test_read( id_in ) {

  it( 'test read record', () => {
    prepare_get_request( TEST_API_SERVER, get_endpoint( '/get_fight/' + id_in ) )
      .end( ( err, res ) => {
        console.log( res.text );
      } );
  } )
}


function api_test_list() {
  it( 'list record', () => {
    prepare_get_request( TEST_API_SERVER, get_endpoint( '/fights' ) )
      .end( ( err, res ) => {
        // console.log( res );
        expect( res ).to.be.json;

        // TODO: enrich test
        var res_json = JSON.parse( res.text );

      } )
  } )
}

describe( 'firebase api test', () => {
  describe( 'helloworld', () => {
    api_server_hello_get();
    api_server_local_get_loopback();
    api_server_local_post_loopback();

  } )
  describe( 'test firebase basic', () => {
    api_test_create();
    api_test_list();

    api_test_delete();

    // api_test_read(api_test_create());
    // api_test_param();
  } )
} )
