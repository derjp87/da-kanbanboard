function init() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            includeHTML();
            //loadTasks();
            //showUserList();
            //initNavBar(user);
            //setDateMinToday();
            //setTasks(user.uid);
            //setUsers();
        } else {
            // No user is signed in.
            includeHTML();
            setTimeout(() => document.getElementById('logoutButton').classList.add('d-none'), 10);
            
        }
    });
  }
