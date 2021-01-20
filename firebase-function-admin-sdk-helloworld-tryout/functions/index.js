const functions = require("firebase-functions");

var serviceAccount = require("/home/logic/_workspace/firebase-playlist/firebase-function-admin-sdk-helloworld-tryout/functions/fir-tryout-f4e7a-firebase-adminsdk-ylqrb-35bbb11924.json");

var admin = require("firebase-admin");
var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-tryout-f4e7a.firebaseio.com",
});

const { createUser } = require("./createUser.js");
const { listAllUsers } = require("./listAllUsers.js");

exports.create_user = createUser;
exports.list_all_users = listAllUsers;

// exports.listAllUsers = createUser;
// exports.listAllUsers1 = createUser1;
