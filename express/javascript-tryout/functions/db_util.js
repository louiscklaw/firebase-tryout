const vars = require( `${__dirname}/vars.js` );
var db = vars.db;

const FIGHTS_COLLECTION_NAME = vars.collection_name;

async function get_records( req, res ) {
  return await db.collection( FIGHTS_COLLECTION_NAME ).get()
    .then( records => {
      var output = {};
      records.forEach( x => {
        console.log( x.id );
        output[ x.id ] = x.data();
      } )
      res.send( output );
    } );
}


function create_record( req, res ) {
  const {
    winner,
    losser,
    title
  } = req.body;
  const data = {
    winner,
    losser,
    title
  };

  db.collection( FIGHTS_COLLECTION_NAME ).add( data )
    .then( ( docRef ) => {
      res.json( {
        result: 'done',
        '_id': docRef.id
      } );
    } );

}

function helloworld() {
  console.log( 'helloworld from db_util' );
}

function say_hello( req, res ) {
  // TODO: test me
  res.send( 'helloworld' );
}

function say_test( req, res ) {
  res.send( 'say test' );
}

async function delete_record( req, res ) {
  try {
    var id_in = req.params.id;
    await db.collection( 'fights' )
      .doc( id_in )
      .delete();
    res.send( {
      result: 'done'
    } );
  } catch ( err ) {
    res.send( {
      result: 'fail'
    } );
  }
}

module.exports = {
  get_records: get_records,
  create_record: create_record,
  delete_record: delete_record,
  helloworld: helloworld
}
