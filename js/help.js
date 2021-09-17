function init() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
        } else { // No user is signed in.
            window.location.assign("index.html");
        }
    });
  }