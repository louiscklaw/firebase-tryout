import firebase_app from "../Firebase/config";
const db = firebase_app.firestore();

// if (process.env.NODE_ENV == "development") {
//   db.useEmulator("localhost", 8080);
// }

export default db;
