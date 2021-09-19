/**
 * This function initializes the site:
 * 
 * Checks if a user is signed in
 * Initializes site if true
 * Assigns back to Index if not
 */

function init() {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            includeHTML();
        } else {
            includeHTML();
            setTimeout(() => document.getElementById('logoutButton').classList.add('d-none'), 10);
            
        }
    });
  }
