function init() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
        } else {
            window.location.assign("index.html");
        }
    });
  }