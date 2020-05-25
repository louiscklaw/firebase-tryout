var admin = require( 'firebase-admin' );
// Initialize the default app
admin.initializeApp();

admin.auth().listUsers()
  .then( ( result ) => {
    return result.users.map( x => { return x.uid })
  } )
  .then( ( x ) => {
    console.log(`deleting user ${x}`)
    return admin.auth().deleteUsers(x)
  } )
  .then( () => {
    process.exit(0)
  })
