const admin = require("firebase-admin");

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const docRef = db.collection("users").doc("alovelace");

async function helloworld() {
  await docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
}

helloworld();
