const functions = require( 'firebase-functions' );
const admin = require( 'firebase-admin' );
admin.initializeApp();

// firebase callable function
exports.addAdminRole = functions.https.onCall( ( data, context ) => {
  if (context.auth.token.admin !== true ){
    return {error: "only admin can add admin"}
  }

  return admin.auth().getUserByEmail( data.email ).then( user => {
    return admin.auth().setCustomUserClaims( user.uid, {
      admin: true
    } )
  } ).then( () => {
    return {
      message: `Success ${data.email} is admin now`
    }
  } ).catch( err => {
    return err;
  } )
} )