const functions = require( 'firebase-functions' );
const admin = require( 'firebase-admin' );

// TODO: enable for deploy in google cloud
// admin.initializeApp( functions.config().firebase );

// NOTE: for local deploy
let serviceAccount = require('./test-hosting-ffbe0-db2f69da3d4f.json');
admin.initializeApp({
  credential: admin.credential.cert( serviceAccount ),
  databaseURL: "https://bulma-crud.firebaseio.com"
});

const fs_db = admin.firestore();

module.exports = {
  helloworld: 'helloworld',
  debug: true,
  collection_name: 'fights',
  db: fs_db,
  FIGHTS_COLLECTION_NAME: 'fights_collection_name',
  USER_COLLECTION: 'user_collection'
}