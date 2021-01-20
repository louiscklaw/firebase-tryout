const functions = require("firebase-functions");
var admin = require("firebase-admin");

const createUser = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  admin
    .auth()
    .createUser({
      email: "user@example.com",
      emailVerified: false,
      phoneNumber: "+11234567890",
      password: "secretPassword",
      displayName: "John Doe",
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      response.send("create ");
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
  response.send("helloworld 2");
});

exports.createUser = createUser;
