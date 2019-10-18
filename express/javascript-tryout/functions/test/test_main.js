#!/usr/bin/env mocha
const path = require( 'path' );

var chai = require( 'chai' ),
    chaiHttp = require( 'chai-http' );

const TEST_HOME = __dirname;
const PROJ_HOME = path.join( __dirname, '..' )
// const SRC_HOME = path.join( PROJ_HOME, 'src' );

var assert = chai.assert; // Using Assert style
var expect = chai.expect; // Using Expect style
var should = chai.should(); // Using Should style

const err_msg = require( __dirname + '/err_msg.js' );


// const TEST_SERVER_AND_PORT = 'localhost:8082';
const LOCAL_TEST_API_SERVER = 'http://localhost:5000/test-firebase-3a0f6/us-central1'
const TEST_API_SERVER = 'https://us-central1-test-firebase-3a0f6.cloudfunctions.net';

// const TEST_API_SERVER = LOCAL_TEST_API_SERVER;

const API_PATH = '/main/api/jstest';

// const TEST_CALL_STARTTIME = '2019-01-01';
// const TEST_CALL_ENDTIME = '2019-01-02';
// const TEST_CALL_GEO = 'HK';
// const TEST_CALL_KEYWORD = 'apple';

chai.use( chaiHttp );

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

function api_server_hello_get() {
    it( 'api server local get loopback', () => {
        prepare_get_request( TEST_API_SERVER, API_PATH+'/hello_get' )
            .end( ( err, res ) => {
                expect( res ).to.have.status( 200 );

            } )
    } )
}

function api_server_local_get_loopback() {
    it( 'api server local get loopback', () => {
        prepare_get_request( TEST_API_SERVER, API_PATH+'/echo_get?echo=foobar' )
            .end( ( err, res ) => {
                expect( res ).to.have.status( 200 );
                assert.equal( res.text , 'foobar' );
            } )
    } )
}

function api_server_local_post_loopback () {
    it( 'api server local post loopback', () => {
        prepare_json_post_request( TEST_API_SERVER, API_PATH+'/hello_post' )
            .send( { echo: 'foobar' } )
            .end( ( err, res ) => {
                assert.equal( 'foobar', res.text );
            } )
    } )

}

function api_test_create () {
    it( 'test create recordd', () => {
        prepare_json_post_request( TEST_API_SERVER, API_PATH+'/create_fight' )
            .send( {
                "winner": "levi",
                "losser": "henry",
                "title": "fight1"
            } )
            .end( ( err, res ) => {
                expect( res ).to.be.json;
                var res_json = JSON.parse( res.text );

                assert.equal( res_json['result'], 'done' );
                assert.containsAllKeys(res_json,['result','_id'], err_msg.KEY_NOT_FOUND_IN_RESPONSE )
            })
    })
}

function api_test_read () {
    it( 'test erad recordd', () => {
        var request_url = TEST_API_SERVER + API_PATH + '/test_post';
        console.log( request_url );

        prepare_json_post_request( TEST_API_SERVER, API_PATH + '/test_post' )
            .send( {
                "winner": "levi",
                "losser": "henry",
                "title": "fight1"
            } )
            .end( ( err, res ) => {
                assert.equal( '', res.text );
            })
    })
}

describe( 'firebase api test', () => {
    describe( 'helloworld', () => {
        api_server_hello_get();
        api_server_local_get_loopback();
        api_server_local_post_loopback();
    } )
    describe( 'test firebase basic', () => {
        api_test_create();
    })
} )
