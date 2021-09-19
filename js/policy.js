/**
 * This function initializes the site and checks if an user is logged in:
 * If no user is logged in the function hides the logout-button.
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
