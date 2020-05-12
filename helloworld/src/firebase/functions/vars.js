const functions = require( 'firebase-functions' );
const admin = require( 'firebase-admin' );

admin.initializeApp( functions.config().firebase );
const fs_db = admin.firestore();

module.exports = {
  helloworld: 'helloworld',
  debug: true,
  collection_name: 'fights',
  db: fs_db
}