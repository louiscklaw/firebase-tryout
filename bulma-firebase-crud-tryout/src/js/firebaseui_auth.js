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

function storeUserToken(idToken) {
  console.log("calling storeUserToken");
  document.cookie = `_idToken=${idToken}`;
  return false;
}

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.

      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      // document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  // signInSuccessUrl: '/index.html#loggedin',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>"
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Disable auto-sign in.
ui.disableAutoSignIn();

ui.start("#firebaseui-auth-container", uiConfig);


function clearTokenCookie(){
  console.log('clear token cookie');
  document.cookie='_idToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
}

firebase.auth().onAuthStateChanged((user)=>{
  console.log('onAuthStateChanged');

  if (getCurrentUser() != null){
    console.log(`${getCurrentUser().email} logged in`);
    getCurrentUser().getIdToken(true)
      .then(idToken => document.cookie = `_idToken=${idToken}`);
  }else{
    clearTokenCookie();
    console.log('current user not logged in');
  }


})