const functions = require("firebase-functions");
var admin = require("firebase-admin");

const listAllUsers = functions.https.onRequest((request, response) => {
  const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    return admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        // listUsersResult.users.forEach((userRecord) => {
        //   console.log("user", userRecord.toJSON());
        // });
        return listUsersResult;
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
  };
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers().then((users) => {
    response.send(JSON.stringify(users, null, 2));
  });
});

exports.listAllUsers = listAllUsers;
