const functions = require( 'firebase-functions' );
// const admin = require( 'firebase-admin' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const routes = require( __dirname + '/routes.js' );

/**
 * @todo Write the documentation.
 * @todo Implement this function.
 */
function say_hello( req, res ) {
    // TODO: test me
    res.send( 'helloworld' );
}

function say_test( req, res ) {
    res.send( 'say test' );
}

const api_js_test = express();
const main = express();

main.use( '/api/jstest', api_js_test );
main.use( bodyParser.json() );


routes.init_http_actions(api_js_test)

exports.main = functions.https.onRequest( main );
exports.helloWorld = functions.https.onRequest( say_hello );