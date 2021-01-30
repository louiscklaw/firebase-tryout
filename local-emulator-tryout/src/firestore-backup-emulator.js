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

// Start exporting your data
firestoreService.backups([]).then((data) =>
  fs.writeFile("backup.json", JSON.stringify(data), function (err, result) {
    if (err) console.log("error", err);
  })
);
