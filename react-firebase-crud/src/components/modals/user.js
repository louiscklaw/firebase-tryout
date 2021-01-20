import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebase_app from "src/Firebase/config";

const db = firebase_app.firestore();
let test_collection_ref = db.collection("react-firebase-crud");

function listUser() {}

function dbAddUser(username) {}

function processAddUser({ username, password }) {
  let promise = new Promise(function (resolve, reject) {
    test_collection_ref
      .add({
        hello: "world",
      })
      .then(() => {
        resolve("add user done");
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
}

function updateUser() {}

export { updateUser, listUser, processAddUser };
