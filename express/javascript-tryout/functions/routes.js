// const path = require( 'path' );

const functions = require( 'firebase-functions' );
const admin = require( 'firebase-admin' );

// const PROJ_HOME = require(path.join(__dirname,'..'))
// const vars = require(PROJ_HOME+'/vars.js')

admin.initializeApp( functions.config().firebase );

const db = admin.firestore();

const GET_ENDPOINTS = {
    '/hello_get': hello_get,
    '/echo_get': echo_get,
    '/fights': list_record
}

const POST_ENDPOINTS = {
    '/hello_post': echo_post,
    '/create_fight':creat_record
};

const PUT_ENDPOINTS = {};
const DELETE_ENDPOINTS = {};

function creat_record ( req, res) {
    const { winner, losser, title } = req.body;
    const data = { winner, losser, title };
    db.collection( 'fights' ).add( data )
        .then( ( docRef ) => {
            res.json( {result: 'done', '_id': docRef.id} );
        });
}

function list_record ( req, res ) {
    const snapshot = db.collection( 'fights' ).get();

}

function hello_get ( req, res ) {
    console.log( req );
    res.send( 'hello get' );
}

function echo_get( req, res ) {
    // res.send( req.param.test );
    res.send( req.query.echo );

}

function echo_post ( req, res ) {
    try {
        res.send( req.body.echo );
    } catch (error) {
        console.error( req.body.echo );
    }
}

module.exports.init_http_actions = ( express_app ) => {
    Object.keys( GET_ENDPOINTS ).forEach( endpoint_path => {
        express_app.get( endpoint_path, GET_ENDPOINTS[ endpoint_path ] );
    } )

    Object.keys( POST_ENDPOINTS ).forEach( endpoint_path => {
        express_app.post( endpoint_path, POST_ENDPOINTS[
            endpoint_path ] );
    } );

}
