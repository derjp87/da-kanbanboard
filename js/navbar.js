async function logout() {
    if (firebase.auth().currentUser.isAnonymous) {
        let useriddo = firebase.auth().currentUser.uid;
        firebase.auth().currentUser.delete();
        var docRef = firebase.firestore().collection('users');
        docRef.doc(`${useriddo}`).delete();
    } else {
        firebase.auth().signOut();
        window.location.assign("index.html");
    }
    //*  firebase.auth().signOut();   *//
    //*  window.location.assign("index.html");*//
}