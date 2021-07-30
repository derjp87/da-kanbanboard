// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: 'board.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // Process result. This will not trigger on merge conflicts.
          // On success redirect to signInSuccessUrl.
          console.log("USER SIGNED IN:", authResult, redirectUrl);
          if(authResult.additionalUserInfo.isNewUser) {
            console.log("new user");
            setProfile(authResult.user);
            
          }else{
            console.log("WELCOME BACK");
          }
          return false;
        },
        // signInFailure callback must be provided to handle merge conflicts which
        // occur when an existing credential is linked to an anonymous user.
        signInFailure: function(error) {
          // For merge conflicts, the error.code will be
          // 'firebaseui/anonymous-upgrade-merge-conflict'.
          if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
            return Promise.resolve();
          }
          // The credential the user tried to sign in with.
          var cred = error.credential;
          // If using Firebase Realtime Database. The anonymous user data has to be
          // copied to the non-anonymous user.
          var app = firebase.app();
          // Save anonymous user data first.
          return app.database().ref('users/' + firebase.auth().currentUser.uid)
              .once('value')
              .then(function(snapshot) {
                data = snapshot.val();
                // This will trigger onAuthStateChanged listener which
                // could trigger a redirect to another page.
                // Ensure the upgrade flow is not interrupted by that callback
                // and that this is given enough time to complete before
                // redirection.
                return firebase.auth().signInWithCredential(cred);
              })
              .then(function(user) {
                // Original Anonymous Auth instance now has the new user.
                return app.database().ref('users/' + user.uid).set(data);
              })
              .then(function() {
                // Delete anonymnous user.
                return anonymousUser.delete();
              }).then(function() {
                // Clear data in case a new user signs in, and the state change
                // triggers.
                data = null;
                // FirebaseUI will reset and the UI cleared when this promise
                // resolves.
                // signInSuccessWithAuthResult will not run. Successful sign-in
                // logic has to be run explicitly.
                window.location.assign('addTask.html');
              });
        }
    },
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());