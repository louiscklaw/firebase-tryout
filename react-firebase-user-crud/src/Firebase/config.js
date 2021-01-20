import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const fb_config = {
  apiKey: "AIzaSyBnmrMAfoQvVRgXCIPG2wLiGO15s7u4bRY",
  authDomain: "fir-tryout-f4e7a.firebaseapp.com",
  databaseURL: "https://fir-tryout-f4e7a.firebaseio.com",
  projectId: "fir-tryout-f4e7a",
  storageBucket: "fir-tryout-f4e7a.appspot.com",
  messagingSenderId: "859668436628",
  appId: "1:859668436628:web:32fcc829845132db900681",
};

const firebase_app = firebase.initializeApp(fb_config);

export default firebase_app;
