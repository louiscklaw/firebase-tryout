// const path = require( 'path' );

const functions = require( 'firebase-functions' );
const admin = require( 'firebase-admin' );

// const PROJ_HOME = require(path.join(__dirname,'..'))
// const vars = require(PROJ_HOME+'/vars.js')

admin.initializeApp( functions.config().firebase );

const FIGHTS_COLLECTION_NAME = 'fights';

const db = admin.firestore();

const GET_ENDPOINTS = {
    '/hello_get': hello_get,
    '/echo_get': echo_get,
    // '/get_fight/:id': get_fight,
    '/list_fight': list_record
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
    db.collection( FIGHTS_COLLECTION_NAME ).add( data )
        .then( ( docRef ) => {
            res.json( {result: 'done', '_id': docRef.id} );
        });
}

function list_record_from_db () {
    console.log( 'list record calling' );

    var result = {};
    let fightsRef = db.collection( FIGHTS_COLLECTION_NAME );
    let allCities = fightsRef.get()
        .then( snapshot => {
            console.log( snapshot );
    //         snapshot.forEach( doc => {
    //             console.log( doc.id, '=>', doc.data() );
    //         } );
    //     } )
    //     .catch( err => {
    //         console.log( 'Error getting documents', err );
        } );

    return 'helloworld';
}

function list_record ( req, res ) {
    res.send( list_record_from_db());
}

function get_fight ( req, res ) {

}

function hello_get ( req, res ) {
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

    express_app.get( '/get_fight/:id', ( req, res ) => {
        const fight_id = req.params.id;
        console.log( fight_id );
        db.collection( FIGHTS_COLLECTION_NAME ).doc( fight_id ).get()
            .then( record => {
                console.log( record );
                // res.send( JSON.stringify( record ) )
            } );
    } )

    Object.keys( POST_ENDPOINTS ).forEach( endpoint_path => {
        express_app.post( endpoint_path, POST_ENDPOINTS[
            endpoint_path ] );
    } );

}
