function init() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
        } else {
            // No user is signed in.
            includeHTML();
            setTimeout(() => document.getElementById('logoutButton').classList.add('d-none'), 10);
            
        }
    });
  }
