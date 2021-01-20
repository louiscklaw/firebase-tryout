import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebase_app from "src/Firebase/config";

const db = firebase_app.firestore();
let test_collection_ref = db.collection("react-firebase-crud");

const default_new_user_profile = {
  setting1: false,
  setting2: true,
  setting3: false,
};

function processDeleteUser(id) {
  let promise = new Promise(function (resolve, reject) {
    test_collection_ref
      .doc(id)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log("error during update user profile");
        reject(err);
      });
  });
  return promise;
}

function processUpdateUser(id, profile) {
  let promise = new Promise(function (resolve, reject) {
    test_collection_ref
      .doc(id)
      .set({ profile: profile }, { merge: true })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log("error during update user profile");
        reject(err);
      });
  });
  return promise;
}

function processListUser() {
  let promise = new Promise(function (resolve, reject) {
    test_collection_ref.onSnapshot(
      (ss) => {
        let docs = ss.docs;
        let a_d = docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        });
        resolve(a_d);
      },
      (err) => {
        reject(err);
      }
    );
  });
  return promise;
}

function processAddUser(username, password) {
  let user_to_add = {
    profile: default_new_user_profile,
    username: username,
    password: password,
  };
  console.log("user_to_add", user_to_add);

  let promise = new Promise(function (resolve, reject) {
    test_collection_ref
      .add(user_to_add)
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

export {
  processAddUser,
  processListUser,
  processUpdateUser,
  processDeleteUser,
};
