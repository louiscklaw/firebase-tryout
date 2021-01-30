const fs = require("fs");
const admin = require("firebase-admin");
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const firestoreService = require("@crapougnax/firestore-export-import");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// const docRef = db.collection("users").doc("alovelace");

// (async function () {
//   await docRef
//     .set({
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815,
//     })
//     .then(() => {
//       console.log("done");
//     });
// })();

firestoreService.initializeApp(
  serviceAccount,
  `https://${serviceAccount.project_id}.firebaseio.com`
);

firestoreService.restore(
  "/home/logic/_workspace/firebase-playlist/local-emulator-tryout/backup.json"
);
