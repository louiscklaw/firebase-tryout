// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDK21LG5IV2ajFzVa1V0jZhAxR4ar37mrk",
  authDomain: "lynked-demo-tryout.firebaseapp.com",
  projectId: "lynked-demo-tryout",
  storageBucket: "lynked-demo-tryout.appspot.com",
  messagingSenderId: "335675372584",
  appId: "1:335675372584:web:ab02b5849ff52bb5f1711d",
  measurementId: "G-E4KY2LRKDF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({});

firebase.analytics();

var citiesRef = db.collection("meny_manage_advertisement_config");

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
  .where("target_restaurants", "array-contains-any", ["all"])
  .get()
  .then((ss) => {
    ss.forEach((doc) => {
      console.log(doc.data());
    });
  });
