function init() {
    includeHTML();

    firebase.auth().onAuthStateChanged(function (user) {
        initNavBar(user);
        if (user) {
            console.log(user);
            // User is signed in.
            //window.location.assign("addTask.html");
        } else {
            // No user is signed in.
            // The start method will wait until the DOM is loaded.
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    });
}

function setProfile(user) {
    // Add a new document with a generated id.
    firebase.firestore().collection("users").doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid,
        isAnonymous: user.isAnonymous
    });
}