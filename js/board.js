function init() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
            initNavBar(user);
            setDateMinToday();
            setTasks(user.uid);
            setUsers();
        } else {
            // No user is signed in.
            window.location.assign("index.html");
        }
    });


//     firebase.auth().signInWithEmailAndPassword('crunck78@gmail.com', 'Paturica')
//         .then((userCredential) => {
//             // Signed in
//             var user = userCredential.user;
//             // ...
//             console.log(user);
//             var docRef = firebase.firestore().collection("tasks").add(task)
//                 .then(() => {
//                     console.log("Document successfully updated!");
//                 })
//                 .catch((error) => {
//                     // The document probably doesn't exist.
//                     console.error("Error updating document: ", error);
//                 });
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//         });
}