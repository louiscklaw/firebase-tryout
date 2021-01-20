const functions = require("firebase-functions");

var admin = require("firebase-admin");
var app = admin.initializeApp();

const { createUser } = require("./createUser.js");
const { listAllUsers } = require("./listAllUsers.js");

exports.create_user = createUser;
exports.list_all_users = listAllUsers;

// exports.listAllUsers = createUser;
// exports.listAllUsers1 = createUser1;
