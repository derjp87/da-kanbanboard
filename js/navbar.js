async function logout() {
    if (firebase.auth().currentUser.isAnonymous) { // if user is anonymous
        let userid = firebase.auth().currentUser.uid;
        firebase.auth().currentUser.delete(); //delete user-data of anonymous.
        var docRef = firebase.firestore().collection('users');
        docRef.doc(`${userid}`).delete(); //delete server-user-data of anonymous.
    } else { // if user is not anonymous
        firebase.auth().signOut();
        window.location.assign("index.html");
    }
}