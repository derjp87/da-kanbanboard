function init() {
    includeHTML()
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            //User is signed in.
            setTimeout(function(){window.location.assign("board.html")}, 1000);
        } else {
            // No user is signed in.
            //The start method will wait until the Dom is loaded.
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

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) { elmnt.innerHTML = this.responseText; }
            if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

