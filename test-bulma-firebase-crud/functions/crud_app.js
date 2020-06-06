const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const vars = require(`${__dirname}/vars.js`);
var db = vars.db;
const FIGHTS_COLLECTION_NAME = vars.collection_name;

const crud_app = express();
crud_app.use(cors({ origin: true }));

function get_record_by_id ( id_in ) {
  return db.collection( FIGHTS_COLLECTION_NAME ).doc( id_in ).get();
}

crud_app.put( "/fight/:id", async ( req, res ) => {
  let id = req.params.id;

  const { team, pld, w, d, l, gf, ga, gd, pts } = req.body;
  const data = { team, pld, w, d, l, gf, ga, gd, pts };

  let put = await db
    .collection(FIGHTS_COLLECTION_NAME)
    .doc(req.params.id)
    .set( data, { merge: true } )
    .then( async () => {
      let output;
      let doc = await get_record_by_id( id )
      // output[doc.id] = ;
      res.send( {result: 'done', record: doc.data()} );
    })
});

crud_app.post("/fight", async (req, res) => {
  const { team, pld, w, d, l, gf, ga, gd, pts } = req.body;
  const data = { team, pld, w, d, l, gf, ga, gd, pts };

  let create = await db
    .collection(FIGHTS_COLLECTION_NAME)
    .add(data)
    .then(docRef => {
      res.json({
        result: "done",
        _id: docRef.id
      });
    });
});

crud_app.delete( '/fight/:id', async ( req, res ) => {
  console.log( 'delete fight' );
  let id_to_delete = req.params.id;
  await db.collection( FIGHTS_COLLECTION_NAME )
    .doc( id_to_delete )
    .delete()
    .then( () => {
      res.send( { result: 'done' } );
    })
})

crud_app.get("/fight/:id", async (req, res) => {
  let id_to_read = req.params.id;
  await db.collection(FIGHTS_COLLECTION_NAME)
    .doc(id_to_read)
    .get()
    .then(docRef => {
      res.send(docRef.data());
    });
} );

crud_app.get("/fights", async (req, res) => {
  let output = {};
  console.log("list fights");
  let _ = await db
    .collection(FIGHTS_COLLECTION_NAME)
    .get()
    .then(ss => {
      ss.forEach(s => {
        output[s.id] = s.data();
      });
    })
    .then(() => {
      res.send(output);
    });
});

crud_app.get("/helloworld", (req, res) => {
  res.send("helloworld");
});

module.exports = crud_app;
