const vars = require(`${__dirname}/vars.js`);
var db = vars.db;

var USER_COLLECTION_NAME = "user";

class User {
  constructor(username) {
    this.username = username; // call the super class constructor and pass in the name parameter
  }

  login(username, password) {
    db.collection(USER_COLLECTION_NAME)
      .where("username", "==", username)
      .where("password", "==", password)
      .get()
      .then(result => {});
  }

  save(password) {
    let data = { username: this.username, password: password };
    return db.collection(USER_COLLECTION_NAME).add(data);
  }
}

function get_user_snapshot() {
  return db.collection(USER_COLLECTION_NAME).get();
}

function prepare_collection () {
  return db.collection( USER_COLLECTION_NAME );
}

function select_user_by_name (username) {
  return prepare_collection().where('username','==',username);
}

function select_user_by_id ( id ) {
  return prepare_collection().where( 'id', '==', id );
}

function delete_user_by_id ( id ) {
  return db.collection( USER_COLLECTION_NAME ).doc(id).delete();
}

function delete_user_by_name ( username ) {

}

async function get_all_users() {
  let userlist = {};
  await get_user_snapshot().then(ss => {
    ss.forEach(user => {
      userlist[user.id] = user.data();
    });
  });
  return userlist;
}

function handle_login(req, res) {
  console.log("handle_login");
}

function handle_logout(req, res) {
  console.log("handle_logout");
}

async function handle_list_user(req, res) {
  try {
    let output = {};
    let userlist = await get_all_users();
    // ss.forEach( user => {
    //   output[user.id] = user.data();
    // })

    res.send(userlist);
  } catch (err) {
    throw new Error(err);
  }
}

async function handle_create_user(req, res) {
  console.log("handle_create_user");
  let username = req.body.username;
  let password = req.body.password;

  try {
    let u = new User(username);
    let userRef = await u.save(password);
    res.send({ result: "done", _id: userRef.id });
  } catch (err) {
    res.send({ result: "fail" });
    throw new Error(err);
  }
}

async function handle_delete_user ( req, res ) {
  try {
    let id = req.params.id;
    let user = await delete_user_by_id( id );
    res.send( { result: 'done' } );
  } catch (err) {
    res.send( { result: 'err' } );
    throw new Error( err );
  }
}

module.exports = {
  login: handle_login,
  logout: handle_logout,
  list_user: handle_list_user,
  create_user: handle_create_user,
  delete_user: handle_delete_user
};
