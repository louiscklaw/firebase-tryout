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

async function update_record ( id_in, title ) {
  var data = { title };
  let _ = await db.collection( 'fights' ).doc( id_in)
    .set( data, { merge: true } )

  return await get_record_by_id( id_in );
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

async function delete_record_db ( id_in ) {
  await db.collection( FIGHTS_COLLECTION_NAME ).doc( id_in ).delete();
}

async function delete_record( req, res ) {
  try {
    var id_in = req.params.id;
    let _ = await delete_record_db( id_in );

    res.send( {result: 'done'} );
  } catch ( err ) {
    res.send( {result: 'fail'} );
  }
}

async function get_all_id () {
  return db.collection( FIGHTS_COLLECTION_NAME ).get();
}

async function delete_all_record( req, res ) {
  return get_all_id()
    .then( snapshots => {
      snapshots.forEach( snapshot => {
        delete_record_db( snapshot.id );
      } )
    } )
    .then( _ => {
      res.send( { result: 'done' } );
    })
}

module.exports = {
  get_records: get_records,
  create_record: create_record,
  delete_record: delete_record,
  delete_all_record: delete_all_record,
  update_record: update_record,

  helloworld: helloworld
}
