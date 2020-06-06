
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js')

importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js')

var firebaseConfig = {
  apiKey: "AIzaSyBnmrMAfoQvVRgXCIPG2wLiGO15s7u4bRY",
  authDomain: "fir-tryout-f4e7a.firebaseapp.com",
  databaseURL: "https://fir-tryout-f4e7a.firebaseio.com",
  projectId: "fir-tryout-f4e7a",
  storageBucket: "fir-tryout-f4e7a.appspot.com",
  messagingSenderId: "859668436628",
  appId: "1:859668436628:web:32fcc829845132db900681",
  measurementId: "G-Z001Y7HBM2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
