import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const fb_config = {
//   apiKey: "AIzaSyBnmrMAfoQvVRgXCIPG2wLiGO15s7u4bRY",
//   authDomain: "fir-tryout-f4e7a.firebaseapp.com",
//   databaseURL: "https://fir-tryout-f4e7a.firebaseio.com",
//   projectId: "fir-tryout-f4e7a",
//   storageBucket: "fir-tryout-f4e7a.appspot.com",
//   messagingSenderId: "859668436628",
//   appId: "1:859668436628:web:32fcc829845132db900681",
//   measurementId: "G-Z001Y7HBM2",
// };

const fb_config = {
  apiKey: "AIzaSyDK21LG5IV2ajFzVa1V0jZhAxR4ar37mrk",
  authDomain: "lynked-demo-tryout.firebaseapp.com",
  databaseURL: "https://lynked-demo-tryout-default-rtdb.firebaseio.com",
  projectId: "lynked-demo-tryout",
  storageBucket: "lynked-demo-tryout.appspot.com",
  messagingSenderId: "335675372584",
  appId: "1:335675372584:web:ab02b5849ff52bb5f1711d",
  measurementId: "G-E4KY2LRKDF",
};

const app = firebase.initializeApp(fb_config);

export default app;
