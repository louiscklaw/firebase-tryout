const _ = require( 'lodash' )
var admin = require( 'firebase-admin' );

// Initialize the default app
admin.initializeApp();

function createUser(i){
  let user_email = `user${i}@example.com`
  return admin.auth().createUser( {
    email: user_email,
    emailVerified: true,
    disabled: false,
    password: '123321',
    displayName: `user ${i}`,
  } )
  .then( result => {
    console.log(`user created: ${user_email}`)
  })
}

const createUsers = async () => {
  for (let i=0; i< 30; i++){
    var result = await createUser(i)
  }
  console.log('create user done')
  process.exit(0)
}

createUsers();