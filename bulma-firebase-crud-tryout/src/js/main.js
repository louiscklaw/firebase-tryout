function helloworld() {
  alert("helloworld");
}

function checkCookie() {
  console.log(document.cookie);
}

function logout() {
  console.log("logout clicked");
  firebase.auth().signOut();
}

function get_ele(sel_in) {
  return document.querySelector(sel_in);
}

function getIDToken() {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(idToken => {
      fetch(
        `${API_BASE_PATH}/user/verifyIdToken`,
        create_json_post_config({
          token: idToken
        })
      )
        .then(res => res.text())
        .then(res_text => {
          get_ele(".login-status").innerHTML = res_text;
        });
    });
}

function updateLoginStatus() {
  let currentUser = firebase.auth().currentUser;
  if (currentUser) {
    get_ele(".login-status").innerHTML = JSON.stringify(currentUser);
  } else {
    get_ele(".login-status").innerHTML = "not logged in";
  }
}

function hello_user() {
  fetch(`${API_BASE_PATH}/user/helloworld`)
    .then(res => res.text())
    .then(res_text => {
      console.log(res_text);
    });
}

// true = initialized, false = not initialized
function checkFirebaseInitialized() {
  return firebase.apps.length > 1;
}

function getCurrentUser(){
  return firebase.auth().currentUser;
}

document.addEventListener("DOMContentLoaded", function() {
  get_ele("#logout").addEventListener("click", logout, false);

  updateSelectLists();

});
