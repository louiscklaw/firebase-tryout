// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBnmrMAfoQvVRgXCIPG2wLiGO15s7u4bRY",
  authDomain: "fir-tryout-f4e7a.firebaseapp.com",
  databaseURL: "https://fir-tryout-f4e7a.firebaseio.com",
  projectId: "fir-tryout-f4e7a",
  storageBucket: "fir-tryout-f4e7a.appspot.com",
  messagingSenderId: "859668436628",
  appId: "1:859668436628:web:32fcc829845132db900681",
  measurementId: "G-Z001Y7HBM2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({});

firebase.analytics();

var citiesRef = db.collection("cities");

citiesRef.doc("SF").set({
  name: "San Francisco",
  state: "CA",
  country: "USA",
  capital: false,
  population: 860000,
  regions: ["west_coast", "norcal"],
});
citiesRef.doc("LA").set({
  name: "Los Angeles",
  state: "CA",
  country: "USA",
  capital: false,
  population: 3900000,
  regions: ["west_coast", "socal"],
});
citiesRef.doc("DC").set({
  name: "Washington, D.C.",
  state: null,
  country: "USA",
  capital: true,
  population: 680000,
  regions: ["east_coast"],
});
citiesRef.doc("TOK").set({
  name: "Tokyo",
  state: null,
  country: "Japan",
  capital: true,
  population: 9000000,
  regions: ["kanto", "honshu"],
});
citiesRef.doc("BJ").set({
  name: "Beijing",
  state: null,
  country: "China",
  capital: true,
  population: 21500000,
  regions: ["jingjinji", "hebei"],
});

citiesRef
  .where("regions", "array-contains-any", ["west_coast", "east_coast"])
  .get()
  .then((ss) => {
    ss.forEach((doc) => {
      console.log(doc.data());
    });
  });
