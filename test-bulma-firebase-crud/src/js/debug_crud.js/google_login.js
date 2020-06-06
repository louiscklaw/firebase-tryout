function google_login_helloworld() {
  debug_alert("hello google login");
}

addClickEventListener("#logout", () => {
  firebase.auth().signOut();
});