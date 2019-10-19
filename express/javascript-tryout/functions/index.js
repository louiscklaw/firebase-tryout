const functions = require( 'firebase-functions' );
const admin = require( 'firebase-admin' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

var vars = require( `${__dirname}/vars.js` );
var db_util = require( `${__dirname}/db_util.js` );

var db = vars.db;


const FIGHTS_COLLECTION_NAME = vars.collection_name;

const GET_ENDPOINTS = {
  '/fights': db_util.get_records,
  '/hello_get': hello_get,
  '/echo_get': echo_get,
  // '/get_fight/:id': get_fight,
  '/list_fight': list_record
}

const POST_ENDPOINTS = {
  '/hello_post': echo_post,
  '/create_fight': db_util.create_record
};

const PUT_ENDPOINTS = {};
const DELETE_ENDPOINTS = {};

const api_js_test = express();
const main = express();

main.use( '/api/jstest', api_js_test );
main.use( bodyParser.json() );

exports.main = functions.https.onRequest( main );
// exports.helloWorld = functions.https.onRequest( say_hello );



function hello_get( req, res ) {
  res.send( 'hello get' );
}

function echo_get( req, res ) {
  // res.send( req.param.test );
  res.send( req.query.echo );
}

function list_record_from_db() {
  console.log( 'list record calling' );

  var result = {};
  let citiesRef = db.collection( 'fights' );
  let allCities = citiesRef.get()
    .then( snapshot => {
      snapshot.forEach( doc => {
        console.log( doc.id, '=>', doc.data() );
      } );
    } )
    .catch( err => {
      console.log( 'Error getting documents', err );
    } );

  return 'helloworld';
}

function list_record( req, res ) {
  res.send( list_record_from_db() );
}

function echo_post( req, res ) {
  try {
    res.send( req.body.echo );
  } catch ( error ) {
    console.error( req.body.echo );
  }
}

async function get_record_by_id ( id_in ) {
  return await db.collection( FIGHTS_COLLECTION_NAME ).doc( id_in ).get()
    .then( record => {
      console.log( 'record found outside' );
      return {
        _id: record.id,
        value: record.data()
      };
    } );

}

async function update_record ( id_in, title ) {
  var data = { title };
  let _ = await db.collection( 'fights' ).doc( id_in)
    .set( data, { merge: true } )

  return await get_record_by_id( id_in );
}

async function get_all_id () {
  return db.collection( FIGHTS_COLLECTION_NAME ).get();
}

async function delete_all_record() {
  return get_all_id()
    .then( snapshots => {
      snapshots.forEach( snapshot => {
        console.log( `deleteing ${snapshot.id}` );
        delete_record( snapshot.id );
      })
    } )
}

Object.keys( GET_ENDPOINTS ).forEach( endpoint_path => {
  console.log(`GET: ${endpoint_path}`);
  api_js_test.get( endpoint_path, GET_ENDPOINTS[ endpoint_path ] );
} )

api_js_test.get( '/fight/:id', async ( req, res ) => {
  res.send( await get_record_by_id( req.params.id ));
} )

api_js_test.put( '/fights/:id', async ( req, res ) => {
  res.send( await update_record( req.params.id, req.body.title ) );
})

/**  delete single record */
api_js_test.delete( '/fights/:id', async ( req, res ) => {
  res.send( await db_util.delete_record(req, res) );
})


if ( vars.debug ) {
  console.log( 'debug active, enable delete_all' );

  api_js_test.get( '/db_util/delete_all', async ( req, res ) => {
    console.log( 'delete all records' );
    res.send( await delete_all_record() );
  })
}

Object.keys( POST_ENDPOINTS ).forEach( endpoint_path => {
  console.log( `init endpoint path ${endpoint_path}` );
  api_js_test.post( endpoint_path, POST_ENDPOINTS[
    endpoint_path ] );
} );
